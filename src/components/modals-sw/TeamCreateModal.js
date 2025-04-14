"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./team_create_modal_styles";

const TeamCreateModal = ({ isOpen, onClose,  onTeamCreated }) => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; //스크롤 막기
    } else {
      document.body.style.overflow = "auto"; //스크롤 원래대로
    }
    return () => {
      document.body.style.overflow = "auto"; //모달 닫고 원래대로 복구
    };
  }, [isOpen]);

  useEffect(() => {
    const disableScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };

    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => enableScroll();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI}/teams/create`,
        {
          teamName: teamName,
          teamDescription: teamDescription,
        },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("팀 생성 성공:", response.data);
      onClose();
      onTeamCreated();
    } catch (error) {
      console.error(
        "팀 생성 실패:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>팀 생성</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.Description>* 표시 항목은 필수 항목입니다.</S.Description>

        <S.Form onSubmit={handleSubmit}>
          <S.FormGroup>
            <S.Label>
              team 명 *
            </S.Label>
            <S.Input
              type="text"
              placeholder="팀 이름을 입력하세요 (15자 이내)"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={15}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>
              상세 설명 
            </S.Label>
            <S.TextArea
              placeholder="팀에 대한 설명을 입력하세요 (100자 이내)"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              maxLength={100}
            />
          </S.FormGroup>

          <S.SubmitButton type="submit">팀 생성</S.SubmitButton>
        </S.Form>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default TeamCreateModal;
