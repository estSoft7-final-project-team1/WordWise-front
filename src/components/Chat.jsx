import React, { useState, useEffect, useRef } from 'react';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [ws, setWs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // 웹소켓 연결 초기화
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:8080/chat-endpoint');
        setWs(websocket);

        websocket.onmessage = (event) => {
            setIsLoading(false); // 로딩 상태 해제
            const botMessage = {
                id: messages.length + 1,
                text: event.data,
                isSentByUser: false
            };
            setMessages(prev => [...prev, botMessage]);
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
    <div className="min-h-screen bg-base-200 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl h-[calc(100vh-8rem)] bg-base-100 rounded-box shadow-lg flex flex-col">
        {/* 채팅 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${message.isSentByUser ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-bubble whitespace-pre-wrap text-sm bg-opacity-90">
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 영역 */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-base-300">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              className="input input-bordered flex-1 input-sm"
              value={inputMessage}
              disabled={isLoading} // 로딩 중에는 입력 비활성화 가능
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm"  disabled={isLoading}>
              {isLoading ? '전송 중...' : '보내기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;