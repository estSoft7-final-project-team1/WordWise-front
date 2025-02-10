import React, {useState, useEffect} from 'react';
import { wordSearchKeyword } from '../utils/State';
import { useRecoilState } from 'recoil';
import {useNavigate} from 'react-router-dom';

const WordWisePage = () => {
  const [ searchKeyword, setSearchKeyword ] = useRecoilState(wordSearchKeyword);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [{
    title: "쉽고 재미있게 시작하는 영어 학습",
    subtitle: "WordWise와 함께 효과적인 영단어 학습과 자연스러운 회화 실력을 키워보세요"
  }, {
    title: "지금 바로 WordWise와 함께 영어 학습을 시작해 보세요",
    subtitle: "매일 15분씩, 꾸준한 학습으로 영어 실력을 향상 시킬수 있습니다."
  }];
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/api/word")
  };

  return (<div className="w-full">
    <div className="carouesel bg-neutral p-8 relative min-h-[300px]">
      <div className="relative z-10 mb-8">
        <h1 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h1>
        <p className="text-lg opacity-80">{slides[currentSlide].subtitle}</p>
      </div>
      <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-2">
        {slides.map((_, index) => (<div
            key={index}
            className={`transition-all duration-500 rounded-full bg-neutral-content
                ${index === currentSlide ? 'w-3 h-3 opacity-100'
                : 'w-2 h-2 opacity-50'}`}
        />))}
      </div>
    </div>

    <div
        className="word-input-div max-w-3xl mx-auto -mt-6 px-4 relative z-10">
      <form onSubmit={handleSubmit}
          className="rounded-lg bg-neutral-content shadow-lg flex items-center p-2 space-x-2">
        <input
            type="text"
            className="flex-1 px-4 py-2 outline-none rounded-md"
            onChange={handleInputChange}
            pattern="[a-z]*"
            title="영어 소문자만 입력할 수 있습니다."
            placeholder="단어를 입력해 주세요"
        />
        <button className="btn btn-neutral px-6 py-2 rounded-md"
                type="submit">검색
        </button>
      </form>
    </div>

    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h2 className="text-xl font-bold mb-6">주요 기능</h2>
      <div className="grid grid-cols-3 gap-6 mb-12">

        <div className="bg-neutral p-6 rounded-lg text-center">
          <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-10">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
            </svg>
          </div>
          <h3 className="font-bold mb-2">스마트 단어 테스트</h3>
          <p className="text-sm">효율적인 단어 학습을 제공해드립니다</p>
        </div>

        <div className="bg-neutral p-6 rounded-lg text-center">
          <div
              className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-10">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
            </svg>
          </div>
          <h3 className="font-bold mb-2">AI 회화 연습</h3>
          <p className="text-sm">AI와 함께 자연스러운 회화 연습이 가능합니다</p>
        </div>

        <div className="bg-neutral p-6 rounded-lg text-center">
          <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className="size-10">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>
            </svg>
          </div>
          <h3 className="font-bold mb-2">학습 분석</h3>
          <p className="text-sm">나의 학습 현황을 체계적으로 분석하세요</p>
        </div>
      </div>
    </div>
  </div>);
};

export default WordWisePage;