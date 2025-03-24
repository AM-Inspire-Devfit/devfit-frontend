"use client";
import React, { useState } from "react";
import * as S from "./team_join_modal_styles";

export default function TeamJoinModal({ isOpen, onClose }) {
  const [teamCode, setTeamCode] = useState("");

  const handleJoin = () => {
    if (!teamCode.trim()) {
      alert("팀 코드를 입력해주세요.");
      return;
    }
    // TODO: 팀 참여 API 연동
    alert(`${teamCode}로 팀 참여를 시도합니다!`);
    onClose();
  };

  return (
    <>
      <S.ModalOverlay $isOpen={isOpen} onClick={onClose} />
      <S.ModalContainer $isOpen={isOpen}>
        <S.Title>코드를 입력하여 팀에 참여하세요!</S.Title>
        <S.Input
          type="text"
          placeholder="팀 코드 입력"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
        <S.JoinButton onClick={handleJoin}>팀 참여</S.JoinButton>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.ModalContainer>
    </>
  );
}
