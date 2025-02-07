import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Search, X, ChevronLeft, ChevronRight} from 'lucide-react';
import ImageLogo from '../static/image/imagelogo.png';
import axios from "axios";

const WordbookRanking = () => {
  const navigate = useNavigate();
  const [wordCountList, setWordCountList] = useState([]);
  const [isEmpty, setEmpty] = useState(false);

  useEffect(() => {
    fetchWordBookRanking(0); // 첫 페이지 데이터 불러오기
  }, []);

  const fetchWordBookRanking = async (page) => {
    try {
      const response = await axios.get(`/wordbook/ranking`);
      setWordCountList(response.data);
      alert(JSON.stringify(response.data));
      if(response.data.length === 0){
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

  // const startPage = Math.max(0,
  //     wordBookPage.number - Math.floor(MAX_PAGE_DISPLAY / 2));
  // const endPage = Math.min(wordBookPage.totalPages - 1,
  //     startPage + MAX_PAGE_DISPLAY - 1);

  return (
      <div>
        <h2>Word Book List</h2>
        <ul className="menu menu-lg bg-base-200 rounded-box w-56">
          {wordCountList.length > 0 &&
              wordCountList.map((wordBook) => (
                  <li
                      key={wordBook.wordText}
                      className="p-2 hover:bg-gray-300 hover:text-black cursor-pointer transition-colors duration-200 rounded-md"
                  >
                    {wordBook.wordText} : {wordBook.count}
                  </li>
              ))
          }
        </ul>

        {isEmpty && <div> className="text-gray-500 text-center p-4">등록된 단어가 아직
          없습니다!
        </div>}

        {isEmpty && <div className="mt-4">
          <button className="btn btn-neutral"
                  onClick={() => navigate("/api/word")}>
            단어 검색으로 이동
          </button>
        </div>}
      </div>
  );
};

export default WordbookRanking;