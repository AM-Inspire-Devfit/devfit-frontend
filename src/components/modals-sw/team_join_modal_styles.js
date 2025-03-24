import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  z-index: 999;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background-color: #fff;
  border: 5px solid #7b4fc3;
  border-radius: 15px;
  padding: 40px;
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #7b4fc3;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
`;

export const JoinButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #7b4fc3;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #5a3b9c;
  }
`;

export const CloseButton = styled.button`
  margin-top: 20px;
  font-size: 14px;
  color: #7b4fc3;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #5a3b9c;
  }
`;