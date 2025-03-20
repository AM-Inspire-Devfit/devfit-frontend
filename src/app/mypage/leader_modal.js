import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';

import Image from "next/image";
import { useState } from "react";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 22px;
    font-weight: bold;
    color: #796ad9;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
`;

const InstructionText = styled.p`
    font-size: 14px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
    margin-left: 9px;
    text-align: left;
`;

const MemberList = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #9377FF;
    border-radius: 12px;
    padding: 15px;
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 20px;
`;

const MemberItem = styled.label`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`;

const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-grow: 1; 
`;

const ProfileImage = styled(Image)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
`;

const RadioButton = styled.input`
    transform: scale(1.2);
    cursor: pointer;
`;

const ConfirmationText = styled.p`
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

export default function LeaderModal({ isOpen, onClose, }) {
    const [selectedMember, setSelectedMember] = useState(null);

    if (!isOpen) return null;

    const members = [
        { id: 1, name: "정선우", profileImage: "/img/profile.png" },
        { id: 2, name: "조수빈", profileImage: "/img/profile.png" },
        { id: 3, name: "최현태", profileImage: "/img/profile2.png" },
        { id: 4, name: "정선우", profileImage: "/img/profile.png" },
        { id: 5, name: "조수빈", profileImage: "/img/profile.png" },
        { id: 6, name: "최현태", profileImage: "/img/profile2.png" }
    ];

    return (
        <m.ModalOverlay>
            <m.ModalContent style={{ padding: "30px", height: "370px" }}>
                <Header>
                    <Title>팀장 양도</Title>
                    <CloseButton onClick={onClose}>
                        <IoClose size={22} />
                    </CloseButton>
                </Header>

                <InstructionText>양도할 팀원을 선택해주세요.</InstructionText>
                <MemberList>
                    {members.map((member) => (
                        <MemberItem key={member.id}>
                            <MemberInfo>
                            <ProfileImage 
                                src={member.profileImage} 
                                alt="프로필 이미지" 
                                width={35} 
                                height={35} 
                            />
                            <span style = {{marginLeft: "20px"}}>{member.name}</span>
                            </MemberInfo>
                            <RadioButton 
                                type="radio" 
                                name="teamMember" 
                                checked={selectedMember === member.id} 
                                onChange={() => setSelectedMember(member.id)} 
                            />
                        </MemberItem>
                    ))}
                </MemberList>

                <ConfirmationText>팀장을 양도하시겠습니까?</ConfirmationText>

                <ButtonGroup>
                    <m.ModalButton onClick={onClose}>예</m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </ButtonGroup>
            </m.ModalContent>
        </m.ModalOverlay>
    );

}