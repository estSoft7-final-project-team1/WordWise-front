import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직을 여기에 구현

    console.log("email :", email);
    console.log("password :", password);
    axios.post('/api/signin',{email,password},{
      headers: {'Content-Type': 'application/json' }
    })
    .then((response) =>{
      const { accessToken } = response.data;
      console.log("response data: ", response.data)
      localStorage.setItem("accessToken", accessToken);
      console.log("로그인 성공")
      console.log("저장된 accessToken : ", localStorage.getItem("accessToken"));
      navigate('/');
    })
    .catch(error => {
      console.log("로그인 실패");
      console.error('로그인 오류 :', error)
    });
 
  };

  return (
    <div className="w-full bg-white">
      {/* 로그인 폼 부분 */}
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md shadow-xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <h2 className="card-title text-2xl font-bold">로그인</h2>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">이메일</span>
                  <span className="text-red-500">*</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input 
                    type="email" 
                    className="grow" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">비밀번호</span>
                  <span className="text-red-500">*</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd" />
                  </svg>
                  <input 
                    type="password" 
                    className="grow" 
                    placeholder="••••••••" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary btn-sm">
                  로그인
                </button>
              </div>

              <div className="text-center mt-4">
                <span className="text-gray-600">아직 회원이 아니신가요? </span>
                <Link to="/api/signup" className="text-blue-500 hover:underline">
                  회원가입
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;