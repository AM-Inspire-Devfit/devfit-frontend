"use client";
import React, { useState } from "react";
import * as S from "./team_join_modal_styles";

export default function TeamJoinModal({ isOpen, onClose }) {
  const [inviteCode, setInviteCode] = useState("");

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI}/teams/join`,
        { inviteCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("팀 참여 성공");
      onClose();          // 모달 닫기
      onTeamJoined();     // 팀 목록 다시 fetch
    } catch (error) {
      console.error("팀 참여 실패:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <S.ModalOverlay $isOpen={isOpen} onClick={onClose} />
      <S.ModalContainer $isOpen={isOpen}>
        <S.Title>코드를 입력하여 팀에 참여하세요!</S.Title>
        <S.Input
          type="text"
          placeholder="팀 코드 입력"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <S.JoinButton onClick={handleJoin}>팀 참여</S.JoinButton>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.ModalContainer>
    </>
  );
}
