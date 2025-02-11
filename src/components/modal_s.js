import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 500px;
  height: 200px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalButton = styled.button`
  font-size: 14px;
  background:  #796ad9;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  min-width: 85px;
  transition: 0.2s ease-in-out;
  margin: 10px;
  color: white;
`;
