import React, {useState, useEffect} from "react";
import axios from "axios";
// import "../static/css/WordMain.css";

function WordMain() {
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
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [saveExamplesResult, setSaveResult] = useState({
    wordBookId: null,
    duplicatedPersonalExamples: [],
    newPersonalExamples: []
  });
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isLoadingModalOpen) {
      const interval = setInterval(() => {
        setDots(prevDots => {
          if (prevDots.length < 3) {
            return prevDots + '.';
          } else {
            return '';
          }
        });
      }, 500); // 0.5초마다 점을 추가

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
    } else {
      setDots(''); // 모달이 닫힐 때 점 초기화
    }
  }, [isLoadingModalOpen]);

  const handleInputChange = (e) => {
    setWordText(e.target.value);
  };

  const fetchExample = async () => {
    setIsLoadingModalOpen(true);
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
      setIsLoadingModalOpen(false);
    }
  };

  const reloadWord = async () => {
    setIsLoadingModalOpen(true);

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
      setIsLoadingModalOpen(false);
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

      alert("응답을 받아왔음");
      setSaveResult(response.data);

      alert(JSON.stringify(response.data));

      setIsResultModalOpen(true);
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

  const resetState = () => {
    setWordText(""); // 입력 필드 초기화
    setExampleSentences([]); // 예문 리스트 초기화
    setCheckedExamples(new Set()); // 체크박스 상태 초기화
    setWordDto({
      wordText: "",
      definition: "",
      exampleDtos: [],
      formerExampleIds: [],
    });
    setSaveResult({
      wordBookId: null,
      duplicatedExamples: [],
      newExamples: []
    });
    setIsResultModalOpen(false); // 모달 닫기
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={wordText}
              onChange={handleInputChange}
              pattern="[a-z]*"
              title="영어 소문자만 입력할 수 있습니다."
              placeholder="단어를 입력하세요"
          />
          <button type="submit">예문 가져오기!</button>
        </form>
        {error && <p style={{color: "red"}}>{error}</p>}
        <h3>정의</h3>
        {wordDto.definition && <p>{wordDto.definition}</p>}
        <h3>예문</h3>
        <ul>
          {exampleSentences.map((example, index) => (
              <li key={index}>
                <input
                    type="checkbox"
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
        <div className="button-div">
          <button onClick={reloadWord} disabled={!wordText}>
            예문 새로고침
          </button>
          <button onClick={save}>
            저장
          </button>
        </div>

        {/* 모달 */}
        {isLoadingModalOpen && (
            <div className="modal-overlay">
              <div className="fixed-modal-content">
                <p>예문을 생성중입니다{dots}</p>
              </div>
            </div>
        )}

        {isResultModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
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

                <button onClick={() => {
                  setIsResultModalOpen(false);
                  resetState();
                }}>닫기
                </button>
              </div>
            </div>
        )}
      </div>
  );
}

export default WordMain;
