"use client";
import React, { useEffect, useState } from "react";
import * as S from "./profile_modal_s"; 
import axios from "axios";

const ProfileModal = ({ isOpen, onClose , profile, onProfileUpdated }) => {
  const [nickname, setNickname] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile"); // profile/withdraw
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); 


  //모달 열릴 때 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setNickname(profile.nickname || "")
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, profile]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        `${process.env.NEXT_PUBLIC_DEVFIT_SERVER_URI}/members/me/nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("닉네임 변경 성공");
      onClose();
      onProfileUpdated();
    } catch (error) {
      showAlert("error", error.response.data.data.message);
      console.log(error.response.data);
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 왼쪽 사이드바 */}
        <S.Sidebar>
          <S.SidebarItem
            $active={selectedTab === "profile"}
            onClick={() => setSelectedTab("profile")}
          >
            프로필 수정
          </S.SidebarItem>
          <S.SidebarItem
            $active={selectedTab === "withdraw"}
            onClick={() => setSelectedTab("withdraw")}
          >
            회원 탈퇴
          </S.SidebarItem>
        </S.Sidebar>


        <S.ContentArea>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>


          {selectedTab === "profile" && (
              <>
                <S.SectionTitle>프로필 수정</S.SectionTitle>
                <S.ProfileContainer>
                  <S.ProfileImageWrapper>
                    <S.ProfileImage src={profile.profileImageUrl} />

                  </S.ProfileImageWrapper>
                  <S.ProfileForm>
                    <S.Label>닉네임</S.Label>
                    <S.Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
                    <S.SaveButton onClick={handleSubmit}>수정 완료</S.SaveButton>
                  </S.ProfileForm>
                </S.ProfileContainer>
              </>
            )}
          {selectedTab === "withdraw" && (
            <>
              <S.SectionTitle>회원 탈퇴</S.SectionTitle>
              <S.WarningMessage>
              당신은 나갈 수 없습니다...
              </S.WarningMessage>
              
              {/* <S.WithdrawButton onClick={() => setIsConfirmModalOpen(true)}>
                회원 탈퇴
              </S.WithdrawButton> */}
            </>
          )}
        </S.ContentArea>
      </S.ModalContent>
      {isConfirmModalOpen && (
        <S.ConfirmModal>
          <S.ConfirmText><h3>당신은 나갈 수 없습니다...</h3></S.ConfirmText>
          <S.ButtonContainer>
            <S.ConfirmButton>예</S.ConfirmButton>
            <S.CancelButton onClick={() => setIsConfirmModalOpen(false)}>
              아니요
            </S.CancelButton>
          </S.ButtonContainer>
        </S.ConfirmModal>
      )}
    </S.ModalOverlay>
  );
};

export default ProfileModal;
