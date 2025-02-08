"use client";

import React, { useState, useEffect} from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";


export const SidebarContainer = styled.nav`
  width: 170px; 
  height: 100vh; 
  background-color: #F8F8FC;
  top: 55px;
  color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1000;
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 15px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  padding: 13px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 10px;
  position: relative;
  color: ${(props) => (props.$isActive ? "white" : "#796AD9")};
  background-color: ${(props) => (props.$isActive ? "#796AD9" : "transparent")};
  }
`;

export const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center; 
  gap: 8px; 
  width: 100%;
`;

export const ActiveIndicator = styled.div`
  width: 8px;
  height: 70%;
  background-color: #796AD9;
  border-radius: 0 5px 5px 0;
  margin-left: -20px;
  transition: transform 0.2s ease-in-out;
`;

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarContainer>

      <NavLinks>
      <StyledLinkContainer>
        {pathname === "/team/1" && <ActiveIndicator />}
        <StyledLink href="/team/1">Team 1</StyledLink>
      </StyledLinkContainer>

      <StyledLinkContainer>
        {pathname === "/team/2" && <ActiveIndicator />}
        <StyledLink href="/team/2">Team 2</StyledLink>
      </StyledLinkContainer>

      <StyledLinkContainer>
        {pathname === "/team/3" && <ActiveIndicator />}
        <StyledLink href="/team/3">Team 3</StyledLink>
      </StyledLinkContainer>

      <StyledLinkContainer>
        {pathname === "/team/4" && <ActiveIndicator />}
        <StyledLink href="/team/4">Team 4</StyledLink>
      </StyledLinkContainer>
        <Image src="/img/plus.png" alt="plus icon" width={40} height={40} />
      </NavLinks>
    </SidebarContainer>
  );
};

export default Sidebar;