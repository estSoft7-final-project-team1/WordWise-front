import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "It's over Anakin,\nI have the high ground.",
      isSentByUser: false
    },
    {
      id: 2,
      text: "You underestimate my power!",
      isSentByUser: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isSentByUser: true
    };

    setMessages([...messages, newMessage]);
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
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">
              보내기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;