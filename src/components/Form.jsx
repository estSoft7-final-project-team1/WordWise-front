import { useState } from 'react';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 처리 로직
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title mb-4 text-2xl font-bold">회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">이름</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="홍"
                  className="input input-bordered"
                  required
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">이메일</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@domain.com"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">비밀번호</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">비밀번호 확인</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
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
  );
}