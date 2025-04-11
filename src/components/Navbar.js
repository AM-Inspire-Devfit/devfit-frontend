"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from "next/image";

import { useRouter } from "next/navigation"; 

import { logout } from "@/app/api/logout/logout";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 70px;
  background-color: #FFFFFF;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  top: 0;
  left: 0;
  border-bottom: 1px solid #D9D9D9;
  z-index: 1000;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #796AD9;
  font-size: 16px;
  font-weight: 550;
  transition: color 0.2s;

  &:hover {
    color: #007bff;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #796AD9;
  font-size: 16px;
  font-weight: 550;
  transition: color 0.2s;
  padding: 0;

  &:hover {
    color: #007bff;
  }
`;

const Navbar = ({ projectId }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmLogout) return; 

    try {
        await logout(); // 로그아웃 요청
        localStorage.removeItem("accessToken"); // 저장된 토큰 제거 
        localStorage.removeItem("storedUser"); // 유저 정보 제거 
        router.push("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <NavbarContainer>
      <Link href="/home" passHref>
      <LogoContainer>
        <Image 
          src="/img/devfit-logo.png" 
          alt="Logo" 
          width={110} 
          height={60} />
      </LogoContainer>
      </Link>
      <NavLinks>
      <StyledLink href={projectId ? `/project/${projectId}` : "/"}>Home</StyledLink>
      <StyledLink 
        href={projectId ? `/project/${projectId}/mypage` : "/"} 
        onClick={(e) => {
          if (!projectId) {
            e.preventDefault();
            alert("프로젝트 ID가 없습니다.");
          }
        }}
      >
        MyPage
      </StyledLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
