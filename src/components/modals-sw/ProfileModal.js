import React, { useEffect, useState } from "react";
import * as S from "./profile_modal_styles"; // 스타일 파일

const ProfileModal = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("profile"); // 'profile' or 'withdraw'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // 탈퇴 확인 모달

  // 모달이 열릴 때 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.Sidebar>
            <S.SidebarItem
              active={selectedTab === "profile"}
              onClick={() => setSelectedTab("profile")}
            >
              프로필 수정
            </S.SidebarItem>
            <S.SidebarItem
              active={selectedTab === "withdraw"}
              onClick={() => setSelectedTab("withdraw")}
            >
              회원 탈퇴
            </S.SidebarItem>
          </S.Sidebar>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.ContentWrapper activeTab={selectedTab}>
          {/* 프로필 수정 UI */}
          <S.ProfileSection visible={selectedTab === "profile"}>
            <S.ProfileImage src="/img/profile_sample.jpg" alt="프로필 이미지" />
            <S.InputWrapper>
              <S.Label>닉네임</S.Label>
              <S.Input type="text" value="최현태" />
            </S.InputWrapper>
            <S.SaveButton>수정 완료</S.SaveButton>
          </S.ProfileSection>

          {/* 회원 탈퇴 UI */}
          <S.WithdrawSection visible={selectedTab === "withdraw"}>
            <S.WarningText>회원 탈퇴시 경고문..</S.WarningText>
            <S.GrayBox />
            <S.WithdrawButton onClick={() => setIsConfirmModalOpen(true)}>
              회원 탈퇴 진행
            </S.WithdrawButton>
          </S.WithdrawSection>
        </S.ContentWrapper>
      </S.ModalContent>

      {/* 회원 탈퇴 확인 모달 */}
      {isConfirmModalOpen && (
        <S.ConfirmModal>
          <S.ConfirmText>회원 탈퇴를 진행하시겠습니까?</S.ConfirmText>
          <S.ButtonContainer>
            <S.ConfirmButton>예</S.ConfirmButton>
            <S.CancelButton onClick={() => setIsConfirmModalOpen(false)}>아니요</S.CancelButton>
          </S.ButtonContainer>
        </S.ConfirmModal>
      )}
    </S.ModalOverlay>
  );
};

export default ProfileModal;
