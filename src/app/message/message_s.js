import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750px;
    height: 1000px;
    background-color: #f5f5f5;
    border-radius: 10px;
    margin-top: 90px;
    margin-bottom: 100px;
`;


export const ProfileImageWrapper = styled.div`
    position: absolute;
    top: 180px; 
    left: 50%;
    transform: translate(-290px, 0); 
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid #6a5acd;
`;

export const ProfileImageBorder = styled.div`
    width: 145px;
    height: 145px;
    border-radius: 50%;
    background-color: white; 
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const ProfileImage = styled.img`
    width: 98%;
    height: 98%;
    object-fit: cover;
    border-radius: 50%;
`;

export const MessageBox = styled.div`
    width: 500px;
    background: white;
    padding: 60px 30px 30px; 
    border-radius: 20px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 130px; 
`;

export const Title = styled.h2`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 170px;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    resize: none;
    outline: none;
    background: #fafafa;
`;

export const SendButton = styled.button`
    width: 100%;
    background-color: #6a5acd;
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 12px;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 18px;
    transition: background 0.3s, transform 0.2s;

    &:hover {
        background-color: #5548c1;
        transform: scale(1.02);
    }
    
    &:active {
        background-color: #4438a6;
        transform: scale(0.98);
    }
`;

export const GPTMessageBox = styled.div`
    width: 500px;
    background: #E8E2FF; 
    padding: 60px 30px 30px; 
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px; 
`;

export const GPTTextArea = styled.textarea`
    width: 100%;
    height: 170px;
    border: 1px solid #E8E2FF;
    border-radius: 12px;
    padding: 12px;
    font-size: 14px;
    resize: none;
    outline: none;
    background: #F2EFFF
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 15px;
`;

export const EditButton = styled.button`
    background-color: #8A7CED;
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 8px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    width: 48%;

    &:hover {
        background-color: #7560E0;
        transform: scale(1.05);
    }

    &:active {
        background-color: #5D4DC7;
        transform: scale(0.95);
    }
`;

export const GSendButton = styled(SendButton)`
    background-color: #5D4DC7;

    &:hover {
        background-color: #4A3DB5;
    }

    &:active {
        background-color: #382D92;
    }
`;

export const GuideMessage = styled.p`
    font-size: 13px;
    color: #6b6b6b;
    margin-top: 8px;
    margin-bottom: 10px;
    margin-left: 10px;
    align-self: flex-start;
`;