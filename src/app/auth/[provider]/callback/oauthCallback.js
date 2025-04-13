"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useAlert } from "@/context/AlertContext";

const OAuthCallback = () => {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 
  const { showAlert } = useAlert();
  useEffect(() => {
    
    const provider = pathname.split("/")[2]; // ~/auth/[provider]/callback
    const code = searchParams.get("code"); // 

    console.log("Provider:", provider);
    console.log("Code:", code);

    if (provider && code) {
      fetchTokens(provider, code);
    }
  }, [pathname, searchParams]); 

  const fetchTokens = async (provider, code) => {
    try {
      console.log("백엔드 요청")
        const res = await axios.post("../../api/auth/social-login", {
        oauthProvider: provider.toUpperCase(),
        code: code,
      },
      {
        withCredentials: true
      })
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      //성공: 보딩 페이지로 리다이렉트
      window.location.href = "/home";
    } catch (error) {
      window.location.href = "/boarding";
      console.log("토큰 요청 실패:", error.response ? error.response.data : error.message);
    }
  };

  return <h3>로그인 처리 중...</h3>;
};

export default OAuthCallback;
