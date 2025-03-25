
"use client";

import React, { useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import {
  LoginContainer,
  Title,
  OauthButton
} from './login_s';

export default function Login() {

  const handleLogin = async (provider) => {
    try {
      console.log()
      const res = await axios.get(`/api/auth/${provider}`);
      console.log(res.data.url)
      window.location.href = res.data.url; // OAuth 인증 페이지 redirect
      console.log(res.data)
    } catch (error) {
      console.error("로그인 요청 실패:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <LoginContainer>
     
      <div style={{ textAlign: "center", marginBottom: "50px"}}>
      <Image
        src="/img/devfit-logo.png" 
        alt="Logo"
        width={200} 
        height={100} 
        priority
      />
      </div>
      <Title>Social Login</Title>
      <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <OauthButton
      $bgColor ="#FEE500"
      $textColor="#000"
      onClick={()=>handleLogin("kakao")}
      >
        <Image
          src="/img/kakao-icon.png"
          alt="Kakao"
          width={24}
          height={24}
        />
        카카오톡 ID로 로그인
      </OauthButton>

      <OauthButton
        $bgColor="#4285F4"
        $textColor="#fff"
        onClick={()=>handleLogin("google")}
      >
        <Image
          src="/img/google-icon.png"
          alt="Google"
          width={24}
          height={24}
        />
        Google ID로 로그인
      </OauthButton>
    </div>
    </LoginContainer>
  );
}


