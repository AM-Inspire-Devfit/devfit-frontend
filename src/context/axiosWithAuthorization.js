"use client";

import axios from "axios";

const axiosWithAuthorization = axios.create({   
  baseURL: process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI,
  headers: {
    "Content-Type": "application/json",
  },
});
//요청 인터셉터
axiosWithAuthorization.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
//웅답 인터셉터
axiosWithAuthorization.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로
  async (error) => {
    const originalRequest = error.config;

    // accessToken 재발급 케이스: 401 응답에 새 토큰이 포함된 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newAccessToken = error.response.headers["Authorization"];
      if (newAccessToken) {
        // 새 토큰 저장
        localStorage.setItem("accessToken", newAccessToken);
        console.log("new Token"+newAccessToken)
        //새 토큰으로 Authorization 재설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //재시도
        return axiosWithAuthorization(originalRequest);
      }

      //헤더에 토토이 없으면 로그인 페이지 리디렉션
      localStorage.removeItem("accessToken");
      console.log("리프레시 토큰 만료")
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosWithAuthorization;