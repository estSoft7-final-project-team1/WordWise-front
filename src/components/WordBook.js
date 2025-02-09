import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Search, X, ChevronLeft, ChevronRight} from 'lucide-react';
import ImageLogo from '../static/image/imagelogo.png';
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

  useEffect(() => {
    fetchWordBooks(0); // 첫 페이지 데이터 불러오기
  }, []);

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

  const startPage = Math.max(0,
      wordBookPage.number - Math.floor(MAX_PAGE_DISPLAY / 2));
  const endPage = Math.min(wordBookPage.totalPages - 1,
      startPage + MAX_PAGE_DISPLAY - 1);

  return (
      <div>
        <h1 className="text-3xl font-bold">내 단어장</h1>
        {wordBookPage.content.length > 0 &&
            <div className ="overflow-x-auto">
              <table className="table w-full">
                <thead>
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
                          <td>{wordBook.wordText}</td>
                          <td>{wordBook.definition}</td>
                        </tr>
                    ))}
                </tbody>
              </table>

            </div>}

        {isEmpty && <div> className="text-gray-500 text-center p-4">등록된 단어가 아직
          없습니다!
        </div>}

        {isEmpty && <div className="mt-4">
          <button className="btn btn-neutral"
                  onClick={() => navigate("/api/word")}>
            단어 검색으로 이동
          </button>
        </div>}

        {/* 페이지네이션 UI */}
        <div className="join mt-4">
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
  );
};

export default WordBook;