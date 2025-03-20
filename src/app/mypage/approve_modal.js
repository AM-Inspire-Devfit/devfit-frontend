import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';

import Image from "next/image";

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

const RequestList = styled.div`
    margin-top: 30px;
    max-height: 260px;
    overflow-y: auto;
    padding-right: 10px; 
`;

const RequestItem = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 12px;
    border-radius: 10px;
    border: 1.5px solid #796ad9;
    gap: 12px;
    margin-bottom: 10px;
`;

const ProfileImage = styled(Image)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
`;

const RequestText = styled.p`
    flex: 1;
    font-size: 15px;
    color: #333;
    display: flex;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

const ApproveButton = styled.button`
    background: #5da75d;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    visibility: ${(props) => (props.visible === "true" ? "visible" : "hidden")}; 
`;

const RejectButton = styled.button`
    background: #d9534f;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    visibility: ${(props) => (props.visible === "true" ? "visible" : "hidden")}; 
`;

export default function ApproveModal({ isOpen, onClose}) {
    if (!isOpen) return null;

    const projectData = {
        name: "devFit"
    };

    const requests = [
        { id: 1, name: "김땡땡", profileImage: "/img/profile2.png", pending: true, approved: false },
        { id: 2, name: "이땡땡", profileImage: "/img/profile.png", pending: false, approved: false },
        { id: 3, name: "김땡땡", profileImage: "/img/profile.png", pending: false, approved: true },
        { id: 4, name: "김땡땡", profileImage: "/img/profile2.png", pending: true, approved: false },
        { id: 5, name: "이땡땡", profileImage: "/img/profile.png", pending: false, approved: false },
        { id: 6, name: "김땡땡", profileImage: "/img/profile2.png", pending: false, approved: true },
    ];

    const getStatusMessage = (pending, approved) => {
        if (pending) return "님이 가입을 신청했습니다.";
        if (!pending && !approved) return "님의 신청이 거절되었습니다.";
        if (!pending && approved) return "님의 가입이 승인되었습니다.";
    };

    const handleApprove = (id) => {
        console.log(`승인된 ID: ${id}`);
    };

    const handleReject = (id) => {
        console.log(`거절된 ID: ${id}`);
    };

    return (
        <m.ModalOverlay>
            <m.ModalContent
                style={{
                    height: "370px"
                }}
            >
                <Header>
                    <Title>{projectData.name} 가입 신청</Title>
                    <CloseButton onClick={onClose}>
                        <IoClose size={22} />
                    </CloseButton>
                </Header>

                <RequestList>
                    {requests.map((request) => (
                        <RequestItem key={request.id}>
                            <ProfileImage 
                                src={request.profileImage} 
                                alt="프로필 이미지" 
                                width={35} 
                                height={35} 
                            />
                            <RequestText>
                                <strong>{request.name}</strong> {getStatusMessage(request.pending, request.approved)}
                            </RequestText>
                                <ButtonGroup>
                                    <ApproveButton
                                        visible={(request.pending || (!request.pending && !request.approved)).toString()}
                                        onClick={() => handleApprove(request.id)}
                                    >
                                        승인
                                    </ApproveButton>

                                    <RejectButton
                                        visible={(request.pending).toString()}
                                        onClick={() => handleReject(request.id)}
                                    >
                                        거절
                                    </RejectButton>
                                </ButtonGroup>
                        </RequestItem>
                        ))}
                </RequestList>
            </m.ModalContent>
        </m.ModalOverlay>
    );

}