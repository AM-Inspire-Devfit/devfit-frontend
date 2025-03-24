"use client";
import React, { useEffect, useState } from "react";
import * as S from "./profile_modal_s"; 

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

        {/* 오른쪽 내용 영역 */}
        <S.ContentArea>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>

          {/* 프로필 수정 탭 */}
          {selectedTab === "profile" && (
              <>
                {/* 섹션 타이틀 (원하시면 위치/문구 조절 가능) */}
                <S.SectionTitle>프로필 수정</S.SectionTitle>

                {/* 새로 추가한 레이아웃 */}
                <S.ProfileContainer>
                  {/* 프로필 이미지 + 수정 아이콘 */}
                  <S.ProfileImageWrapper>
                    <S.ProfileImage src="/img/profile_sample.jpg" alt="프로필 이미지" />

                  </S.ProfileImageWrapper>

                  {/* 닉네임 / 수정 버튼 영역 */}
                  <S.ProfileForm>
                    <S.Label>닉네임</S.Label>
                    <S.Input type="text" defaultValue="최현태" />
                    <S.SaveButton>수정 완료</S.SaveButton>
                  </S.ProfileForm>
                </S.ProfileContainer>
              </>
            )}
          {/* 회원 탈퇴 탭 */}
          {selectedTab === "withdraw" && (
            <>
              <S.SectionTitle>회원 탈퇴</S.SectionTitle>
              <S.WarningMessage>
                회원 탈퇴 시 현재 팀/프로젝트 정보가 모두 삭제됩니다.
                계속 진행하시겠습니까?
              </S.WarningMessage>
              <S.WithdrawButton onClick={() => setIsConfirmModalOpen(true)}>
                회원 탈퇴
              </S.WithdrawButton>
            </>
          )}
        </S.ContentArea>
      </S.ModalContent>

      {/* 회원 탈퇴 재확인 모달 (하단) */}
      {isConfirmModalOpen && (
        <S.ConfirmModal>
          <S.ConfirmText>회원 탈퇴를 진행하시겠습니까?</S.ConfirmText>
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
