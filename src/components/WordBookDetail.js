import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from '../utils/ApiClient';

const WordbookDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [wordbook, setWordbook] = useState(null);

  const showDeleteModal = async () => {
    document.getElementById("deleteModal").showModal()
  }

  const deleteWordBook = async () => {
    try {
      const response = await axios.delete(`/wordbook/${id}`);
      alert(`단어 ${response.data.wordText} 삭제가 완료되었습니다.`);
      navigate('/wordbook');
    } catch (error) {
      console.error('Error fetching wordbook:', error);
    }
  }

  useEffect(() => {
    const fetchWordbook = async () => {
      try {
        const response = await axios.get(`/wordbook/${id}`);
        setWordbook(response.data);
      } catch (error) {
        console.error('Error fetching wordbook:', error);
      }
    };

    fetchWordbook();
  }, [id]);

  if (!wordbook) {
    return <div>Loading...</div>;
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen mt-5">
        <div className="flex flex-col items-center space-y-6">
        <div className="info-div text-center">
          <h1 className="text-4xl font-bold">{wordbook.wordText}</h1>
          <p className="text-2xl mt-1.5">{wordbook.definition}</p>

          <div className="mt-8 text-sm">
            <p><strong>테스트 횟수 :</strong> {wordbook.testCount}</p>
            <p><strong>틀린 횟수 :</strong> {wordbook.failCount}</p>
            <p><strong>등록 일시:</strong> {new Date(
                wordbook.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="examples-div">
          <h2 className="text-2xl font-semibold mt-4 text-center">예문</h2>
          <ul className="list-disc pl-5">
            {wordbook.examples && wordbook.examples.length > 0 ? (
                wordbook.examples.map((example, index) => (
                    <li key={index} className="mt-1 text-xl">
                      <div>
                        <p>{example.sentence}</p>
                        <p>{example.sentenceMeaning}</p>
                      </div>
                    </li>
                ))
            ) : (
                <p>No examples available.</p>
            )}
          </ul>
        </div>

        <div className="button-div">
          <button
              className="btn btn-neutral mt-6"
              onClick={() => navigate('/api/wordbook')}
          >
            목록으로 돌아가기
          </button>

          <button
              className="btn btn-error mt-6 ml-3"
              onClick={showDeleteModal}
          >
            예문 삭제
          </button>
        </div>

        <dialog id="deleteModal" className="modal">
          <div className="modal-box">
            <p>해당 단어를 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="btn btn-error" onClick={deleteWordBook}>삭제
              </button>
              <form method="dialog">
                <button className="btn btn-neutral">닫기</button>
              </form>
            </div>
          </div>
        </dialog>
        </div>
      </div>
  );
};

export default WordbookDetail;