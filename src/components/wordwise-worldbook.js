import { useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageLogo from '../static/image/imagelogo.png';

const Worldbook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [wordList, setWordList] = useState([
    {
      title: 'General',
      description: '일반적인, 전체적인, (군사)장군, (의학)전신의',
      progress: 42,
      badge: 'badge-warning',
      examples: [
        {
          sentence: "In general, exercise is good for your health.",
          explanation: "일반적으로, 운동은 건강에 좋다. ('일반적으로'라는 의미로 사용되는 가장 흔한 예시)"
        },
        {
          sentence: "The general manager is responsible for all departments.",
          explanation: "총괄 매니저는 모든 부서를 책임진다. (전체를 관리하는 직위를 나타낼 때 사용)"
        },
        {
          sentence: "General Kim is leading the military parade.",
          explanation: "김 장군이 군사 퍼레이드를 이끌고 있다. (군사적 직위로 사용)"
        },
        {
          sentence: "The hospital performed a general health check-up.",
          explanation: "병원에서 전신 건강검진을 실시했다. (의학적 맥락에서 '전반적인'의 의미로 사용)"
        }
      ]
    },
    {
      title: 'Set',
      description: '배치하다, 놓다, 정해진, 고정된, 세트, 집합, 모음, 준비된',
      progress: 38,
      badge: 'badge-secondary',
      examples: [
        {
          sentence: "Please set the table for dinner.",
          explanation: "저녁 식사를 위해 식탁을 차려주세요. ('준비하다'의 의미로 사용)"
        },
        {
          sentence: "The sun sets in the west.",
          explanation: "태양은 서쪽으로 진다. (자연현상을 설명할 때 사용)"
        },
        {
          sentence: "The date is set for next Monday.",
          explanation: "날짜는 다음 월요일로 정해졌다. ('정하다/결정하다'의 의미로 사용)"
        },
        {
          sentence: "I bought a new set of golf clubs.",
          explanation: "새로운 골프채 세트를 샀다. ('한 묶음'을 의미할 때 사용)"
        }
      ]
    },
    {
      title: 'Run',
      description: '달리다, 운영하다, 작동시키다, 흐르다, 흘러내리다, 출전하다',
      progress: 34,
      badge: 'badge-warning',
      examples: [
        {
          sentence: "She runs five kilometers every morning.",
          explanation: "그녀는 매일 아침 5킬로미터를 달린다. (물리적인 달리기 행위)"
        },
        {
          sentence: "My father runs a small business.",
          explanation: "아버지는 작은 사업체를 운영하신다. ('운영하다'의 의미로 사용)"
        },
        {
          sentence: "The program runs smoothly on my computer.",
          explanation: "이 프로그램은 내 컴퓨터에서 순조롭게 작동한다. ('작동하다'의 의미로 사용)"
        },
        {
          sentence: "Tears ran down her cheeks.",
          explanation: "눈물이 그녀의 뺨을 타고 흘러내렸다. ('흐르다'의 의미로 사용)"
        }
      ]
    },
    {
      title: 'Light',
      description: '빛, 조명, 가벼운, 연한, 밝은, 불을 붙이다',
      progress: 30,
      badge: 'badge-ghost',
      examples: [
        {
          sentence: "Please turn on the light.",
          explanation: "불을 켜주세요. (명사로서 '조명'의 의미로 사용)"
        },
        {
          sentence: "This bag is very light to carry.",
          explanation: "이 가방은 들기에 매우 가볍다. (형용사로서 '가벼운'의 의미로 사용)"
        },
        {
          sentence: "I prefer light colors for summer clothes.",
          explanation: "나는 여름 옷으로 연한 색상을 선호한다. ('연한/밝은'의 의미로 사용)"
        },
        {
          sentence: "Could you light the candle, please?",
          explanation: "촛불 좀 켜주시겠어요? (동사로서 '불을 붙이다'의 의미로 사용)"
        }
      ]
    }]);

  // 페이징 계산
  const totalPages = Math.ceil(wordList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWords = wordList.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <img src={ImageLogo} alt="WordWise Logo" className="h-10" />
          <div className="flex gap-4 items-center">
            <button className="text-gray-600">학습하기</button>
            <button className="text-gray-600">단어장</button>
            <button className="text-gray-600">회화연습</button>
            <button className="text-white bg-red-500 px-6 py-2 rounded-md hover:bg-red-600">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 검색 바 */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center bg-white rounded-lg shadow-sm">
            <Search className="w-6 h-6 ml-4 text-gray-400" />
            <input
              type="text"
              placeholder="검색할 단어를 입력해주세요"
              className="flex-1 px-4 py-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-2 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 m-1">
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 단어 리스트 */}
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {currentWords.map((item) => (
            <div
              key={item.word}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md"
              onClick={() => {
                setSelectedWord(item);
                setShowExampleModal(true);
              }}
            >
              <h3 className="text-lg font-semibold">{item.word}</h3>
              <p className="text-gray-600">{item.meaning}</p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 mt-8 mb-8">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-2 py-1 rounded-md hover:bg-gray-100"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => 
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className="px-2 py-1 rounded-md hover:bg-gray-100"
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 예문 모달 */}
      {showExampleModal && selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">{selectedWord.word}</h3>
              <button
                onClick={() => setShowExampleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">{selectedWord.meaning}</p>
            <div className="space-y-4">
              <h4 className="font-medium text-lg">예문</h4>
              {selectedWord.examples.length > 0 ? (
                selectedWord.examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <p className="bg-gray-50 p-3 rounded-lg font-medium">
                      {example.sentence}
                    </p>
                    <p className="text-gray-600 text-sm px-3">
                      {example.explanation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  등록된 예문이 없습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Worldbook;