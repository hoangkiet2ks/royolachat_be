# Debug: Vấn đề người nhận không nhận được thông báo cuộc gọi

## Vấn đề đã được sửa

### Nguyên nhân chính:
Trong code cũ, khi gọi nhóm, backend sử dụng `client.to(roomName).emit()` để gửi thông báo. Tuy nhiên, **người nhận chỉ join room khi họ mở conversation đó trong UI**. Nếu họ chưa mở conversation, họ sẽ không nhận được thông báo cuộc gọi.

### Giải pháp:
Thay vì dựa vào room, giờ backend sẽ:
1. Lấy danh sách tất cả members trong conversation từ database
2. Gửi trực tiếp event `call:incoming` đến từng socket của từng member (trừ người gọi)
3. Điều này đảm bảo người nhận sẽ nhận được thông báo dù họ có đang mở conversation đó hay không

## Cách test

### Test 1-1 Call:
1. Mở 2 trình duyệt/tab khác nhau
2. Đăng nhập 2 tài khoản khác nhau (User A và User B)
3. User A mở conversation với User B
4. User B **KHÔNG CẦN** mở conversation với User A
5. User A bấm nút gọi điện/video
6. **Kết quả mong đợi:** User B nhận được thông báo cuộc gọi đến

### Test Group Call:
1. Mở 3 trình duyệt/tab khác nhau
2. Đăng nhập 3 tài khoản (User A, User B, User C) trong cùng 1 nhóm
3. User A mở conversation nhóm
4. User B và User C **KHÔNG CẦN** mở conversation nhóm
5. User A bấm nút gọi nhóm
6. **Kết quả mong đợi:** User B và User C đều nhận được thông báo cuộc gọi đến

## Kiểm tra logs

Mở terminal backend và xem logs khi thực hiện cuộc gọi:

```bash
# Logs khi gọi 1-1:
[Call] Initiate from <callerId>, isGroup: false, conversationId: <id>
[Call] Target user <targetUserId> sockets: [<socketId>]
[Call] Sending call:incoming to socket <socketId>
[Call] 1-1 call notification sent to 1 socket(s)

# Logs khi gọi nhóm:
[Call] Initiate from <callerId>, isGroup: true, conversationId: <id>
[Call] Group members: [<userId1>, <userId2>, <userId3>]
[Call] Sending call:incoming to member <userId> (socket <socketId>)
[Call] Group call notification sent to <count> socket(s)
```

## Nếu vẫn không nhận được thông báo

### Kiểm tra 1: Socket connection
Mở Console của trình duyệt người nhận và kiểm tra:
```javascript
// Kiểm tra socket có connected không
console.log(socket.connected); // Phải là true
```

### Kiểm tra 2: Event listeners
Trong `ChatRoom.tsx`, đảm bảo có đoạn code này:
```typescript
socket.on('call:incoming', (info: any) => {
  if (info.isGroup) {
    groupCall.handleIncoming(info);
  } else {
    webrtc.handleIncoming(info);
  }
});
```

### Kiểm tra 3: Backend logs
Nếu logs hiển thị "Member X is offline", có nghĩa là:
- User đó chưa đăng nhập
- Hoặc socket connection bị disconnect

### Kiểm tra 4: Frontend console
Mở Console của người nhận và xem có log nào liên quan đến WebRTC không:
```
[WebRTC] Received call...
[GroupCall] Received call...
```

## Thay đổi code

### Backend: `chat.gateway.ts`
- Thêm method `getConversationMembers()` trong `chat.service.ts`
- Sửa `handleCallInitiate()` để lấy members từ DB và gửi trực tiếp đến từng socket
- Thêm debug logs để track quá trình gửi thông báo

### Frontend: Không thay đổi
- Code frontend vẫn giữ nguyên
- Event listeners đã được setup đúng

## Kết luận

Sau khi sửa, cả 1-1 call và group call đều sẽ hoạt động đúng, người nhận sẽ nhận được thông báo cuộc gọi dù họ có đang mở conversation đó hay không.
