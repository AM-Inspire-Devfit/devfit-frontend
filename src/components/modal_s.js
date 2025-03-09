import styled from "styled-components";

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    width: 500px;
    height: 200px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalButton = styled.button`
    font-size: 14px;
    background:  #796ad9;
    border: none;
    border-radius: 12px;
    padding: 8px 16px;
    cursor: pointer;
    min-width: 85px;
    transition: 0.2s ease-in-out;
    margin: 10px;
    color: white;
`;

export const Title = styled.h2`
    color: #6A4BBF;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
`;

export const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: #6a50c5;
    width: 80px;  
    text-align: left;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
    margin-bottom: 15px;
`;

export const Input = styled.input`
    flex: 1;
    height: 40px;
    padding: 10px;
    border: 2px solid #796ad9;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
`;

export const DateInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; 
`;

export const DateInput = styled.input`
    border: 2px solid #796ad9;
    border-radius: 8px;
    padding: 8px;
    font-size: 14px;
    width: 155px;
    text-align: center;
    outline: none;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
`;

export const SubmitButton = styled.button`
    margin-top: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #6a50c5;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        background: #5A3DAC;
    }
`;

export const DeleteButton = styled.button`
    margin-top: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #D32F2F;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        background: #D32F2F;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #6A5ACD;
`;