"use client";
import React, { useEffect, useState, useRef } from "react";
import * as S from "./profile_modal_s";
import { useAlert } from "@/context/AlertContext";
import axios from "axios";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";

const ProfileModal = ({ isOpen, onClose, profile, onProfileUpdated }) => {
  const { showAlert } = useAlert();
  const [nickname, setNickname] = useState("");
  const [selectedTab, setSelectedTab] = useState("profile"); //'profile' or 'withdraw'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); //미리보기
  const [nowFileExtension, setNowFileExtension] = useState(null);
  const [isFileChanged, setIsFileChanged] = useState(false); 
  const [uploadedImageKey, setUploadedImageKey] = useState(null); 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setNickname(profile.nickname || "");

      // 모달 열릴 때, 이전 미리보기/업로드 키 초기화
      setPreviewImage(profile.profileImageUrl); 
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, profile]);

  // ============== 닉네임 + 최종 프로필 수정 ==============
  const handleSubmit = async () => {
    try {
      if(isFileChanged){
        await axiosWithAuthorization.post(
          `/members/me/image/upload-complete`,
          { imageFileExtension: nowFileExtension }
        );
        setUploadedImageKey(null);
        setIsFileChanged(false);
      }
      
      await axiosWithAuthorization.post(
        `/members/me/nickname`,
        { nickname: nickname }
        
      );

      console.log("프로필(닉네임/이미지) 변경 성공");
      onClose();
      onProfileUpdated();

    } catch (error) {
      showAlert("프로필을 업데이트 할 수 없습니다. 잠시 뒤 다시 시도해보세요");
      console.log(error);
    }
  };

  // ============== 프로필 이미지==============
  const handleEditIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 확장자(타입) 판별
    const validExtensions = ["image/png", "image/jpeg", "image/jpg"];
    if (!validExtensions.includes(file.type)) {
      alert("png, jpg, jpeg 형식만 업로드할 수 있습니다.");
      return;
    }

    // 미리보기(모달에서 사용자에게 즉시 반영)
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewImage(localPreviewUrl);

    try {
      const token = localStorage.getItem("accessToken");
      const fileExtension = getExtensionByMimeType(file.type);
      setNowFileExtension(fileExtension);

      //서버에 presigned url 발급 요청
      const res = await axiosWithAuthorization.post(
        `/members/me/image/upload-url`,
        { imageFileExtension: fileExtension }
      );

      const { presignedUrl, uploadKey } = res.data.data; 

      //presigned url PUT 업로드
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setUploadedImageKey(uploadKey);
      console.log(uploadKey)
      setIsFileChanged(true);

    } catch (error) {
      console.log("이미지 업로드 에러:", error);
      showAlert("이미지 업로드 도중 오류가 발생했습니다.");
    }
  };

  // MIME 타입 -> 서버에 보낼 확장자 변환 함수
  const getExtensionByMimeType = (mimeType) => {
    switch (mimeType) {
      case "image/png":
        return "PNG";
      case "image/jpeg":
      case "image/jpg":
        return "JPEG";
      default:
        return "PNG";
    }
  };

  //모달이 열려있지 않다면 렌더링 X
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

                  <S.ProfileImage
                    src={previewImage}
                    alt="프로필 이미지 미리보기"
                  />

                  <S.EditIcon
                    src="/img/emoji_edit.png"
                    alt="프로필 이미지 수정 아이콘"
                    onClick={handleEditIconClick}
                  />

                  {/* 숨겨진 파일 입력 */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </S.ProfileImageWrapper>

                <S.ProfileForm>
                  <S.Label>닉네임</S.Label>
                  <S.Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={10}
                  />
                  <S.SaveButton onClick={handleSubmit} disabled={!nickname.trim()}>수정 완료</S.SaveButton>
                </S.ProfileForm>
              </S.ProfileContainer>
            </>
          )}

          {selectedTab === "withdraw" && (
            <>
              <S.SectionTitle>회원 탈퇴</S.SectionTitle>
              <S.WarningMessage>당신은 나갈 수 없습니다...</S.WarningMessage>
            </>
          )}
        </S.ContentArea>
      </S.ModalContent>

      {isConfirmModalOpen && (
        <S.ConfirmModal>
          <S.ConfirmText>
            <h3>당신은 나갈 수 없습니다...</h3>
          </S.ConfirmText>
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
