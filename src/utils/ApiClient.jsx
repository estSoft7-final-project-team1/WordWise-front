import axios from 'axios';

const api = axios.create({
    baseURL : ''
});

export const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};

api.interceptors.request.use((config)=> {
    const token = localStorage.getItem("accessToken");
    console.log("인섭셉터 : localStorage에서 읽은 토큰 =",token);
    if(token) {
        config.headers['Authorization'] =`Bearer ${token}`;
    }
    console.log("인터셉터 : 최종 요청 config =", config);
    return config;

}, (error)=> {
    console.error("인터셉터 에러:", error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("에러 : ", error);
        console.log("응답 : ", error.response);
        if(error.response && error.response.status === 401) {
            alert('토큰이 만료되어 로그아웃 처리되었습니다. \n 다시 로그인 해주세요.');
            handleLogout();
        }
        return Promise.reject(error);
    }
)

export default api;