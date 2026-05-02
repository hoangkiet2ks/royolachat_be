# Hướng Dẫn Tích Hợp Video Call 1-1

## Tổng Quan
Hệ thống video call 1-1 sử dụng WebRTC và Socket.IO để thực hiện cuộc gọi video/audio trực tiếp giữa 2 người dùng.

## Luồng Hoạt Động

### 1. Khởi Tạo Cuộc Gọi (Caller)

**Event:** `call:initiate`

**Payload gửi đi:**
```javascript
{
  targetUserId: number,        // ID người nhận
  conversationId: number,      // ID cuộc trò chuyện
  callType: 'audio' | 'video', // Loại cuộc gọi
  callerName: string,          // Tên người gọi
  callerAvatar?: string        // Avatar người gọi (optional)
}
```

**Response nhận về:**
- `call:unavailable` - Nếu người nhận không online
- Không có response nếu thành công (chờ người nhận trả lời)

**Ví dụ Frontend:**
```javascript
socket.emit('call:initiate', {
  targetUserId: 123,
  conversationId: 456,
  callType: 'video',
  callerName: 'Nguyễn Văn A',
  callerAvatar: 'https://...'
});

// Lắng nghe người nhận không online
socket.on('call:unavailable', (data) => {
  alert('Người dùng không trực tuyến');
});
```

---

### 2. Nhận Cuộc Gọi (Callee)

**Event nhận:** `call:incoming`

**Data nhận được:**
```javascript
{
  callerId: number,
  callerName: string,
  callerAvatar?: string,
  callType: 'audio' | 'video',
  conversationId: number
}
```

**Ví dụ Frontend:**
```javascript
socket.on('call:incoming', (data) => {
  // Hiển thị UI cuộc gọi đến
  showIncomingCallUI({
    callerName: data.callerName,
    callerAvatar: data.callerAvatar,
    callType: data.callType
  });
  
  // Lưu lại callerId và conversationId để dùng sau
  currentCallerId = data.callerId;
  currentConversationId = data.conversationId;
});
```

---

### 3. Trả Lời Cuộc Gọi

#### 3a. Chấp Nhận Cuộc Gọi

**Event:** `call:answer`

**Payload:**
```javascript
{
  callerId: number,
  accepted: true,
  conversationId: number,
  answererName?: string
}
```

**Ví dụ:**
```javascript
// Khi user bấm nút "Chấp nhận"
socket.emit('call:answer', {
  callerId: currentCallerId,
  accepted: true,
  conversationId: currentConversationId,
  answererName: 'Trần Thị B'
});

// Sau đó khởi tạo WebRTC connection
initWebRTCConnection();
```

#### 3b. Từ Chối Cuộc Gọi

**Event:** `call:reject`

**Payload:**
```javascript
{
  callerId: number,
  conversationId: number
}
```

**Ví dụ:**
```javascript
// Khi user bấm nút "Từ chối"
socket.emit('call:reject', {
  callerId: currentCallerId,
  conversationId: currentConversationId
});
```

#### 3c. Báo Bận

**Event:** `call:busy`

**Payload:**
```javascript
{
  callerId: number,
  conversationId: number
}
```

---

### 4. WebRTC Signaling

#### 4a. Caller Gửi Offer

**Event:** `call:offer`

**Payload:**
```javascript
{
  targetUserId: number,
  offer: RTCSessionDescriptionInit
}
```

**Ví dụ:**
```javascript
// Sau khi người nhận chấp nhận
socket.on('call:answered', async (data) => {
  if (data.accepted) {
    // Tạo offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // Gửi offer
    socket.emit('call:offer', {
      targetUserId: data.answererId,
      offer: offer
    });
  }
});
```

#### 4b. Callee Nhận Offer và Gửi Answer

**Event nhận:** `call:offer`

**Event gửi:** `call:webrtc-answer`

**Ví dụ:**
```javascript
socket.on('call:offer', async (data) => {
  // Set remote description
  await peerConnection.setRemoteDescription(data.offer);
  
  // Tạo answer
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
  // Gửi answer
  socket.emit('call:webrtc-answer', {
    callerId: data.callerId,
    answer: answer
  });
});
```

