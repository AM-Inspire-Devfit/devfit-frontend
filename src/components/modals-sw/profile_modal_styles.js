import styled from "styled-components";

// 모달 배경
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

// 모달 컨텐츠
export const ModalContent = styled.div`
  background: white;
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 사이드바
export const Sidebar = styled.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SidebarItem = styled.button`
  background: ${(props) => (props.active ? "#7b4fc3" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#7b4fc3")};
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

// 내용 전환 애니메이션
export const ContentWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => (props.activeTab === "profile" ? "0" : "-100%")});
`;

export const ProfileSection = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const WithdrawSection = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const WarningText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const GrayBox = styled.div`
  width: 80%;
  height: 40px;
  background: #ddd;
`;

export const SaveButton = styled.button`
  background: #7b4fc3;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
`;

export const WithdrawButton = styled(SaveButton)`
  background: red;
`;

export const ConfirmModal = styled.div`
  position: fixed;
  bottom: 50px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ConfirmButton = styled(SaveButton)``;

export const CancelButton = styled(SaveButton)`
  background: gray;
`;
