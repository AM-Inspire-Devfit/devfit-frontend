"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";


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
  color: #796AD9;
  font-size: 16px;
  font-weight: 700;
  padding: 13px 10px 10px 10px;

  &:hover {
    color: #432CA4;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>

      <NavLinks>
        <StyledLink href="/team1">Team 1</StyledLink>
        <StyledLink href="/team2">Team 2</StyledLink>
        <StyledLink href="/team3">Team 3</StyledLink>
        <StyledLink href="/team4">Team 4</StyledLink>
        <Image src="/img/plus.png" alt="plus icon" width={40} height={40} />
      </NavLinks>
    </SidebarContainer>
  );
};

export default Sidebar;