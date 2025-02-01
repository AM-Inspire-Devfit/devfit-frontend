import styled from 'styled-components';

export const ContentContainer = styled.div`
  position: absolute;
  top: 130px; /* Navbar 높이 제외 */
  left: 200px; /* Sidebar 너비 제외 */
  width: calc(100vw - 200px); /* 전체 너비에서 Sidebar(200px) 제외 */
  height: 900px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center; /* 세로 중앙 정렬 */
  z-index: 100;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  width: 90%;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
`;

export const Title = styled.h1`
  font-size:27px;
  font-weight: bold;
  color: #432CA4;
  margin-bottom: 5px; 
  margin-left: 10px;
`;

export const Title2 = styled.h1`
  font-size: 23px;
  font-weight: bold;
  color: #432CA4;
  margin-bottom: 5px; 
  margin-left: 10px;
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #432CA4; 
  margin: 10px 0;
  
`;

export const Subtitle = styled.p`
  font-size: 17px;
  color: #432CA4;
  margin-top: 5px;
  margin-left: 15px;
`;

export const EditIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 20px;
`;

export const StyledInput = styled.input`
  font-size: 20px;
  color: #432CA4;
  border: 1px #432CA4;
  padding: 5px;
  border-radius: 3px;
  outline: none;
  width: 60%;
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  margin-top: 90px; 
`;

export const Button = styled.button`
  font-size: 14px;
  color: #432CA4;
  background: white;
  border: 1px solid #432CA4;
  border-radius: 10px;
  padding: 5px 12px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  margin-left: 10px;

  &:hover {
    background: #432CA4;
    color: white;
  }
`;

export const ProjectBox = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f8f6ff; 
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
