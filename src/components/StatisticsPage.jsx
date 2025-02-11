import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../utils/ApiClient';


const AnswerTable = () => {
  const [testData, setTestData] = useState([]);
  // 예시 데이터 배열
  useEffect(() => {
    axios.get('/api/wordtest/statistics')
      .then(response => setTestData(response.data))
      .catch(error => console.error('데이터 불러오기 오류:', error));
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-5">
      <h2 className="text-2xl font-bold mb-4">테스트 내역</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>정답</th>
              <th>사용자의 답변</th>
              <th>예문</th>
              <th>정답 여부</th>
            </tr>
          </thead>
          <tbody>
            {testData && testData.length > 0 ? (
              testData.map((row, index) => (
                <tr key={index}>
                  <td>{row.answer}</td>
                  <td>{row.userAnswer}</td>
                  <td>{row.example}</td>
                  <td>{row.isCorrect ? "true" : "false"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnswerTable;