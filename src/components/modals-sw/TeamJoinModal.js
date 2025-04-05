"use client";
import React, { useState, useEffect } from "react";
import * as S from "./team_join_modal_styles";
import axios from "axios";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

import JoinConfirmModal from "./JoinConfirmModal";

export default function TeamJoinModal({ isOpen, onClose, onTeamJoined  }) {
  const [inviteCode, setInviteCode] = useState("");
  const { showAlert } = useAlert();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [teamName, setTeamName] = useState("");

  const handleJoin = async () => {
    try {
      const res = await axiosWithAuthorization.post(`/teams/join`, { inviteCode });
      
      console.log("팀 참여 성공");
      setConfirmOpen(false); 
      onClose();          // 모달 닫기
      onTeamJoined();     // 팀 목록 다시 fetch
    } catch (error) {
      showAlert("error", error.response.data.data.message);
      console.log(error.response.data);
    } finally {
      setConfirmOpen(false); // 확인 모달 닫기
      onClose();             // 현 모달도 닫기
    }
  };

    // 팀 코드로 팀 이름 조회
    const fetchTeamName = async (inviteCode) => {
      try {
      const res = await axiosWithAuthorization.post(`/teams/check`, {
        inviteCode,
      });
      return res.data.data.teamName;
    } catch {
      showAlert("error", error.response.data.data.message);
      console.log(error.response.data);
    }

    };

    const handleOpenConfirm = async () => {
      try {
        const name = await fetchTeamName(inviteCode); 
        setTeamName(name);
        setConfirmOpen(true); // 확인 모달 열기
      } catch (error) {
        showAlert("error", error?.response?.data?.data?.message ?? "팀 정보를 불러올 수 없습니다.");
      }
    };

    // 모달 상태에 따라 스크롤 제어
    useEffect(() => {
        const disableScroll = () => {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        };
    
        const enableScroll = () => {
            document.documentElement.style.overflow = "auto";
            document.body.style.overflow = "auto";
        };
    
        if (isOpen || confirmOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return () => enableScroll();
    }, [isOpen, confirmOpen]);

    // 모달 닫힐 때 코드 초기화
    useEffect(() => {
      if (!isOpen) {
        setInviteCode("");
        setTeamName("");
        setConfirmOpen(false);
      }
    }, [isOpen]);
  
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
        <S.JoinButton onClick={handleOpenConfirm}>팀 참여</S.JoinButton>
        <S.CloseButton onClick={onClose}>닫기</S.CloseButton>
      </S.ModalContainer>

      {confirmOpen && (
        <JoinConfirmModal
          teamName={teamName}
          onConfirm={handleJoin}
          onCancel={() => {
            setConfirmOpen(false); 
            onClose();            
          }}
        />
      )}
    </>
  );
}