#### 4c. Caller Nhận Answer

**Event nhận:** `call:webrtc-answer`

**Ví dụ:**
```javascript
socket.on('call:webrtc-answer', async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
});
```

#### 4d. Trao Đổi ICE Candidates

**Event gửi:** `call:ice-candidate`

**Event nhận:** `call:ice-candidate`

**Ví dụ:**
```javascript
// Gửi ICE candidate
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    socket.emit('call:ice-candidate', {
      targetUserId: otherUserId,
      candidate: event.candidate
    });
  }
};

// Nhận ICE candidate
socket.on('call:ice-candidate', async (data) => {
  await peerConnection.addIceCandidate(data.candidate);
});
```

---

### 5. Kết Thúc Cuộc Gọi

**Event:** `call:end`

**Payload:**
```javascript
{
  targetUserId: number,
  conversationId: number,
  duration?: number  // Thời lượng cuộc gọi (giây)
}
```

**Event nhận:** `call:ended`

**Ví dụ:**
```javascript
// Khi user bấm nút "Kết thúc"
const callDuration = Math.floor((Date.now() - callStartTime) / 1000);

socket.emit('call:end', {
  targetUserId: otherUserId,
  conversationId: currentConversationId,
  duration: callDuration
});

// Lắng nghe người kia kết thúc
socket.on('call:ended', (data) => {
  // Đóng kết nối WebRTC
  peerConnection.close();
  
  // Hiển thị thông báo
  alert(`Cuộc gọi kết thúc. Thời lượng: ${data.duration}s`);
});
```

---

## Code Mẫu Frontend Hoàn Chỉnh

### Khởi Tạo WebRTC

```javascript
let peerConnection;
let localStream;
let remoteStream;

const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

async function initWebRTC() {
  // Lấy local media stream
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });
  
  // Hiển thị local video
  document.getElementById('localVideo').srcObject = localStream;
  
  // Tạo peer connection
  peerConnection = new RTCPeerConnection(configuration);
  
  // Thêm local tracks
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });
  
  // Nhận remote tracks
  peerConnection.ontrack = (event) => {
    remoteStream = event.streams[0];
    document.getElementById('remoteVideo').srcObject = remoteStream;
  };
  
  // ICE candidate handler
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('call:ice-candidate', {
        targetUserId: otherUserId,
        candidate: event.candidate
      });
    }
  };
}
```

### Caller Flow

```javascript
async function startCall(targetUserId, conversationId, callType) {
  // Khởi tạo WebRTC
  await initWebRTC();
  
  // Gửi yêu cầu gọi
  socket.emit('call:initiate', {
    targetUserId,
    conversationId,
    callType,
    callerName: currentUser.name,
    callerAvatar: currentUser.avatar
  });
  
  // Lắng nghe phản hồi
  socket.on('call:answered', async (data) => {
    if (data.accepted) {
      // Tạo và gửi offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      
      socket.emit('call:offer', {
        targetUserId: data.answererId,
        offer: offer
      });
    } else {
      alert('Cuộc gọi bị từ chối');
      cleanupCall();
    }
  });
  
  socket.on('call:webrtc-answer', async (data) => {
    await peerConnection.setRemoteDescription(data.answer);
  });
  
  socket.on('call:ice-candidate', async (data) => {
    await peerConnection.addIceCandidate(data.candidate);
  });
}
```

### Callee Flow

```javascript
socket.on('call:incoming', async (data) => {
  // Hiển thị UI cuộc gọi đến
  const accepted = await showIncomingCallDialog(data);
  
  if (accepted) {
    // Khởi tạo WebRTC
    await initWebRTC();
    
    // Gửi chấp nhận
    socket.emit('call:answer', {
      callerId: data.callerId,
      accepted: true,
      conversationId: data.conversationId,
      answererName: currentUser.name
    });
    
    // Lắng nghe offer
    socket.on('call:offer', async (offerData) => {
      await peerConnection.setRemoteDescription(offerData.offer);
      
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      socket.emit('call:webrtc-answer', {
        callerId: offerData.callerId,
        answer: answer
      });
    });
    
    socket.on('call:ice-candidate', async (candidateData) => {
      await peerConnection.addIceCandidate(candidateData.candidate);
    });
  } else {
    // Từ chối
    socket.emit('call:reject', {
      callerId: data.callerId,
      conversationId: data.conversationId
    });
  }
});
```

