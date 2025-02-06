import { useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageLogo from '../static/image/imagelogo.png';

const MyWordbook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [wordList, setWordList] = useState([
    {
      word: 'Obfuscate',
      meaning: '(동사) 애매하게 하다, 혼란스럽게 하다',
      examples: [
        {
          sentence: "The lawyer tried to obfuscate the truth during the trial.",
          explanation: "변호사가 재판 중에 진실을 모호하게 하려고 했다. (법정에서 사실을 의도적으로 불분명하게 만드는 상황을 표현)"
        },
        {
          sentence: "The complex language in the contract served to obfuscate its real meaning.",
          explanation: "계약서의 복잡한 언어는 실제 의미를 불분명하게 만들었다. (법률 문서에서 복잡한 용어를 사용하여 의미를 불명확하게 만드는 경우)"
        },
        {
          sentence: "Politicians often obfuscate their answers to difficult questions.",
          explanation: "정치인들은 종종 어려운 질문에 대한 답변을 모호하게 한다. (민감한 질문에 대해 의도적으로 불명확한 답변을 하는 상황)"
        },
        {
          sentence: "The poor translation only served to obfuscate the original message.",
          explanation: "잘못된 번역은 원래 메시지를 더욱 모호하게 만들었을 뿐이다. (부적절한 번역으로 인해 원문의 의미가 불명확해지는 경우)"
        },
        {
          sentence: "They deliberately obfuscate the data to hide their mistakes.",
          explanation: "그들은 실수를 숨기기 위해 의도적으로 데이터를 모호하게 만든다. (잘못을 감추기 위해 정보를 의도적으로 불명확하게 만드는 상황)"
        }
      ]
    },
    {
      word: 'Ephemeral',
      meaning: '덧없는, 순식간의',
      examples: [
        {
          sentence: "Social media fame is often ephemeral.",
          explanation: "소셜 미디어의 명성은 대개 일시적이다. (현대 소셜 미디어에서 인기의 덧없음을 표현)"
        },
        {
          sentence: "The beauty of cherry blossoms is ephemeral but memorable.",
          explanation: "벚꽃의 아름다움은 순간적이지만 기억에 남는다. (자연의 아름다움이 짧지만 강렬한 인상을 주는 상황)"
        },
        {
          sentence: "Their happiness was ephemeral, lasting only a few days.",
          explanation: "그들의 행복은 덧없어서 단 며칠밖에 지속되지 않았다. (짧은 기간 동안만 지속되는 감정을 설명)"
        },
        {
          sentence: "Modern technology makes many jobs ephemeral.",
          explanation: "현대 기술은 많은 직업을 일시적인 것으로 만든다. (기술 발전으로 인한 직업의 수명이 짧아지는 현상)"
        },
        {
          sentence: "The ephemeral nature of fashion trends makes them hard to follow.",
          explanation: "패션 트렌드의 일시적인 특성은 그것들을 따라가기 어렵게 만든다. (유행의 빠른 변화를 설명)"
        }
      ]
    },
    {
      word: 'Quintessential',
      meaning: '본질적인, 정밀적인',
      examples: [
        {
          sentence: "The hamburger is the quintessential American fast food.",
          explanation: "햄버거는 가장 대표적인 미국식 패스트푸드이다. (어떤 것의 가장 전형적인 예를 설명)"
        },
        {
          sentence: "She is the quintessential example of a modern career woman.",
          explanation: "그녀는 현대 직장 여성의 전형적인 예시이다. (특정 유형의 완벽한 예시를 나타냄)"
        },
        {
          sentence: "Paris in spring is the quintessential romantic getaway.",
          explanation: "봄의 파리는 가장 전형적인 로맨틱한 휴양지이다. (어떤 장소나 경험의 완벽한 전형을 설명)"
        }
      ]
    },
    {
      word: 'Sycophant',
      meaning: '아첨꾼, 비굴한 사람',
      examples: [
        {
          sentence: "He's just a sycophant who agrees with everything the boss says.",
          explanation: "그는 상사가 하는 말은 뭐든 동의하는 아첨꾼일 뿐이다. (직장에서 흔히 볼 수 있는 아부하는 행동을 묘사)"
        },
        {
          sentence: "The court was full of sycophants seeking the king's favor.",
          explanation: "궁정은 왕의 환심을 사려는 아첨꾼들로 가득했다. (권력자에게 아부하는 사람들의 모습을 역사적 맥락에서 설명)"
        },
        {
          sentence: "Don't be such a sycophant - speak your mind honestly.",
          explanation: "그렇게 아부하지 말고 솔직하게 네 생각을 말해라. (아부하는 행동을 비판하며 정직한 태도를 권장)"
        }
      ]
    },
    {
      word: 'Ubiquitous',
      meaning: '어디에나 존재하는, 편재하는',
      examples: [
        {
          sentence: "Smartphones have become ubiquitous in modern society.",
          explanation: "스마트폰은 현대 사회에서 어디에나 있는 것이 되었다. (현대 기술의 보편적 존재를 설명)"
        },
        {
          sentence: "Coffee shops are ubiquitous in urban areas.",
          explanation: "커피숍은 도시 지역에서 어디서나 볼 수 있다. (도시 환경에서 흔히 발견되는 것을 설명)"
        },
        {
          sentence: "Plastic pollution has become ubiquitous in our oceans.",
          explanation: "플라스틱 오염은 우리의 바다에서 어디에나 존재하게 되었다. (환경 문제의 광범위한 영향을 설명)"
        },
        {
          sentence: "The company's logo is ubiquitous in this part of the city.",
          explanation: "그 회사의 로고는 도시의 이 부분에서 어디서나 볼 수 있다. (브랜드의 가시성이 높은 상황을 설명)"
        }
      ]
    }
  ]);

  const totalPages = Math.ceil(wordList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWords = wordList.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchTerm);
  };

  const handleDelete = (word) => {
    setSelectedWord(word);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setWordList(wordList.filter(item => item.word !== selectedWord.word));
    setShowDeleteModal(false);
    setSelectedWord(null);
  };

  const showExamples = (word) => {
    setSelectedWord(word);
    setShowExampleModal(true);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          <ChevronLeft className="w-4 h-4 -ml-2" />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1 rounded-md hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
          <ChevronRight className="w-4 h-4 -ml-2" />
        </button>
      </div>
    );
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

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">내 단어장</h1>
        
        {/* 검색 바 */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="학습하고 싶은 단어를 입력해 주세요"
                className="w-full pl-10 pr-10 py-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-blue-500" />
                </button>
              )}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              검색
            </button>
          </form>
        </div>

      {/* 단어 리스트 */}
      <div className="max-w-2xl mx-auto space-y-4">
        {currentWords.map((item) => (
          <div 
            key={item.word} 
            className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center cursor-pointer hover:shadow-md"
            onClick={() => {
              setSelectedWord(item);
              setShowExampleModal(true);
            }}
          >
              <div>
                <h3 className="font-semibold text-lg">{item.word}</h3>
                <p className="text-gray-600">{item.meaning}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-600 px-3 py-1 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item);
                }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      <Pagination />

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
                <p className="text-gray-500 text-center py-4">등록된 예문이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="font-bold text-lg mb-4">단어 삭제</h3>
            <p className="mb-6">{selectedWord?.word}를 단어장에서 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                삭제
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyWordbook;