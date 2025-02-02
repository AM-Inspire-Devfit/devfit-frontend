"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

const OAuthCallback = () => {
  const pathname = usePathname(); 
  const searchParams = useSearchParams(); 

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
      
      const res = await axios.post("../../api/auth/social-login", {
        oauthProvider: provider.toUpperCase(),
        code: code,
      });

      const { accessToken, refreshToken } = res.data;

      console.log(res.data)

      // cookie로 추후 변경
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Refresh Token:", refreshToken);

      // 성공: 홈 페이지로 리다이렉트
      window.location.href = "/";
    } catch (error) {
      console.error("토큰 요청 실패:", error.response ? error.response.data : error.message);
      window.location.href = "/login";
    }
  };

  return <h3>로그인 처리 중...</h3>;
};

export default OAuthCallback;
