import * as m from '@/components/modal_s';
import styled from 'styled-components';

import { useState } from 'react';
import { IoClose } from "react-icons/io5";  // 닫기 아이콘
import { FiCopy } from "react-icons/fi"; 

export const Title = styled.h2`
    margin-top: 30px;
    font-size: 30px;
    font-weight: bold;
    color: #6A5ACD;
`;

export const Subtitle = styled.p`
    font-size: 14px;
    margin-top: 5px;
    color: black;
`;

export const InviteBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #E0E0E0;
    padding: 12px;
    height: 90px;
    border-radius: 8px;
    margin-top: 15px;
    position: relative;
`;

export const InviteLabel = styled.span`
    font-size: 12px;
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 2px 5px;
    border-radius: 5px;
    margin-left: 20px;
    
`;

export const InviteCode = styled.span`
    top: 20px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: bold;
`;

export const CopyButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
`;

export default function InviteModal({ inviteCode, inviteCodeError, onClose }) {

    // 초대 코드 복사 
    const copyToClipboard = () => {
        if (inviteCode) {
            navigator.clipboard.writeText(inviteCode.inviteCode);
            alert("초대 코드가 복사되었습니다!");
        }
    };

    return (
        <m.ModalOverlay>
            <m.ModalContent
                style={{
                    border: "4px solid #6A5ACD",
                    height: "250px",
                    position: "relative"
                }}
            >
                <m.CloseButton onClick={onClose}>
                    <IoClose size={24} />
                </m.CloseButton>

                <Title>팀 코드가 생성되었습니다!</Title>
                <Subtitle>팀 코드를 공유하여 팀원을 초대하세요</Subtitle>

                <InviteBox>
                    <InviteLabel>Team Code</InviteLabel>
                    {inviteCode ? (
                        <InviteCode>{inviteCode?.inviteCode}</InviteCode>
                    ) : (
                        <InviteCode style={{ color: "red", fontSize: "16px" }}>{inviteCodeError}</InviteCode>
                    )}
                    <CopyButton onClick={copyToClipboard}>
                        <FiCopy size={20} />
                    </CopyButton>
                </InviteBox>
            </m.ModalContent>
        </m.ModalOverlay>
    );
}