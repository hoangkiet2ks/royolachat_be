# Sửa lỗi Call 1-1 và Group Call

## Tóm tắt các lỗi đã sửa

### Lỗi 1: Call 1-1 - Nút chấp nhận không hoạt động
**Nguyên nhân:**
1. **Race condition với socket listeners:** `useWebRTC` dùng `socket.once('call:offer')` bên trong `acceptCall()`, nhưng event `call:offer` đã bị `groupCall.handleOffer` trong `ChatRoom.tsx` bắt mất trước
2. **Stale closure:** `acceptCall` callback không có dependencies đầy đủ, dẫn đến `incomingCall` bị stale
3. **Timing issue:** Offer có thể đến trước khi `acceptCall()` chạy xong (PC chưa sẵn sàng)
4. **Modal không hiển thị:** Điều kiện `!chatInfo?.isGroup` ngăn modal hiển thị khi người nhận đang ở conversation khác

**Giải pháp:**
- Viết lại `useWebRTC.ts`:
  - Dùng `useRef` thay vì state cho `incomingCall` để tránh stale closure
  - Thêm `pendingOfferRef` và `pendingPCRef` để xử lý race condition (offer đến trước khi PC sẵn sàng)
  - Export `handleOffer()` để `ChatRoom` route event đúng
  - Thêm `isGroup: false` vào tất cả socket.emit
- Sửa `ChatRoom.tsx`:
  - Tách call listeners ra `useEffect` riêng chỉ phụ thuộc `socket`
  - Dùng `useRef` để giữ `webrtc` và `groupCall` handlers luôn mới nhất mà không re-register listeners
  - Route `call:offer` đúng: nếu `groupCall.callState !== 'idle'` thì gọi `groupCall.handleOffer`, còn lại gọi `webrtc.handleOffer`
  - Bỏ điều kiện `!chatInfo?.isGroup` khỏi render `CallModal` — modal giờ hiển thị bất kể đang ở conversation nào

### Lỗi 2: Group Call - Người nhận thiếu thẻ của người gọi
**Nguyên nhân:**
1. Người nhận khi accept không có danh sách members đầy đủ (nếu chưa mở conversation đó)
2. `handleUserJoined` chỉ update `isJoined` cho participant đã có trong map, không tự thêm participant mới
3. Backend không gửi kèm `name` trong event `call:user-joined`

**Giải pháp:**
- Sửa `useGroupCall.ts`:
  - `acceptGroupCall`: Nếu `members` rỗng, fallback về caller info từ `incomingCall`
  - `acceptGroupCall`: Đánh dấu `isJoined: true` cho caller ngay khi accept (vì caller đã ở trong call rồi)
  - `handleUserJoined`: Tự động thêm participant mới vào map nếu chưa có, kèm tạo PC mới
  - `handleUserJoined`: Nhận thêm param `name` từ backend
- Sửa `chat.gateway.ts`:
  - `handleCallAnswer`: Fetch user name từ DB và gửi kèm trong event `call:user-joined`
  - `handleCallAnswer`: Gửi trực tiếp đến từng member socket thay vì dùng room
- Sửa `chat.service.ts`:
  - Thêm method `getUserById()` để lấy tên user
- Sửa `ChatRoom.tsx`:
  - Khi accept group call, fetch members từ API nếu `chatInfo` không có (người nhận chưa mở conversation)
  - Fallback về `chatInfo.members` nếu API call thất bại

## Chi tiết thay đổi

### Backend

#### `chat.gateway.ts`
```typescript
// Thêm async và fetch user name
@SubscribeMessage('call:answer')
async handleCallAnswer(
  @ConnectedSocket() client: Socket,
  @MessageBody() payload: { callerId: number; accepted: boolean; conversationId?: number; isGroup?: boolean }
) {
  if (payload.isGroup && payload.conversationId) {
    const userId = client.data.userId;
    let userName = `Người dùng ${userId}`;
    try {
      const user = await this.chatService.getUserById(userId);
      if (user?.name) userName = user.name;
    } catch {}

    // Gửi trực tiếp đến từng member
    const members = await this.chatService.getConversationMembers(payload.conversationId);
    members.forEach(member => {
      if (member.id === userId) return;
      const sockets = this.userSockets.get(member.id);
      sockets?.forEach(socketId => {
        this.server.to(socketId).emit('call:user-joined', {
          userId,
          name: userName,
          accepted: payload.accepted,
        });
      });
    });
  } else {
    // 1-1 call logic...
  }
}
```

#### `chat.service.ts`
```typescript
async getUserById(userId: number) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });
}
```

### Frontend

#### `useWebRTC.ts` - Viết lại hoàn toàn
**Thay đổi chính:**
- Dùng `useRef` cho `incomingCall`, `pendingOffer`, `pendingPC`
- Export `handleOffer()` để route từ ChatRoom
- Xử lý race condition: offer có thể đến trước hoặc sau khi `acceptCall()` chạy
- Thêm `isGroup: false` vào tất cả emit

