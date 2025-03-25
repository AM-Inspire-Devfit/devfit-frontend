import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  width: 700px;         /* 전체 폭 */
  min-height: 400px;    /* 전체 높이 */
  border: 2px solid #7b4fc3;
  border-radius: 10px;
  display: flex;        /* 사이드바 + 내용영역 가로 배치 */
  position: relative;
  overflow: hidden;     /* 둥근 모서리 영역 밖 숨김 */
`;

export const Sidebar = styled.div`
  width: 180px;
  background-color: #f2e8ff; /* 연보라색 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const SidebarItem = styled.button`
  position: relative;
  background: none;
  color: #7b4fc3;
  border: none;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;

  &:before {
    content: "";
    position: absolute;
    /* 기존: left: -10px; -> 수정 */
    left: 0;  
    top: 0;
    bottom: 0;
    width: 10px; /* 막대 두께 */
    background-color: #7b4fc3;

    /* 오른쪽만 둥글게 => 왼쪽은 0, 오른쪽은 8px */
    border-radius: 0 8px 8px 0; 

    /* 활성화 여부에 따라 표시 */
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;


export const ContentArea = styled.div`
  flex: 1;
  position: relative;
  padding: 40px 20px 20px 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  color: #7b4fc3;
  margin-bottom: 20px;
  
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* 이미지와 폼 사이 간격 */
  margin-top: 20px; /* 위쪽 여백 */
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 180px;  /* 프로필 이미지 영역 크기 */
  height: 180px; 
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; 
`;

// 프로필 이미지 위에 겹치는 수정 아이콘 
// export const EditIcon = styled.img`
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   width: 40px; 
//   height: 40px;
//   cursor: pointer;
// `;

export const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; 
`;


export const InputWrapper = styled.div`
  width: 80%;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border-color:#7b4fc3;
  border-radius:10px;
`;

export const SaveButton = styled.button`
  background: #7b4fc3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
`;

export const WarningMessage = styled.div`
  width: 80%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 10px 10px 10px ;
  margin-top: 50px;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-size:20px;
  font-weight: bold;
`;

export const WithdrawButton = styled(SaveButton)`
  background: #7b4fc3;
  align-items: center;
  justify-content: center;
  text-align: center;
`;


export const ConfirmModal = styled.div`
  position: fixed;
  bottom: 50vh;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ConfirmText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ConfirmButton = styled(SaveButton)``;

export const CancelButton = styled(SaveButton)`
  background: gray;
`;
