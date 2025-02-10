import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Search, X, ChevronLeft, ChevronRight} from 'lucide-react';
import axios from '../utils/ApiClient';

const MAX_PAGE_DISPLAY = 10;

const WordBook = () => {
  const navigate = useNavigate();
  const [wordBookPage, setWordBookPage] = useState({
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 10,
    number: 0,
    first: true,
    last: false,
    hasNext: false,
    hasPrevious: false
  });
  const [isEmpty, setEmpty] = useState(false);
  const [searchWordText, setSearchWordText] = useState('');
  const handleInputChange = (e) => {
    setSearchWordText(e.target.value);
  };
  const startPage = Math.max(0,
      wordBookPage.number - Math.floor(MAX_PAGE_DISPLAY / 2));
  const endPage = Math.min(wordBookPage.totalPages - 1,
      startPage + MAX_PAGE_DISPLAY - 1);

  const fetchWordBooks = async (page) => {
    try {
      const response = await axios.get(`/wordbook?&page=${page}`);
      setWordBookPage(response.data);
      if (response.data.content.length === 0) {
        setEmpty(true);
      }
    } catch (error) {
      console.error("Failed to fetch word books", error);
    }
  };

  // 상세 조회 페이지로 이동
  const handleWordbookClick = async (wordBookId) => {
    navigate(`/api/wordbook/${wordBookId}`);
  };

  const handleGoWordPage = async () => {
    navigate(`/api/word`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWordBook();
  };

  const fetchWordBook = async () => {
    try {
      const response = await axios.get(`/wordbook/${searchWordText}`)
      await handleWordbookClick(response.data.id);
    } catch (error) {
      if (error.response.status === 400) {
        document.getElementById("noSuchWordModal").showModal();
      } else {
        alert("서버 오류! 다시시도해주세요.");
      }
    }
  }

  useEffect(() => {
    fetchWordBooks(0); // 첫 페이지 데이터 불러오기
  }, []);

  return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-5">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-3xl font-bold">내 단어장</h1>
          <div className="word-input-div">
            <form onSubmit={handleSubmit}
                  className="flex w-full max-w-md items-center space-x-2">
              <input
                  type="text"
                  className="flex-1 h-full px-4 py-2 border border-gray-300 rounded-md"
                  value={searchWordText}
                  onChange={handleInputChange}
                  pattern="[a-z]*"
                  title="영어 소문자만 입력할 수 있습니다."
                  placeholder="단어를 입력해 주세요"
              />
              <button className="btn btn-neutral h-full px-4 py-2"
                      type="submit">
                단어장 내 검색
              </button>
            </form>
          </div>

          <div className="main-content-div">
            {wordBookPage.content.length > 0 &&
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="text-center">
                    <tr>
                      <th>단어</th>
                      <th>정의</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wordBookPage.content.length > 0 &&
                        wordBookPage.content.map((wordBook) => (
                            <tr
                                key={wordBook.id}
                                className="hover cursor-pointer"
                                onClick={() => handleWordbookClick(wordBook.id)}
                            >
                              <td className="text-center">{wordBook.wordText}</td>
                              <td>{wordBook.definition}</td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>}

            {isEmpty && <div className="text-gray-500 text-center p-4">등록된 단어가
              아직
              없습니다!
            </div>}

            {isEmpty && <div className="mt-4">
              <button className="btn btn-neutral"
                      onClick={() => navigate("/api/word")}>
                단어 검색으로 이동
              </button>
            </div>}
          </div>

          {/* 페이지네이션 UI */}
          <div className="join">
            <button
                className="join-item btn btn-md"
                onClick={() => fetchWordBooks(wordBookPage.number - 1)}
                disabled={wordBookPage.first}
            >
              <ChevronLeft/>
            </button>

            {startPage > 0 && (
                <>
                  <button className="join-item btn btn-md"
                          onClick={() => fetchWordBooks(0)}>1
                  </button>
                  {startPage > 1 && <span
                      className="join-item btn btn-md btn-disabled">...</span>}
                </>
            )}

            {Array.from({length: endPage - startPage + 1}, (_, index) => {
              const pageNum = startPage + index;
              return (
                  <button
                      key={pageNum}
                      className={`join-item btn btn-md ${wordBookPage.number
                      === pageNum ? "btn-active" : ""}`}
                      onClick={() => fetchWordBooks(pageNum)}
                  >
                    {pageNum + 1}
                  </button>
              );
            })}

            {endPage < wordBookPage.totalPages - 1 && (
                <>
                  {endPage < wordBookPage.totalPages - 2 && <span
                      className="join-item btn btn-md btn-disabled">...</span>}
                  <button className="join-item btn btn-md"
                          onClick={() => fetchWordBooks(
                              wordBookPage.totalPages - 1)}>
                    {wordBookPage.totalPages}
                  </button>
                </>
            )}

            <button
                className="join-item btn btn-md"
                onClick={() => fetchWordBooks(wordBookPage.number + 1)}
                disabled={wordBookPage.last}
            >
              <ChevronRight/>
            </button>
          </div>
        </div>

        <dialog id="noSuchWordModal" className="modal">
          <div className="modal-box flex flex-col items-center text-center">
              <p>해당 단어({searchWordText})가 단어장에 존재하지 않습니다!</p>
              <p>단어 검색 페이지로 이동하시겠습니까?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="btn btn-neutral" onClick={handleGoWordPage}>단어 검색 페이지로 이동
              </button>
              <form method="dialog">
                <button className="btn btn-neutral">닫기</button>
              </form>
            </div>
          </div>
        </dialog>

      </div>
  );
};

export default WordBook;