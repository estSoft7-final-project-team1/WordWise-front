import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다. 로그인 후 접근해주세요.');
      navigate('/login');
    }
  }, [navigate]);

  // 메시지 변경시 초기화 상태 체크
  useEffect(() => {
    // document.getElementById('loadingModal').showModal();
    const hasBotMessage = messages.some(msg => !msg.isSentByUser);
    if (hasBotMessage && !isInitialized) {
      setIsInitialized(true);
      document.getElementById('loadingModal').close();
    }
  }, [messages, isInitialized]);
  // 자동 스크롤 처리
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]); // messages나 isLoading 상태 변경시 트리거

  // 웹소켓 연결 초기화
  useEffect(() => {
    const websocket = new WebSocket('ws://52.78.105.134/chat-endpoint');
    setWs(websocket);
    websocket.onopen = () => {
      setIsConnected(true); // 연결 상태 업데이트
    };

    websocket.onmessage = (event) => {
      setIsLoading(false); // 로딩 상태 해제
      const botMessage = {
        id: messages.length + 1,
        text: event.data,
        isSentByUser: false
      };
      setMessages(prev => [...prev, botMessage]);
    };
    // 연결 종료 핸들러
    websocket.onclose = () => {
      setIsConnected(false); // 연결 상태 업데이트
    };

    // 에러 핸들러
    websocket.onerror = () => {
      setIsConnected(false); // 연결 상태 업데이트
    };


    return () => websocket.close();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !ws) return;

    // 사용자 메시지 추가
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isSentByUser: true
    };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true); // 로딩 상태 활성화

    // 웹소켓으로 메시지 전송
    ws.send(inputMessage);
    setInputMessage('');
  };

  return (
      <div
          className="min-h-screen bg-base-200 p-4 flex items-center justify-center">
        <div
            className="w-full max-w-2xl h-[calc(100vh-8rem)] bg-base-100 rounded-box shadow-lg flex flex-col">

          {/* 연결 상태 표시기 */}
          {!isConnected && (
              <div
                  className="text-center p-2 bg-warning/10 text-warning text-sm">
                ⚠️ 채팅 서버에 연결 중입니다...
              </div>
          )}

          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`chat ${message.isSentByUser ? 'chat-end'
                        : 'chat-start'}`}
                >
                  <div
                      className="chat-bubble whitespace-pre-wrap text-sm bg-opacity-90 flex items-center">
                    {message.text}
                  </div>
                </div>
            ))}

            {/* 로딩 인디케이터 */}
            {isLoading && (
                <div className="chat chat-start">
                  <div
                      className="chat-bubble whitespace-pre-wrap text-sm bg-opacity-90 flex items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      답변을 작성 중입니다...
                      <span className="loading loading-dots loading-sm "></span>
                    </div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          {/* 메시지 입력 영역 */}
          <form onSubmit={handleSendMessage}
                className="p-4 border-t border-base-300">
            <div className="flex gap-3">
              <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  className="input input-bordered flex-1 input-sm"
                  value={inputMessage}
                  disabled={!isConnected || !isInitialized
                      || isLoading} // 로딩 중에는 입력 비활성화 가능
                  onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  disabled={!isConnected || !isInitialized || isLoading}
              >
                {isLoading ? '전송 중...' : '보내기'}
              </button>
            </div>
          </form>
        </div>

        <dialog id="loadingModal" className="modal">
          <div
              className="modal-box flex flex-row items-center justify-center text-center w-full max-w-md space-x-2">
            <p>채팅 환경을 초기화 중입니다</p>
            <span className="loading loading-spinner loading-md mt-2"></span>
          </div>
        </dialog>
      </div>
  );
}

export default Chat;