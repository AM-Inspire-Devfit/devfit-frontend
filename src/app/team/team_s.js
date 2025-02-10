import styled from 'styled-components';

export const ContentContainer = styled.div`
  position: absolute;
  top: 230px; /* Navbar 높이 제외 */
  left: 50%;
  transform: translate(-50%, -50%); /* 화면 정중앙 정렬 */
  width: 100%
  height: 900px; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center; /* 세로 중앙 정렬 */
  z-index: 100;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  gap: 20px; 
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
  gap: 20px;
`;

export const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px; 
  height: 80px;
`;

export const EmojiBox = styled.div`
  width: 80px;
  height: 80px;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #796AD9;
  border-radius: 10px;
  padding: 5px;
  position: relative;

  img {
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 25px;
    height: 25px;
    object-fit: contain; 
  }
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  top: 60px; 
  left: 0;
  width: 300px;
  height: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 200; 
`;

export const TitleRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 27px;
  font-weight: bold;
  color: #432CA4;
  margin-bottom: 5px;
  margin-left: 5px;
`;


export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #796AD9; 
  margin: 10px 0;
  
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #796AD9;
  margin-top: 5px;
  margin-left: 10px;
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
  font-size: 15px;
  color: #432CA4;
  border: 1px #432CA4;
  padding: 5px;
  border-radius: 3px;
  outline: none;
  width: 60%;
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

