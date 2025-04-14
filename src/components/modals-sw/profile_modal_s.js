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
  width: 700px;
  min-height: 400px;
  border: 2px solid #7b4fc3;
  border-radius: 10px;
  display: flex;
  position: relative;
  overflow: hidden;
`;

export const Sidebar = styled.div`
  width: 180px;
  background-color: #f2e8ff;
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
    left: -20px;  
    top: 0;
    bottom: 0;
    width: 10px;
    background-color: #7b4fc3;
    border-radius: 0 8px 8px 0; 
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
  gap: 40px;
  margin-top: 20px;
`;

export const ProfileImageWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 5px solid #ddd; 
`;

export const EditIcon = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;

export const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; 
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
  border-color: #7b4fc3;
  border-radius: 10px;
`;

export const SaveButton = styled.button`
  background: #7b4fc3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const WarningMessage = styled.div`
  width: 80%;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 20px;
  margin-left: 40px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: bold;
`;

export const WithdrawButton = styled(SaveButton)`
  background: #7b4fc3;
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
