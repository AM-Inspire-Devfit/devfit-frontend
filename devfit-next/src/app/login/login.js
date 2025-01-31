// login.js

"use client";

import React, { useState } from 'react';
import Image from "next/image";
import {
  LoginContainer,
  Title,
  OauthButton
} from './login_s';

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?..."; 
  };

  const handleKakaoLogin = () => {
    window.location.href = "https://kauth.kakao.com/oauth/authorize?...";
  };



  return (
    <LoginContainer>
     
      <div style={{ textAlign: "center", marginBottom: "50px"}}>
      <Image
        src="/img/devfit-logo.png" // public/img/logo.png
        alt="Logo"
        width={200} // 이미지의 가로 크기
        height={100} // 이미지의 세로 크기
        priority
      />
      </div>
      <Title>Social Login</Title>
      <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <OauthButton
      $bgColor ="#FEE500"
      $textColor="#000"
      onClick={handleKakaoLogin}
      >
        <Image
          src="/img/kakao-icon.png"
          alt="Kakao"
          width={24}
          height={24}
        />
        카카오톡 아이디로 로그인
      </OauthButton>

      <OauthButton
        $bgColor="#4285F4"
        $textColor="#fff"
        onClick={handleGoogleLogin}
      >
        <Image
          src="/img/google-icon.png"
          alt="Google"
          width={24}
          height={24}
        />
        Google 아이디로 로그인
      </OauthButton>
    </div>
    </LoginContainer>
  );
}


