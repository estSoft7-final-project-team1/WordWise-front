import React, {useState} from "react";
import axios from '../utils/ApiClient';

function WordMain() {
  const [wordText, setWordText] = useState("");
  const [exampleSentences, setExampleSentences] = useState([]);
  const [error, setError] = useState("");
  const [checkedExamples, setCheckedExamples] = useState(new Set());
  const [wordDto, setWordDto] = useState({
    wordText: "", definition: "", exampleDtos: [], formerExampleIds: []
  });
  const [saveExamplesResult, setSaveResult] = useState({
    wordBookId: null, duplicatedPersonalExamples: [], newPersonalExamples: []
  });
  const [isDetailPage, setIsDetailPage] = useState(false);

  const handleInputChange = (e) => {
    setWordText(e.target.value);
  };

  const fetchExample = async () => {
    document.getElementById("loadingModal").showModal();
    try {
      const response = await axios.get(`/word/${wordText}`);
      setWordDto(response.data);
      const examples = response.data.exampleDtos || [];
      setExampleSentences(examples);
      setError("");
      setCheckedExamples(new Set());
    } catch (err) {
      setError("예문을 가져오는 데 실패했습니다.");
    } finally {
      document.getElementById("loadingModal").close();
      if (!isDetailPage) {
        setIsDetailPage(true);
      }
    }
  };

  const reloadWord = async () => {
    document.getElementById("loadingModal").showModal();
    try {
      const response = await axios.post(`/word/${wordDto.wordText}/reload`,
          wordDto, {
            headers: {"Content-Type": "application/json"},
          });
      setWordDto(response.data);
      const examples = response.data.exampleDtos || [];
      setExampleSentences(examples);
      setCheckedExamples(new Set());
    } catch (err) {
      alert("새로고침 실패!");
    } finally {
      document.getElementById("loadingModal").close();
    }
  };

  const save = async () => {
    const selectedExamples = Array.from(checkedExamples);
    if (selectedExamples.length === 0) {
      document.getElementById("noSelectedModal").showModal();
      return;
    }

    const saveWordDto = {
      ...wordDto, exampleDtos: selectedExamples,
    };

    try {
      const response = await axios.post(`/word/save`, saveWordDto, {
        headers: {"Content-Type": "application/json"},
      });

      setSaveResult(response.data);
      setCheckedExamples(new Set());
      document.getElementById("saveResultModal").showModal();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          document.getElementById("duplicateModal").showModal();
        }
      } else {
        alert("서버 오류! 다시시도해주세요.");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchExample();
  };

  const handleCheckboxChange = (example) => {
    setCheckedExamples((prevChecked) => {
      const newChecked = new Set(prevChecked);
      if (newChecked.has(example)) {
        newChecked.delete(example);
      } else {
        newChecked.add(example);
      }
      return newChecked;
    });
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="word-input-div">
            <form onSubmit={handleSubmit}
                  className="flex w-full max-w-md items-center space-x-2">
              <input
                  type="text"
                  className="flex-1 h-full px-4 py-2 border border-gray-300 rounded-md"
                  value={wordText}
                  onChange={handleInputChange}
                  pattern="[a-z]*"
                  title="영어 소문자만 입력할 수 있습니다."
                  placeholder="단어를 입력하세요"
              />
              <button className="btn btn-neutral h-full px-4 py-2"
                      type="submit">
                예문 가져오기
              </button>
            </form>
          </div>

          <div className="word-content-div text-center">
            {error && <p className="text-red-500">{error}</p>}
            {isDetailPage && <h1 className="text-3xl font-bold">정의</h1>}
            {wordDto.definition && <p
                className="mt-3 text-xl">{wordDto.definition}</p>}
            {isDetailPage && <h1 className="text-3xl font-bold mt-3">예문</h1>}
          </div>

          <ul className="mt-3">
            {exampleSentences.map((example, index) => (
                <li className="mt-3 flex items-center space-x-3 text-xl"
                    key={index}>
                  <div className="flex items-center h-full">
                    <input
                        type="checkbox"
                        className="checkbox h-6 w-6"
                        checked={checkedExamples.has(example)}
                        onChange={() => handleCheckboxChange(example)}
                    />
                  </div>
                  <div className="sentence-content flex-1">
                    <p>{example.sentence}</p>
                    <p>{example.sentenceMeaning}</p>
                  </div>
                </li>))}
          </ul>

          {isDetailPage && (<div className="button-div flex space-x-3 mt-3">
            <div className="relative group">
              <button
                  className="btn btn-neutral"
                  onClick={reloadWord}
                  disabled={!wordText}>
                예문 새로고침
              </button>
              <span
                  className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md
                      bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity
                      group-hover:opacity-100">새로운 예문들을 불러옵니다.
              </span>
            </div>

            <div className="relative group">
              <button className="btn btn-neutral" onClick={save}>단어장에 저장
              </button>
              <span
                  className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md
                      bg-gray-800 px-3 py-1 text-sm text-white opacity-0 transition-opacity
                      group-hover:opacity-100">선택한 예문들을 내 단어장에 저장합니다.
              </span>
            </div>
          </div>)}
        </div>

        {/* 모달 */}
        <dialog id="loadingModal" className="modal">
          <div
              className="modal-box flex flex-row items-center justify-center text-center w-full max-w-md space-x-2">
            <p>예문을 생성중입니다</p>
            <span className="loading loading-spinner loading-md mt-2"></span>
          </div>
        </dialog>

        <dialog id="duplicateModal" className="modal">
          <div className="modal-box flex flex-col items-center text-center">
            <p className="text-red-500">내 단어장에 이미 존재하는 예문입니다!</p>
            <form method="dialog" className="mt-3">
              <button className="btn btn-neutral">닫기</button>
            </form>
          </div>
        </dialog>

        <dialog id="noSelectedModal" className="modal">
          <div className="modal-box flex flex-col items-center text-center">
            <p className="text-red-500">선택된 예문이 없습니다!</p>
            <form method="dialog" className="mt-3">
              <button className="btn btn-neutral">닫기</button>
            </form>
          </div>
        </dialog>

        <dialog id="saveResultModal" className="modal">
          <div className="modal-box flex flex-col items-center text-center">
            <p>내 단어장에 성공적으로 저장되었습니다!</p>
            {saveExamplesResult.newPersonalExamples.length > 0 && (
                <div className="w-full mt-5">
                  <h3 className="text-xl text-green-500">저장된 예문</h3>
                  <ul className="list-decimal text-left w-full space-y-2">
                    {saveExamplesResult.newPersonalExamples.map(
                        (example, index) => (<li key={index}>
                          <p>{example}</p>
                        </li>))}
                  </ul>
                </div>)}
            {saveExamplesResult.duplicatedPersonalExamples.length > 0 && (
                <div className="w-full mt-3">
                  <h3 className="text-xl text-red-500">이미 존재하는 예문</h3>
                  <ul className="list-decimal text-left w-full space-y-2">
                    {saveExamplesResult.duplicatedPersonalExamples.map(
                        (example, index) => (<li key={index}>
                          <p>{example}</p>
                        </li>))}
                  </ul>
                </div>)}
            <form method="dialog" className="mt-3">
              <button className="btn btn-neutral">닫기</button>
            </form>
          </div>
        </dialog>
      </div>);
}

export default WordMain;
