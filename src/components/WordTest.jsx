import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import '../static/css/WordTest.css'

const WordTest = () => {
  const [testData, setTestData] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answerCollection, setAnswerCollection] = useState([]);
  const [showAnswerButton, setShowAnswerButton] = useState(false); // 추가: 틀린문제 정보 확인
  const [currentAnswerInfo, setCurrentAnswerInfo] = useState(null); // 추가: 현재 정답 정보
  const swiperRef = useRef(null);

  useEffect(() => {
    axios.get('/api/wordtest/start')
      .then(response => setTestData(response.data))
      .catch(error => console.error('Error fetching test:', error));
  }, []);

  useEffect(() => {
    if (showResult) {
      axios.post('/api/wordtest/evaluate-answer', answerCollection, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => setAnswerCollection([]))
      .catch(error => console.error('Evaluation error:', error));
    }
  }, [showResult]);// showResult가 true일 때 최신 answerCollection을 서버로 전송


  const handleSubmit = () => {
    if (!userAnswer.trim()) {
      alert('답을 입력해주세요!');
      return;
    }

    const currentSlide = testData[swiperRef.current.activeIndex];
    const isCorrect = userAnswer.toLowerCase() === currentSlide.word.toLowerCase();

    if (!isCorrect) {
      setWrongAnswers(prev => [...prev, currentSlide]);
      setShowAnswerButton(true); // 오답 시 버튼 표시
      setCurrentAnswerInfo({ // 현재 문제 정보 저장
        word: currentSlide.word,
        sentence: currentSlide.sentence,
        sentenceMeaning: currentSlide.sentenceMeaning,
        userAnswer,
      });
    } else {
      setShowAnswerButton(false); // 정답 시 버튼 숨김
    }

    const newAnswer = {
      answer: currentSlide.word,
      userAnswer,
      questionId: currentSlide.questionId,
      exampleId: currentSlide.exampleId,
      isCorrect
    };

    setAnswerCollection(prev => [
      ...prev,newAnswer
    ]);

    if (swiperRef.current.isEnd) {
      setShowResult(true);
    } else {
      swiperRef.current.slideNext();
    }
    setUserAnswer('');
  };

  const handleRetry = () => {
    setTestData(wrongAnswers);
    setWrongAnswers([]);
    setShowResult(false);
    swiperRef.current.slideTo(0);
  };

  // 정답 상세 정보 표시 함수
  const handleShowAnswer = () => {
    alert(
      `정답: ${currentAnswerInfo.word}\n예문: ${currentAnswerInfo.sentence}\n해석: ${currentAnswerInfo.sentenceMeaning}\n제출한 답: ${currentAnswerInfo.userAnswer}`
    );
  };

  return (
    
    <div className="min-h-screen bg-base-200 p-8">
      
      
      {!showResult && (
        <>
        {/* 문제 */}
          <h1 className="text-4xl font-semibold text-center mb-12 text-gray-800">
            Vocabulary Test
          </h1>
          <Swiper
            onSwiper={swiper => (swiperRef.current = swiper)}
            effect="coverflow"
            modules={[EffectCoverflow]}
            centeredSlides={true}
            grabCursor={true}
            slidesPerView={3}
            spaceBetween={50}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            className="my-8 !overflow-visible"
          >
            {testData.map((item, index) => (
              <SwiperSlide key={index}
              style={{ transform: 'translate3d(0,0,0)' }} // 추가
              className="h-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 
                            border border-gray-100 transform transition-transform 
                            "
              >
                  <p>Word: <span>{item.word}</span></p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Sentence</p>
                      <p className="text-gray-700 font-medium italic">{item.sentence}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Meaning</p>
                      <p className="text-gray-600">{item.sentenceMeaning}</p>
                    </div>
                  </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 정답입력창 */}
          
          <div className="max-w-md mx-auto space-y-6">
            <input 
              placeholder="정답을 입력하세요"
              className='input input-bordered input-primary w-full max-w-xs'
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <button className="btn btn-outline btn-primary" onClick={handleSubmit}>Check Answer</button>
            {showAnswerButton && (
              <button 
              onClick={handleShowAnswer}
              className="w-full py-3 rounded-xl bg-white border border-gray-200
              text-blue-500 font-medium hover:bg-gray-50 transition-colors
              shadow-sm flex items-center justify-center space-x-2"
              >
                <span>Show Previous Answer</span>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">!</span>
              </button>
            )}
          </div>
         
        </>
      )}

     {showResult && (
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-gray-800">Test Completed!</h3>
          
          <div className="grid gap-6 mb-12">
            {wrongAnswers.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500">✕</span>
                  </div>
                  <h4 className="text-xl font-medium text-gray-800">{item.word}</h4>
                </div>
                <div className="space-y-2 text-left">
                  <p className="text-gray-600"><span className="text-gray-400">Example:</span> {item.sentence}</p>
                  <p className="text-gray-600"><span className="text-gray-400">Translation:</span> {item.sentenceMeaning}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleRetry}
              className="btn btn-primary px-8 py-3 rounded-xl text-lg
                        hover:bg-blue-600 transition-colors shadow-lg"
            >
              Retry Test
            </button>
            <button 
              className="btn btn-ghost px-8 py-3 rounded-xl text-lg border border-gray-200
                        hover:bg-gray-50 transition-colors"
              onClick={() => window.location.href = '/wordtest/statistics'}
            >
              View Statistics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 슬라이드 배경색 생성 함수
 


export default WordTest;