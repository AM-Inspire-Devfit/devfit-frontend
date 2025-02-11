import styled from "styled-components";
import { shouldForwardProp } from "@styled-system/should-forward-prop";

export const SectionContainer = styled.div`
  width: 750px;
  background: #ffffff;
  border-radius: 12px;
  margin-top: 70px;
  box-sizing: border-box; 
`;

export const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%; 
`;

export const SectionHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: #ede8fe; 
  padding: 10px 20px;
  border-top-left-radius: 15px;  
  border-top-right-radius: 15px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  width: fit-content; 
  max-width: 300px; 
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  color: #432CA4;
`;

export const MemberList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-top: 15px;
`;

export const MemberItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const MemberProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #796AD9;
`;

export const MemberName = styled.p`
  font-size: 14px;
  color: #432CA4;
  margin-top: 5px;
  font-weight: bold;
`;

export const MemberDetail = styled.div`
  width: 50px; 
  height: 50px;
  background-color: #ede8fe;
  border: 3px solid #796AD9; 
  border-radius: 50%;
  position: relative; 
  margin-left: 10px; 

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #796AD9;
  font-weight: 900;
`;

export const ToggleMemberList = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen"
})`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  border: 1px solid #796AD9;
  border-radius: 5px;
  padding: 10px;
  width: 130px;
  max-height: 140px; 
  overflow-y: auto; /* 스크롤 */
  position: absolute;
  top: 100%; 
  left: 50%;
  transform: translateX(-50%); 
  z-index: 20;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Divider2 = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #796AD9; 
  margin: 0;
  
`;
