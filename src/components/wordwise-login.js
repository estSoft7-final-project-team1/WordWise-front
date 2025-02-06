import { useState } from 'react';
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직을 여기에 구현
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="w-full bg-white">
      {/* 헤더 부분 유지 */}
      <header className="flex justify-between items-center px-4 py-2">
        <img src="/api/placeholder/40/40" alt="WordWise Logo" className="w-10 h-10" />
        <div className="flex gap-4">
          <button className="text-gray-600">단어장</button>
          <button className="text-gray-600"><Link to="/api/wordtest/start">단어테스트</Link></button>
          <button className="text-gray-600"><Link to="/api/word">예문생성</Link></button>
          <button className="text-gray-600"><Link to="/api/chat">채팅회화연습</Link></button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">로그인</button>
        </div>
      </header>

      {/* 로그인 폼 부분 */}
      
    </div>
  );
};

export default LoginPage;