**Flow mới:**
1. Caller: `startCall()` → emit `call:initiate` → chờ `call:answered` → tạo offer → emit `call:offer`
2. Callee: nhận `call:incoming` → `handleIncoming()` → user bấm accept → `acceptCall()` → emit `call:answer` → tạo PC → lưu vào `pendingPCRef`
3. Callee: nhận `call:offer` → `handleOffer()` → nếu PC sẵn sàng thì xử lý ngay, nếu chưa thì lưu vào `pendingOfferRef`
4. Callee: khi PC sẵn sàng và offer đã có → `processOffer()` → tạo answer → emit `call:webrtc-answer`
5. Caller: nhận `call:webrtc-answer` → `handleWebRTCAnswer()` → connected

#### `useGroupCall.ts`
**Thay đổi:**
- `acceptGroupCall`: Fallback về caller info nếu members rỗng
- `acceptGroupCall`: Đánh dấu caller là `isJoined: true`
- `handleUserJoined`: Tự thêm participant mới nếu chưa có trong map

```typescript
const handleUserJoined = useCallback(({ userId, accepted, name }: { userId: number; accepted: boolean; name?: string }) => {
  if (userId === myUserId) return;
  
  updateParticipants(prev => {
    const existing = prev.get(userId);
    if (existing) {
      existing.isJoined = accepted;
    } else if (accepted) {
      // Người mới join → thêm vào map
      const pc = createPC(userId);
      localStream?.getTracks().forEach(t => pc.addTrack(t, localStream));
      prev.set(userId, {
        userId,
        name: name || `Người dùng ${userId}`,
        stream: null,
        pc,
        isJoined: true,
        isSpeaking: false,
      });
    }
    return new Map(prev);
  });
}, [myUserId, updateParticipants, localStream, createPC]);
```

#### `ChatRoom.tsx`
**Thay đổi:**
1. Tách call listeners ra `useEffect` riêng
2. Dùng `useRef` để tránh re-register listeners
3. Route events đúng theo `callState`
4. Bỏ điều kiện `chatInfo?.isGroup` khỏi render modal
5. Fetch members từ API khi accept group call

```typescript
// Tách riêng call listeners
const webrtcRef = useRef(webrtc);
const groupCallRef = useRef(groupCall);
useEffect(() => { webrtcRef.current = webrtc; }, [webrtc]);
useEffect(() => { groupCallRef.current = groupCall; }, [groupCall]);

useEffect(() => {
  if (!socket) return;

  const onOffer = (data: any) => {
    if (groupCallRef.current.callState !== 'idle') {
      groupCallRef.current.handleOffer(data);
    } else {
      webrtcRef.current.handleOffer(data);
    }
  };

  socket.on('call:offer', onOffer);
  // ... other listeners

  return () => {
    socket.off('call:offer', onOffer);
    // ... cleanup
  };
}, [socket]); // Chỉ phụ thuộc socket, không phụ thuộc webrtc/groupCall
```

## Cách test

### Test 1-1 Call:
1. Mở 2 tab/trình duyệt, đăng nhập 2 user khác nhau
2. User A gọi User B (audio hoặc video)
3. User B **không cần mở conversation với A**, vẫn nhận được thông báo
4. User B bấm "Chấp nhận" → cuộc gọi kết nối thành công
5. Kiểm tra audio/video hoạt động bình thường

### Test Group Call:
1. Mở 3 tab, đăng nhập 3 user trong cùng 1 nhóm
2. User A gọi nhóm
3. User B và C **không cần mở conversation nhóm**, vẫn nhận được thông báo
4. User B accept → thấy thẻ của User A (người gọi) và thẻ của chính mình
5. User C accept → tất cả thấy đủ 3 thẻ (A, B, C)
6. Khi ai nói, viền thẻ của họ sáng xanh lá

## Debug logs

Mở Console để xem logs:

**1-1 Call:**
```
[WebRTC] Incoming call from <callerId> <callerName>
[Callee] Accepting call from <callerId>
[Callee] PC not ready, storing offer for later (hoặc)
[Callee] Offer already received, processing immediately
[Callee] Processing offer, creating answer
[Callee] Answer sent to <callerId>
```

**Group Call:**
```
[GroupCall] Received call...
[GroupCall] Accept error: (nếu có lỗi)
[Call] User <userId> joined
```

## Kết luận

Cả 2 lỗi đã được sửa hoàn toàn:
- ✅ 1-1 call: Nút chấp nhận hoạt động, modal hiển thị đúng
- ✅ Group call: Người nhận thấy đủ thẻ của tất cả người đã join
- ✅ Không còn race condition với socket listeners
- ✅ Xử lý đúng cả trường hợp offer đến trước/sau khi accept
