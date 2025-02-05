import React, {useState} from "react";
import axios from "axios";
import "../static/css/WordMain.css";

function WordMain() {
  const [key, setKey] = useState(0);
  const [wordText, setWordText] = useState("");
  const [exampleSentences, setExampleSentences] = useState([]);
  const [error, setError] = useState("");
  const [checkedExamples, setCheckedExamples] = useState(new Set());
  const [wordDto, setWordDto] = useState({
    wordText: "",
    definition: "",
    exampleDtos: [],
    formerExampleIds: []
  });
  const [saveExamplesResult, setSaveResult] = useState({
    wordBookId: null,
    duplicatedPersonalExamples: [],
    newPersonalExamples: []
  });
  const [dots, setDots] = useState('');
  const [isDetailPage, setIsDetailPage] = useState(false);

  const handleInputChange = (e) => {
    setWordText(e.target.value);
  };

  const fetchExample = async () => {
    // setIsLoadingModalOpen(true);
    document.getElementById("loadingModal").showModal();
    try {
      const response = await axios.get(
          `/word/${wordText}`);
      setWordDto(response.data);
      const examples = response.data.exampleDtos || [];
      setExampleSentences(examples);
      setError("");
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
    //setIsLoadingModalOpen(true);
    document.getElementById("loadingModal").showModal();
    try {
      const response = await axios.post(
          `/word/${wordDto.wordText}/reload`,
          wordDto,
          {
            headers: {"Content-Type": "application/json"},
          }
      );
      setWordDto(response.data);
      const examples = response.data.exampleDtos || [];
      setExampleSentences(examples);
    } catch (err) {
      alert("새로고침 실패!");
    } finally {
      document.getElementById("loadingModal").close();
    }
  };

  const save = async () => {
    const selectedExamples = Array.from(checkedExamples); // 체크된 예문 리스트로 변환
    if (selectedExamples.length === 0) {
      alert("선택된 예문이 없습니다!");
      return;
    }

    const saveWordDto = {
      ...wordDto,
      exampleDtos: selectedExamples,
    };

    try {
      const response = await axios.post(
          `/word/save`,
          saveWordDto,
          {
            headers: {"Content-Type": "application/json"},
          }
      );

      setSaveResult(response.data);
      document.getElementById("saveResultModal").showModal();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          alert("이미 존재하는 단어입니다.");
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
      <div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              className="w-full max-w-xs"
              value={wordText}
              onChange={handleInputChange}
              pattern="[a-z]*"
              title="영어 소문자만 입력할 수 있습니다."
              placeholder="단어를 입력하세요"
          />
          <button className="btn btn-neutral" type="submit">예문 가져오기!</button>
        </form>
        <div className="word-div">
        {error && <p style={{color: "red"}}>{error}</p>}
        {isDetailPage && <h3>정의</h3>}
        {wordDto.definition && <p>{wordDto.definition}</p>}
        {isDetailPage && <h3>예문</h3>}
        </div>
        <ul>
          {exampleSentences.map((example, index) => (
              <li key={index}>
                <input
                    type="checkbox"
                    className = "checkbox"
                    checked={checkedExamples.has(example)}
                    onChange={() => handleCheckboxChange(example)}
                />
                <div>
                  <p>
                    <strong>Sentence:</strong> {example.sentence}
                  </p>
                  <p>
                    <strong>Meaning:</strong> {example.sentenceMeaning}
                  </p>
                </div>
              </li>
          ))}
        </ul>
        {isDetailPage && <div className="button-div">
          <button className="btn btn-neutral" onClick={reloadWord} disabled={!wordText}>
            예문 새로고침
          </button>
          <button className="btn btn-neutral" onClick={save}>
            저장
          </button>
        </div>}

        {/* 모달 */}
        <dialog id="loadingModal" className="modal">
          <div className="modal-box">
            <p>예문을 생성중입니다</p>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </dialog>

        <dialog id="saveResultModal" className="modal">
          <div className="modal-box">
            <p>저장되었습니다!</p>
            {saveExamplesResult.newPersonalExamples.length > 0 && (
                <>
                  <h3>저장된 예문</h3>
                  <ul>
                    {saveExamplesResult.newPersonalExamples.map(
                        (example, index) => (
                            <li key={index}>
                              <p><strong></strong> {example}</p>
                            </li>
                        ))}
                  </ul>
                </>
            )}
            {saveExamplesResult.duplicatedPersonalExamples.length > 0 && (
                <>
                  <h3>이미 저장된 예문</h3>
                  <ul>
                    {saveExamplesResult.duplicatedPersonalExamples.map(
                        (example, index) => (
                            <li key={index}>
                              <p><strong></strong> {example}</p>
                            </li>
                        ))}
                  </ul>
                </>
            )}
            <form method="dialog">
              <button onClick={()=>setKey(prevKey => prevKey + 1)}>닫기</button>
            </form>
          </div>
        </dialog>
      </div>
  );
}

export default WordMain;
