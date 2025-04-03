import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 9998;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 60px 110px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Title = styled.h3`
  font-size: 22px;
  margin-bottom: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
`;

const Button = styled.button`
  background-color: #796AD9;
  color: white;
  color: white;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
`;

const JoinConfirmModal = ({ teamName, onConfirm, onCancel }) => {
  return (
    <>
      <Overlay onClick={onCancel} />
      <Modal>
        <Title>‘{teamName}’ 팀에 참여하시겠습니까?</Title>
        <ButtonRow>
          <Button onClick={onConfirm}>예</Button>
          <Button onClick={onCancel}>아니오</Button>
        </ButtonRow>
      </Modal>
    </>
  );
};

export default JoinConfirmModal;