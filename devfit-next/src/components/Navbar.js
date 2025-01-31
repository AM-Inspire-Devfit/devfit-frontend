"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from "next/image";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 55px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  top: 0;
  left: 0;
  border-bottom: 2px solid #796AD9;
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
  font-size: 13px;
  font-weight: 700;
  transition: color 0.2s;

  &:hover {
    color: #796AD9;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link href="/boarding" passHref>
      <LogoContainer>
        <Image 
          src="/img/devfit-logo.png" 
          alt="Logo" 
          width={100} 
          height={55} />
      </LogoContainer>
      </Link>
      <NavLinks>
        <StyledLink href="/home">홈</StyledLink>
        <StyledLink href="/teamspace">팀스페이스</StyledLink>
        <StyledLink href="/mypage">마이페이지</StyledLink>
        <StyledLink href="/">로그아웃</StyledLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

