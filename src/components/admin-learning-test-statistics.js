import React, { useState, useEffect } from 'react';
import { User, Book, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "쉽고 재미있게 시작하는 영어 학습",
      subtitle: "WordWise와 함께 효과적인 영단어 학습과 자연스러운 회화 실력을 키워보세요"
    },
    {
      title: "지금 바로 WordWise와 함께 영어 학습을 시작해 보세요",
      subtitle: "매일 15분씩, 꾸준한 학습으로 영어 실력을 향상 시킬수 있습니다."
    }
  ];

  // 라인 차트 데이터
  const lineChartData = [
    { name: '1위', value: 150 },
    { name: '2위', value: 120 },
    { name: '3위', value: 90 },
    { name: '4위', value: 80 },
    { name: '5위', value: 70 },
    { name: '6위', value: 60 },
    { name: '7위', value: 50 },
    { name: '8위', value: 40 },
    { name: '9위', value: 30 },
    { name: '10위', value: 20 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const PyramidChart = () => (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M10 90 L50 10 L90 90 Z" fill="#4CAF50" opacity="0.2" />
        <path d="M20 90 L50 30 L80 90 Z" fill="#4CAF50" opacity="0.4" />
        <path d="M30 90 L50 50 L70 90 Z" fill="#4CAF50" opacity="0.6" />
        <path d="M40 90 L50 70 L60 90 Z" fill="#4CAF50" opacity="0.8" />
        
        {/* 텍스트 레이블 */}
        <text x="92" y="85" fontSize="4" fill="#666">초급</text>
        <text x="92" y="65" fontSize="4" fill="#666">중급</text>
        <text x="92" y="45" fontSize="4" fill="#666">고급</text>
        <text x="92" y="25" fontSize="4" fill="#666">마스터</text>
      </svg>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <img src="/api/placeholder/40/40" alt="WordWise Logo" className="h-8" />
          <div className="flex gap-6">
            <button className="text-gray-600">관리자 대시보드</button>
            <button className="text-gray-600">학습하기</button>
            <button className="text-gray-600">단어장</button>
            <button className="text-gray-600">채팅연습</button>
            <button className="bg-red-500 text-white px-4 py-1 rounded">로그아웃</button>
          </div>
        </div>
      </header>

      <div className="bg-blue-500 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-2">{slides[currentSlide].title}</h1>
          <p className="text-white opacity-90">{slides[currentSlide].subtitle}</p>
          <div className="flex justify-center gap-2 mt-4">
            <button className="text-white">&lt;</button>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full bg-white ${idx === currentSlide ? 'opacity-100' : 'opacity-50'}`}
              />
            ))}
            <button className="text-white">&gt;</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-center text-xl font-bold mb-8">관리자 대시보드</h2>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-medium mb-2">사용자 관리</h3>
            <p className="text-sm text-gray-600 mb-3">사용자 목록 및 권한 관리</p>
            <button className="text-blue-500 text-sm hover:underline">자세히보기</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Book className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-medium mb-2">단어 통계</h3>
            <p className="text-sm text-gray-600 mb-3">검색어 통계 및 분석</p>
            <button className="text-blue-500 text-sm hover:underline">자세히보기</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Award className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="font-medium mb-2">학습 분석</h3>
            <p className="text-sm text-gray-600 mb-3">단어 학습 현황 분석</p>
            <button className="text-blue-500 text-sm hover:underline">자세히보기</button>
          </div>
        </div>

        {/* 차트 섹션 추가 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-4">학습 순위</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4CAF50" 
                    strokeWidth={2}
                    dot={{ fill: '#4CAF50' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-4">학습 단계</h3>
            <PyramidChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;