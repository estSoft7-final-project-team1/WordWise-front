import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Search, X, ChevronLeft, ChevronRight} from 'lucide-react';
import ImageLogo from '../static/image/imagelogo.png';
import axios from "axios";

const MAX_PAGE_DISPLAY = 10;

const WordbookRanking = () => {
  const navigate = useNavigate();
  const [wordCountPage, setWordCountPage] = useState({
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
    fetchWordBookRanking(0); // 첫 페이지 데이터 불러오기
  }, []);

  const fetchWordBookRanking = async (page) => {
    try {
      const response = await axios.get(`/wordbook/ranking?page=${page}`);
      setWordCountPage(response.data);
      if (response.data.content.length === 0) {
        setEmpty(true);
      }
    } catch (error) {
      console.error("Failed to fetch word books", error);
    }
  };

  // 상세 조회 페이지로 이동
  // const handleWordbookClick = async (wordBookId) => {
  //   navigate(`/api/wordbook/${wordBookId}`);
  // };

  const startPage = Math.max(0,
      wordCountPage.number - Math.floor(MAX_PAGE_DISPLAY / 2));
  const endPage = Math.min(wordCountPage.totalPages - 1,
      startPage + MAX_PAGE_DISPLAY - 1);

  return (
      <div>
        <h1 className="text-3xl font-bold">단어 랭킹</h1>
        {wordCountPage.content.length > 0 && <div className="overflow-x-auto">
        <table className="table">
          <thead>
          <tr>
            <th>단어</th>
            <th>등록한 유저 수</th>
          </tr>
          </thead>
          <tbody>
          {wordCountPage.content.length > 0 &&
              wordCountPage.content.map((wordBook) => (
                  <tr key={wordBook.wordText} className="hover">
                    <td>{wordBook.wordText}</td>
                    <td>{wordBook.count}</td>
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
              onClick={() => fetchWordBookRanking(wordCountPage.number - 1)}
              disabled={wordCountPage.first}
          >
            <ChevronLeft/>
          </button>

          {startPage > 0 && (
              <>
                <button className="join-item btn btn-md"
                        onClick={() => fetchWordBookRanking(0)}>1
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
                    className={`join-item btn btn-md ${wordCountPage.number
                    === pageNum ? "btn-active" : ""}`}
                    onClick={() => fetchWordBookRanking(pageNum)}
                >
                  {pageNum + 1}
                </button>
            );
          })}

          {endPage < wordCountPage.totalPages - 1 && (
              <>
                {endPage < wordCountPage.totalPages - 2 && <span
                    className="join-item btn btn-md btn-disabled">...</span>}
                <button className="join-item btn btn-md"
                        onClick={() => fetchWordBookRanking(
                            wordCountPage.totalPages - 1)}>
                  {wordCountPage.totalPages}
                </button>
              </>
          )}

          <button
              className="join-item btn btn-md"
              onClick={() => fetchWordBookRanking(wordCountPage.number + 1)}
              disabled={wordCountPage.last}
          >
            <ChevronRight/>
          </button>
        </div>
      </div>
  );
};

export default WordbookRanking;