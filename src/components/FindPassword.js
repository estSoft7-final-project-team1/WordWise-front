import { useState, useEffect } from 'react';
import Imagebackground from '../static/image/imagebackground.png';

const PasswordResetPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('비밀번호 찾기 요청:', email);
    // 비밀번호 찾기 로직 구현
  };

  return (
    <div className="w-full">
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
        {/* 배너 콘텐츠 */}
        <div className="relative z-10 text-center py-12">
          <h1 className="text-2xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white text-opacity-80">
            {slides[currentSlide].subtitle}
          </p>
        </div>
      </div>

      {/* 비밀번호 찾기 폼 */}
      <div className="max-w-md mx-auto mt-8 p-6">
        <div className="bg-neutral rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-center mb-6">비밀번호 찾기</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 btn text-white py-2 rounded-md"
              >
                확인
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;