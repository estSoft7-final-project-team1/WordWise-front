import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Imagebackground from '../static/image/imagebackground.png';
import ImageLogo from '../static/image/imagelogo.png';
import axios from 'axios';


function Joinmembership() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname : '',
    email: '',
    password: ''
  });
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const slides = [
    {
      title: "쉽고 재미있게 시작하는 영어 학습",
      subtitle: "WordWise와 함께 효과적인 영단어 학습과 자연스러운 회화 실력을 키워보세요"
    },
    {
      title: "지금 바로 WordWise와 함께 영어 학습을 시작해 보세요",
      subtitle: "매일 15분씩, 꾸준한 학습으로 영어 실력을 향상 시킬수 있습니다."
    }
  ];

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    console.log("전송 데이터 : ", formData);
    axios.post('/api/signup', formData, {
      headers: { 'Content-Type': 'application/json' }
    }) // <-- 여기서 괄호 추가!
    .then((response) => {
      console.log("응답 데이터 : ", response);
      alert("가입 성공!");
      navigate('/api/login'); // 주의: '/api/login' 대신 일반 경로 사용
    })
    .catch(error => { 
      alert("가입 실패!");
      console.error('회원가입 오류:', error);
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNicknameCheck = async () => {
    if (!formData.nickname) {
      setNicknameError('닉네임을 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(`/api/check-nickname`, {nickname: formData.nickname});
      const isAvailable = await response.data;

      if (isAvailable) {
        setIsNicknameAvailable(true);
        setNicknameError('사용 가능한 닉네임입니다');
      } else {
        setIsNicknameAvailable(false);
        setNicknameError('이미 사용 중인 닉네임입니다');
      }
    } catch (error) {
      console.error('Error checking nickname:', error);
    }
  };

  // 이메일 중복 검사
  const handleEmailCheck = async () => {
    if (!formData.email) {
      setEmailError('이메일을 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(`/api/check-email`, {email: formData.email});
      const isAvailable = await response.data;

      if (isAvailable) {
        setIsEmailAvailable(true);
        setEmailError('사용 가능한 이메일입니다');
      } else {
        setIsEmailAvailable(false);
        setEmailError('이미 사용 중인 이메일입니다');
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/*/!* 배너 섹션 *!/*/}
      {/*<div className="relative">*/}
      {/*  <div*/}
      {/*    className="w-full h-[180px]"*/}
      {/*    style={{*/}
      {/*      backgroundImage: `url(${Imagebackground})`,*/}
      {/*      backgroundSize: 'cover',*/}
      {/*      backgroundPosition: 'center'*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div className="absolute inset-0 bg-blue-500 bg-opacity-70">*/}
      {/*      <div className="h-full flex flex-col items-center justify-center text-center px-4">*/}
      {/*        <h1 className="text-white text-2xl font-bold mb-2">*/}
      {/*          {slides[currentSlide].title}*/}
      {/*        </h1>*/}
      {/*        <p className="text-white text-opacity-80">*/}
      {/*          {slides[currentSlide].subtitle}*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* 회원가입 폼 */}
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-md shadow-xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="card-title text-2xl font-bold">회원가입</h2>
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">닉네임</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <label className="input input-bordered flex items-center gap-2 grow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      placeholder="Nickname"
                      required
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleNicknameCheck}
                    className="btn btn-outline btn-sm"
                  >
                    중복확인
                  </button>
                </div>
                {nicknameError && <span className="text-red-500 text-sm">{nicknameError}</span>}
              </div>

              {/* 이메일 입력 필드 */}
              <div className="form-control mt-2">
                <label className="label">
                  <span className="label-text">이메일</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <label className="input input-bordered flex items-center gap-2 grow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70">
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      className="grow"
                      placeholder="Email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleEmailCheck}
                    className="btn btn-outline btn-sm"
                  >
                    중복확인
                  </button>
                </div>
                {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary btn-sm">
                  회원가입
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Joinmembership;