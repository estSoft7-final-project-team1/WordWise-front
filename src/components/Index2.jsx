import { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";
import LogoImage from '../static/image/imagelogo.png'
import backgroundImage from '../static/image/imagebackground.png'

const WordWisePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full bg-white">
      <header className="flex justify-between items-center px-4 py-2">
        <img src={LogoImage} alt="WordWise Logo" className="w-10 h-10" />
        <div className="flex gap-4">
          <button className="text-gray-600"><Link to="/wordbookRanking">단어장</Link></button>
          <button className="text-gray-600"><Link to="/wordbook">개인단어장</Link></button>
          <button className="text-gray-600"><Link to="/wordtest">단어테스트</Link></button>
          <button className="text-gray-600"><Link to="/word">예문생성</Link></button>
          <button className="text-gray-600"><Link to="/chat">채팅회화연습</Link></button>
          {isLoggedIn ? (
            <>
              <button className="text-gray-600"><Link to="/api/mypage">마이페이지</Link></button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
              <Link to="/login">로그인</Link>
            </button>
          )}
        </div>
      </header>

      <div className="bg-blue-500 p-8 relative min-h-[300px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage}} />
        <div className="relative z-10 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h1>
          <p className="text-lg opacity-80">{slides[currentSlide].subtitle}</p>
        </div>
        <div className="relative z-10 flex items-center justify-center gap-2">
          <button className="text-white">&lt;</button>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`transition-all duration-500 rounded-full bg-white
                ${index === currentSlide ? 'w-3 h-3 opacity-100' : 'w-2 h-2 opacity-50'}`}
            />
          ))}
          <button className="text-white">&gt;</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto -mt-6 px-4 relative z-10">
        <div className="bg-white rounded-lg shadow-lg flex items-center p-2">
          <Search className="text-gray-400 w-6 h-6 ml-2" />
          <input
            type="text"
            placeholder="학습하고 싶은 단어를 입력해 주세요"
            className="flex-1 px-4 py-2 outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md">검색</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 px-4">
        <h2 className="text-xl font-bold mb-6">주요 기능</h2>
        <div className="grid grid-cols-3 gap-6 mb-12">

          <div className="bg-gray-50 p-6 rounded-lg text-center">{/*여기*/}
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded" />
            </div>
            <h3 className="font-bold mb-2">스마트 단어장</h3>
            <p className="text-sm text-gray-600">개인화된 학습 알고리즘으로 효율적인 단어 학습을 제공해드립니다</p>
          </div>


          <div className="bg-gray-50 p-6 rounded-lg text-center"> {/*여기*/}
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded" />
            </div>
            <h3 className="font-bold mb-2">AI 회화 연습</h3>
            <p className="text-sm text-gray-600">AI와 함께 자연스러운 회화 연습이 가능해 보세요</p>
          </div>


          <div className="bg-gray-50 p-6 rounded-lg text-center"> {/*여기*/}
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded" />
            </div>
            <h3 className="font-bold mb-2">학습 분석</h3>
            <p className="text-sm text-gray-600">데일리 리포트로 나의 학습 현황을 체계적으로 분석해 보세요</p>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">최근 추가된 단어</h2>
            <button className="text-blue-500 flex items-center gap-1">
              <Link to="/wordbook">단어장 더보기</Link>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <h3 className="font-bold mb-1">Apple</h3>
                <p className="text-gray-600 mb-2">사과</p>
                <p className="text-sm text-gray-500">I eat an apple every morning</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordWisePage;