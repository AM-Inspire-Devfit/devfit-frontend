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

export const MemberProfile = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isLeader"
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ isLeader }) => (isLeader ? "4px solid #796AD9" : "2px solid #A294F9")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MemberName = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isLeader"
})`
  font-size: 14px;
  color: ${({ isLeader }) => (isLeader ? "#796AD9" : "#A294F9")}; 
  margin-top: 5px;
  font-weight: bold;
`;

export const MemberDetail = styled.div`
  width: 50px; 
  height: 50px;
  background-color: #ffffff;
  border: 2px solid #796AD9;
  border-radius: 50%;
  position: relative; 
  margin-left: 10px; 
  margin-right: 10px; 
  margin-top: -18px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
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
  height: 215px; 
  overflow-y: auto; /* 스크롤 */
  position: absolute;
  top: 100%; 
  left: 50%;
  transform: translateX(-50%); 
  z-index: 20;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

`;

export const ToggleMemberItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 3px;
  gap: 10px;
`;

export const ToggleMemberImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #796AD9;
`;

export const ToggleMemberText = styled.p`
  flex-grow: 1;
  text-align: right;
  font-size: 14px;
  color: #432CA4;
  font-weight: bold;
`;


export const Divider2 = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #796AD9; 
  margin: 0;
  
`;

export const ProjectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 720px;
  padding: 20px;
  border: 2px solid #796AD9;
  border-radius: 15px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 30px auto 10px auto;
`;

export const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 70px;
`;

export const ProjectTitle = styled.h2`
  font-size: 32px;
  font-weight: bold;
  color: #796AD9;
  min-width: 170px;
  margin-left: 10px;
`;

export const ProjectDescription = styled.p`
  font-size: 14px;
  color: #432CA4;
  margin-top: 5px;
  margin-left: 0px;  
  flex-grow: 1; 
`;

export const ProjectContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;  /* 왼쪽 정렬 */
  width: 100%;
`;

export const ProjectDivider1 = styled.div`
  width: 1px;
  height: 105px;
  background-color: #796AD9;
  margin: 0 20px;
`;

export const ProjectDivider2 = styled.div`
  width: 1px;
  height: 80px;
  background-color: #796AD9;
  margin: 0 20px;
`;

export const ProjectHButton = styled.button`
  font-size: 12px;
  font-weight: bold;
  color: #432ca4;
  background: white;
  border: 2px solid #796ad9;
  border-radius: 12px;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 85px;
  transition: 0.2s ease-in-out;

  &:hover {
    background: #cec4fe;
  }
`;

const StyledButton = styled.button`
    font-size: 12px;
    font-weight: bold;
    color: white;
    background: ${({ $disabled }) =>
        $disabled ? "#B3B3B3" : "#796AD9"};
    border: 2px solid ${({ $disabled }) =>
        $disabled ? "#B3B3B3" : "#796AD9"};
    border-radius: 12px;
    padding: 6px 12px;
    cursor: pointer;
    min-width: 85px;
    transition: 0.2s ease-in-out;
    
    &:hover {
        background: ${({ $disabled }) =>
            $disabled ? "#B3B3B3" : "#5a46c6"};
    }
`;

export const DeleteProjectButton = styled(StyledButton)`
    background: #D9534F;
    border: 2px solid #D9534F;
    
    &:hover {
        background: #C9302C;
    }
`;

export function LeaveProjectButton({ onClick }) {
    return (
        <StyledButton onClick={onClick}>
            나가기
        </StyledButton>
    );
}

export function JoinProjectButton({ onClick, isPending }) {
    return (
        <StyledButton onClick={onClick} $disabled={isPending}>
            {isPending ? "승인대기" : "가입신청"}
        </StyledButton>
    );
}