// ============================================
// VIDEO CALL 1-1 REACT COMPONENT EXAMPLE
// ============================================

import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface VideoCallProps {
  currentUserId: number;
  currentUserName: string;
  currentUserAvatar?: string;
  targetUserId: number;
  conversationId: number;
  callType: 'audio' | 'video';
  onCallEnd: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  currentUserId,
  currentUserName,
  currentUserAvatar,
  targetUserId,
  conversationId,
  callType,
  onCallEnd
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [callStatus, setCallStatus] = useState<'initiating' | 'ringing' | 'connected' | 'ended'>('initiating');
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const callStartTimeRef = useRef<number>(0);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ICE Servers Configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' }
    ]
  };

  // Initialize Socket Connection
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const newSocket = io('http://localhost:3000/chat', {
      auth: { token: `Bearer ${token}` }
    });

    newSocket.on('connect', () => {
      console.log('Socket connected');
      setSocket(newSocket);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Initialize WebRTC
  const initWebRTC = async () => {
    try {
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: callType === 'video',
        audio: true
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(iceServers);
      peerConnectionRef.current = peerConnection;

      // Add local tracks to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Handle remote tracks
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && socket) {
          socket.emit('call:ice-candidate', {
            targetUserId,
            candidate: event.candidate
          });
        }
      };

      // Handle connection state changes
      peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE Connection State:', peerConnection.iceConnectionState);
        
        if (peerConnection.iceConnectionState === 'connected') {
          setCallStatus('connected');
          startCallTimer();
        } else if (
          peerConnection.iceConnectionState === 'disconnected' ||
          peerConnection.iceConnectionState === 'failed'
        ) {
          handleCallEnd();
        }
      };

    } catch (error) {
      console.error('Error initializing WebRTC:', error);
      alert('Không thể truy cập camera/microphone. Vui lòng kiểm tra quyền truy cập.');
      onCallEnd();
    }
  };

  // Start call timer
  const startCallTimer = () => {
    callStartTimeRef.current = Date.now();
    durationIntervalRef.current = setInterval(() => {
      const duration = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
      setCallDuration(duration);
    }, 1000);
  };

  // Format call duration
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Initiate call (Caller)
  useEffect(() => {
    if (!socket) return;

    const initiateCall = async () => {
      await initWebRTC();
      
      socket.emit('call:initiate', {
        targetUserId,
        conversationId,
        callType,
        callerName: currentUserName,
        callerAvatar: currentUserAvatar
      });

      setCallStatus('ringing');
    };

    initiateCall();

    // Listen for call unavailable
    socket.on('call:unavailable', () => {
      alert('Người dùng không trực tuyến');
      handleCallEnd();
    });

    // Listen for call answered
    socket.on('call:answered', async (data) => {
      if (data.accepted) {
        // Create and send offer
        const peerConnection = peerConnectionRef.current;
        if (peerConnection) {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          
          socket.emit('call:offer', {
            targetUserId: data.answererId,
            offer
          });
        }
      } else {
        alert('Cuộc gọi bị từ chối');
        handleCallEnd();
      }
    });

    // Listen for call rejected
    socket.on('call:rejected', () => {
      alert('Cuộc gọi bị từ chối');
      handleCallEnd();
    });

    // Listen for call busy
    socket.on('call:busy', () => {
      alert('Máy bận');
      handleCallEnd();
    });

    // Listen for WebRTC answer
    socket.on('call:webrtc-answer', async (data) => {
      const peerConnection = peerConnectionRef.current;
      if (peerConnection) {
        await peerConnection.setRemoteDescription(data.answer);
      }
    });

    // Listen for ICE candidates
    socket.on('call:ice-candidate', async (data) => {
      const peerConnection = peerConnectionRef.current;
      if (peerConnection && data.candidate) {
        await peerConnection.addIceCandidate(data.candidate);
      }
    });

    // Listen for call ended
    socket.on('call:ended', () => {
      handleCallEnd();
    });

    return () => {
      socket.off('call:unavailable');
      socket.off('call:answered');
      socket.off('call:rejected');
      socket.off('call:busy');
      socket.off('call:webrtc-answer');
      socket.off('call:ice-candidate');
      socket.off('call:ended');
    };
  }, [socket]);

  // Toggle camera
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  // Toggle microphone
  const toggleMicrophone = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Handle call end
  const handleCallEnd = () => {
    // Stop duration timer
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
    }

    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    // Send call end event
    if (socket && callStatus !== 'ended') {
      socket.emit('call:end', {
        targetUserId,
        conversationId,
        duration: callDuration
      });
    }

    setCallStatus('ended');
    onCallEnd();
  };

  return (
    <div className="video-call-container">
      {/* Remote Video (Full Screen) */}
      <div className="remote-video-wrapper">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video"
        />
        
        {callStatus === 'ringing' && (
          <div className="call-status-overlay">
            <div className="spinner"></div>
            <p>Đang gọi...</p>
          </div>
        )}
      </div>

      {/* Local Video (Picture-in-Picture) */}
      {callType === 'video' && (
        <div className="local-video-wrapper">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="local-video"
          />
        </div>
      )}

      {/* Call Controls */}
      <div className="call-controls">
        {/* Call Duration */}
        {callStatus === 'connected' && (
          <div className="call-duration">
            {formatDuration(callDuration)}
          </div>
        )}

        {/* Control Buttons */}
        <div className="control-buttons">
          {/* Toggle Camera */}
          {callType === 'video' && (
            <button
              onClick={toggleCamera}
              className={`control-btn ${!isCameraOn ? 'disabled' : ''}`}
            >
              {isCameraOn ? '📹' : '📹❌'}
            </button>
          )}

          {/* Toggle Microphone */}
          <button
            onClick={toggleMicrophone}
            className={`control-btn ${!isMicOn ? 'disabled' : ''}`}
          >
            {isMicOn ? '🎤' : '🎤❌'}
          </button>

          {/* End Call */}
          <button
            onClick={handleCallEnd}
            className="control-btn end-call-btn"
          >
            📞 Kết thúc
          </button>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .video-call-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          z-index: 9999;
        }

        .remote-video-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .remote-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .call-status-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .local-video-wrapper {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 200px;
          height: 150px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .local-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scaleX(-1); /* Mirror effect */
        }

        .call-controls {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .call-duration {
          color: white;
          font-size: 18px;
          font-weight: bold;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .control-buttons {
          display: flex;
          gap: 20px;
        }

        .control-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          font-size: 24px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transition: all 0.3s;
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .control-btn.disabled {
          background: rgba(255, 0, 0, 0.5);
        }

        .end-call-btn {
          background: #ff3b30;
          width: 80px;
        }

        .end-call-btn:hover {
          background: #ff1f1f;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;

// ============================================
// INCOMING CALL COMPONENT (For Callee)
// ============================================

interface IncomingCallProps {
  callerName: string;
  callerAvatar?: string;
  callType: 'audio' | 'video';
  onAccept: () => void;
  onReject: () => void;
}

export const IncomingCall: React.FC<IncomingCallProps> = ({
  callerName,
  callerAvatar,
  callType,
  onAccept,
  onReject
}) => {
  return (
    <div className="incoming-call-overlay">
      <div className="incoming-call-card">
        {/* Caller Avatar */}
        <div className="caller-avatar">
          {callerAvatar ? (
            <img src={callerAvatar} alt={callerName} />
          ) : (
            <div className="avatar-placeholder">
              {callerName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Caller Info */}
        <h2>{callerName}</h2>
        <p>Cuộc gọi {callType === 'video' ? 'video' : 'thoại'} đến...</p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={onReject} className="reject-btn">
            ❌ Từ chối
          </button>
          <button onClick={onAccept} className="accept-btn">
            ✅ Chấp nhận
          </button>
        </div>
      </div>

      <style jsx>{`
        .incoming-call-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .incoming-call-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          max-width: 400px;
        }

        .caller-avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
        }

        .caller-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          background: #007aff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: bold;
        }

        h2 {
          margin: 0 0 10px;
          font-size: 24px;
        }

        p {
          color: #666;
          margin: 0 0 30px;
        }

        .action-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .action-buttons button {
          padding: 15px 30px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
        }

        .reject-btn {
          background: #ff3b30;
          color: white;
        }

        .reject-btn:hover {
          background: #ff1f1f;
        }

        .accept-btn {
          background: #34c759;
          color: white;
        }

        .accept-btn:hover {
          background: #28a745;
        }
      `}</style>
    </div>
  );
};

// ============================================
// USAGE EXAMPLE
// ============================================

/*
import VideoCall, { IncomingCall } from './VideoCall';

function ChatApp() {
  const [isInCall, setIsInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    // Listen for incoming calls
    socket.on('call:incoming', (data) => {
      setIncomingCall(data);
    });

    return () => {
      socket.off('call:incoming');
    };
  }, []);

  const handleStartCall = () => {
    setIsInCall(true);
  };

  const handleAcceptCall = () => {
    setIsInCall(true);
    setIncomingCall(null);
    
    // Send accept to backend
    socket.emit('call:answer', {
      callerId: incomingCall.callerId,
      accepted: true,
      conversationId: incomingCall.conversationId,
      answererName: currentUser.name
    });
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
    
    // Send reject to backend
    socket.emit('call:reject', {
      callerId: incomingCall.callerId,
      conversationId: incomingCall.conversationId
    });
  };

  return (
    <div>
      {/* Your chat UI *\/}
      
      {/* Incoming Call Modal *\/}
      {incomingCall && (
        <IncomingCall
          callerName={incomingCall.callerName}
          callerAvatar={incomingCall.callerAvatar}
          callType={incomingCall.callType}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
        />
      )}

      {/* Video Call Screen *\/}
      {isInCall && (
        <VideoCall
          currentUserId={currentUser.id}
          currentUserName={currentUser.name}
          currentUserAvatar={currentUser.avatar}
          targetUserId={targetUser.id}
          conversationId={conversationId}
          callType="video"
          onCallEnd={() => setIsInCall(false)}
        />
      )}
    </div>
  );
}
*/
