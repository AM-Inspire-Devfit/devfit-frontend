"use client";

import styled from "styled-components";
import * as m from "../../components/modal_s";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

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

export default function LeaderModal({ isOpen, onClose, projectId, currentMemberId, onAdminChanged }) {
    const { showAlert } = useAlert();
    const [selectedMember, setSelectedMember] = useState(null);
    // 무한스크롤 관련 상태
    const [participants, setParticipants] = useState([]);
    const [lastParticipantId, setLastParticipantId] = useState(null);
    const [hasMoreParticipants, setHasMoreParticipants] = useState(true);
    const [isFetchingParticipants, setIsFetchingParticipants] = useState(false);

    // 리스트 스크롤 참조
    const listRef = useRef();

    // 모달이 열릴 때 최초 참가자 목록 불러오기
    useEffect(() => {
        if (isOpen) {
            // 상태 초기화
            setParticipants([]);
            setLastParticipantId(null);
            setHasMoreParticipants(true);
            fetchParticipants();
        }
    }, [isOpen, projectId]);

    // 참가자 API 호출 함수 (무한스크롤)
    const fetchParticipants = async () => {
        if (isFetchingParticipants || !hasMoreParticipants) return;
        setIsFetchingParticipants(true);
        try {
            console.log(projectId);
            console.log(currentMemberId);
            const res = await axiosWithAuthorization.get(
                `/projects/${projectId}/participants`,
                {
                    params: {
                        lastProjectParticipantId: lastParticipantId,
                        size: 5,
                    },
                }
            );
            console.log("참가자 목록 응답:", res.data);
            // 응답 구조: { data: { content: [...], last: true/false, ... } }
            const newParticipants = res.data.data.content || [];
            // 기존 목록에 합치기
            setParticipants((prev) => {
                const existingIds = new Set(prev.map((p) => p.projectParticipantId));
                const uniqueNew = newParticipants.filter((p) => !existingIds.has(p.projectParticipantId));
                return [...prev, ...uniqueNew];
            });
            if (newParticipants.length > 0) {
                const nextLastId = newParticipants[newParticipants.length - 1].projectParticipantId;
                setLastParticipantId(nextLastId);
            }
            if (res.data.data.last) {
                setHasMoreParticipants(false);
            }
        } catch (error) {
            showAlert("error", error.response?.data?.message || "참가자 조회 실패");
            console.log(error.response?.data);
        } finally {
            setIsFetchingParticipants(false);
        }
    };

    // 스크롤 이벤트 핸들러: 리스트 하단에 도달하면 추가 데이터 요청
    const handleScroll = () => {
        const container = listRef.current;
        if (!container) return;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
            fetchParticipants();
        }
    };

    // 팀장 권한 양도 API 호출 함수
    const handleChangeAdmin = async () => {
        if (!selectedMember) {
            showAlert("error", "양도할 팀원을 선택해주세요.");
            return;
        }
        try {
            console.log(selectedMember)
            await axiosWithAuthorization.post(`/projects/${projectId}/admin/change`, {
                newAdminId: selectedMember,
            });
            showAlert("success", "팀장 양도 완료");
            if (onAdminChanged){
                onAdminChanged();
            } 
            else{
                onClose();
            } 
            // 팀원 목록 새로고침 등 필요시 상위 컴포넌트 재조회 함수 호출 가능
        } catch (error) {
            console.log(error);
            showAlert("error", error.response?.data?.message || "팀장 양도 실패");
        }
    };

    if (!isOpen) return null;

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
                <MemberList ref={listRef} onScroll={handleScroll}>
                    {participants
                    .filter((member) => member.projectParticipantId!=currentMemberId)
                    .filter((member) => member.status=="ACTIVE")
                    .map((member) => (
                        <MemberItem key={member.projectParticipantId}>
                            <MemberInfo>
                                <Image 
                                    src={member.profileImageUrl} 
                                    alt="프로필 이미지" 
                                    width={35} 
                                    height={35} 
                                    style={{
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />
                                <span style={{ marginLeft: "20px" }}>
                                    {member.nickname || member.projectNickname}
                                </span>
                            </MemberInfo>
                            <RadioButton 
                                type="radio" 
                                name="teamMember" 
                                checked={selectedMember === member.projectParticipantId} 
                                onChange={() => setSelectedMember(member.projectParticipantId)}
                            />
                        </MemberItem>
                    ))}
                </MemberList>

                <ConfirmationText>팀장을 양도하시겠습니까?</ConfirmationText>

                <ButtonGroup>
                    <m.ModalButton onClick={handleChangeAdmin}>예</m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </ButtonGroup>
            </m.ModalContent>
        </m.ModalOverlay>
    );
}
