import React, { useEffect } from "react";
import * as S from "./team_create_modal_styles"; // 스타일 파일

const TeamCreateModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 막기
    } else {
      document.body.style.overflow = "auto"; // 스크롤 원래대로
    }

    return () => {
      document.body.style.overflow = "auto"; // 모달이 닫히면 원래대로 복구
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>팀 생성</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.Description>* 표시 항목은 필수 항목입니다.</S.Description>

        <S.Form>
          <S.FormGroup>
            <S.Label>team 명 <S.Required>*</S.Required></S.Label>
            <S.Input type="text" placeholder="팀 이름을 입력하세요" />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>상세 설명 <S.Required>*</S.Required></S.Label>
            <S.TextArea placeholder="팀에 대한 설명을 입력하세요" />
          </S.FormGroup>

          <S.SubmitButton>팀 생성</S.SubmitButton>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default TeamCreateModal;
