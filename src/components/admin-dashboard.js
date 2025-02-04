import { useState, useEffect } from 'react';
import { User, Book, Award } from 'lucide-react';
import { LineChart, Line, PieChart, Pie } from 'recharts';
import Imagebackground from '../static/image/imagebackground.png';
import ImageLogo from '../static/image/imagelogo.png';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const PyramidChart = () => (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <path d="M10 90 L50 10 L90 90 Z" fill="#4CAF50" opacity="0.3" />
      <path d="M20 90 L50 30 L80 90 Z" fill="#4CAF50" opacity="0.5" />
      <path d="M30 90 L50 50 L70 90 Z" fill="#4CAF50" opacity="0.7" />
    </svg>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <img src={ImageLogo} alt="WordWise Logo" className="h-8" />
          <div className="flex gap-6">
            <button className="text-gray-600">관리자 대시보드</button>
            <button className="text-gray-600">학습하기</button>
            <button className="text-gray-600">단어장</button>
            <button className="text-gray-600">채팅연습</button>
            <button className="bg-red-500 text-white px-4 py-1 rounded">로그아웃</button>
          </div>
        </div>
      </header>

      {/* 배너 섹션 */}
      <div className="relative bg-blue-500">
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 w-full"
          style={{
            backgroundImage: `url(${Imagebackground})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            height: '180px'
          }}
        />
        
        {/* 컨텐츠 */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white text-sm opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <button className="text-white">&lt;</button>
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full bg-white ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-50'
                }`}
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

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-28 flex items-center justify-center">
              <LineChart width={120} height={80} data={[{value: 1000}, {value: 1100}, {value: 1234}]}>
                <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} dot={false} />
              </LineChart>
            </div>
            <div className="text-center">
              <div>총 사용자</div>
              <div className="text-lg font-bold">1234명</div>
              <div className="text-green-500 text-sm">↑ 전월 대비 12% 증가</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-28 flex items-center justify-center">
              <LineChart width={120} height={80} data={[{value: 920}, {value: 900}, {value: 890}]}>
                <Line type="monotone" dataKey="value" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </div>
            <div className="text-center">
              <div>일평균 접속자</div>
              <div className="text-lg font-bold">890명</div>
              <div className="text-red-500 text-sm">↓ 전월 대비 5% 감소</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-28 flex items-center justify-center">
              <PieChart width={100} height={100}>
                <Pie
                  data={[{value: 60}, {value: 25}, {value: 15}]}
                  innerRadius={35}
                  outerRadius={45}
                  fill="#4CAF50"
                />
              </PieChart>
            </div>
            <div className="text-center">
              <div>단어 검색 수</div>
              <div className="text-lg text-blue-500">15678회</div>
              <div className="text-green-500 text-sm">↑ 전월 대비 8% 증가</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-28 flex items-center justify-center">
              <PyramidChart />
            </div>
            <div className="text-center">
              <div>학습 평균 점수</div>
              <div className="text-lg text-blue-500">82.5점</div>
              <div className="text-green-500 text-sm">↑ 전월 대비 3% 증가</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;