---

## Lưu Ý Quan Trọng

### 1. Xử Lý Lỗi
```javascript
try {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });
} catch (error) {
  if (error.name === 'NotAllowedError') {
    alert('Vui lòng cấp quyền truy cập camera và microphone');
  } else if (error.name === 'NotFoundError') {
    alert('Không tìm thấy camera hoặc microphone');
  }
}
```

### 2. Cleanup Khi Kết Thúc
```javascript
function cleanupCall() {
  // Dừng tất cả tracks
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  
  // Đóng peer connection
  if (peerConnection) {
    peerConnection.close();
  }
  
  // Reset UI
  document.getElementById('localVideo').srcObject = null;
  document.getElementById('remoteVideo').srcObject = null;
}
```

### 3. Xử Lý Mất Kết Nối
```javascript
peerConnection.oniceconnectionstatechange = () => {
  if (peerConnection.iceConnectionState === 'disconnected' ||
      peerConnection.iceConnectionState === 'failed') {
    alert('Mất kết nối. Đang thử kết nối lại...');
    // Có thể thử reconnect hoặc kết thúc cuộc gọi
  }
};
```

### 4. Bật/Tắt Camera và Mic
```javascript
function toggleCamera() {
  const videoTrack = localStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
}

function toggleMicrophone() {
  const audioTrack = localStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
}
```

---

## Database Schema

Các log cuộc gọi được lưu vào bảng `Message` với `type = 'CALL_LOG'`:

```sql
-- Cuộc gọi được khởi tạo
content: "Cuộc gọi video đã được khởi tạo"

-- Cuộc gọi bị từ chối
content: "Cuộc gọi bị từ chối"

-- Cuộc gọi kết thúc thành công
content: "Cuộc gọi kết thúc - Thời lượng: 5 phút 30 giây"

-- Cuộc gọi nhỡ
content: "Cuộc gọi nhỡ"

-- Máy bận
content: "Cuộc gọi nhỡ - Máy bận"
```

---

## Testing

### Test Checklist

- [ ] Khởi tạo cuộc gọi khi người nhận online
- [ ] Xử lý khi người nhận offline
- [ ] Chấp nhận cuộc gọi
- [ ] Từ chối cuộc gọi
- [ ] Báo bận
- [ ] Trao đổi WebRTC offer/answer
- [ ] Trao đổi ICE candidates
- [ ] Hiển thị video local và remote
- [ ] Bật/tắt camera
- [ ] Bật/tắt microphone
- [ ] Kết thúc cuộc gọi từ caller
- [ ] Kết thúc cuộc gọi từ callee
- [ ] Lưu log cuộc gọi vào database
- [ ] Xử lý mất kết nối
- [ ] Xử lý lỗi quyền truy cập camera/mic

---

## Troubleshooting

### Vấn đề: Không nhận được video/audio

**Giải pháp:**
1. Kiểm tra quyền truy cập camera/microphone
2. Kiểm tra ICE candidates có được trao đổi không
3. Kiểm tra firewall/NAT settings
4. Thử sử dụng TURN server thay vì chỉ STUN

### Vấn đề: Cuộc gọi bị ngắt sau vài giây

**Giải pháp:**
1. Kiểm tra ICE connection state
2. Thêm TURN server vào configuration
3. Kiểm tra network stability

### Vấn đề: Không nhận được event từ Socket.IO

**Giải pháp:**
1. Kiểm tra token authentication
2. Kiểm tra namespace (`/chat`)
3. Kiểm tra user có online không (trong `userSockets` map)

---

## Tài Liệu Tham Khảo

- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Socket.IO Documentation](https://socket.io/docs/v4/)
- [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)
