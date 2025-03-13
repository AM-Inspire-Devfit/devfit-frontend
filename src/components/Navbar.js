"use client";

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from "next/image";

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

const Navbar = () => {
  return (
    <NavbarContainer>
      <Link href="/boarding" passHref>
      <LogoContainer>
        <Image 
          src="/img/devfit-logo.png" 
          alt="Logo" 
          width={110} 
          height={60} />
      </LogoContainer>
      </Link>
      <NavLinks>
        <StyledLink href="/home">Home</StyledLink>
        <StyledLink href="/project/${project_id}/mypage">MyPage</StyledLink>
        <StyledLink href="/">Logout</StyledLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
