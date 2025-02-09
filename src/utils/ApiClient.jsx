import axios from 'axios';

const api = axios.create({
    baseURL : ''
});

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

export default api;