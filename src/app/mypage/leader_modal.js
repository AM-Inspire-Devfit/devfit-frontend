import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

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

const projectUserData = {
    "success": true,
    "status": 200,
    "data": {
        "projectParticipantId": 4,
        "projectNickname": "최현태",
        "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
        "role": "ADMIN" 
    },
    "timestamp": "2025-03-19T21:42:40.59254"
}

const projectMemberData = [
    { 
        "success": true,
        "status": 200,
        "data": {
            "content": [
            {
                "projectParticipantId": 1,
                "projectNickname": "최현태",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "role": "ADMIN"
            },
            {
                "projectParticipantId": 2,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
                "role": "MEMBER"
            },
            {
                "projectParticipantId": 3,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocI6E5Q0hhiXNht5-76cyGpZNLbaO21GIgkmyF43ywYhSqTmZg=s96-c",
                "role": "MEMBER"
            },
            {
                "projectParticipantId": 4,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocI6E5Q0hhiXNht5-76cyGpZNLbaO21GIgkmyF43ywYhSqTmZg=s96-c",
                "role": "MEMBER"
            }
            ],
            "pageable": {
            "pageNumber": 0,
            "pageSize": 3,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
            },
            "first": true,
            "last": true,
            "size": 3,
            "number": 0,
            "sort": [],
            "numberOfElements": 3,
            "empty": false
        },
        "timestamp": "2025-03-19T21:49:27.631511"
    },
    { 
        "success": true,
        "status": 200,
        "data": {
            "content": [
            {
                "projectParticipantId": 5,
                "projectNickname": "최현태",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "role": "ADMIN"
            },
            {
                "projectParticipantId": 6,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
                "role": "MEMBER"
            },
            {
                "projectParticipantId": 7,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocI6E5Q0hhiXNht5-76cyGpZNLbaO21GIgkmyF43ywYhSqTmZg=s96-c",
                "role": "MEMBER"
            },
            {
                "projectParticipantId": 8,
                "projectNickname": "최현태",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocI6E5Q0hhiXNht5-76cyGpZNLbaO21GIgkmyF43ywYhSqTmZg=s96-c",
                "role": "MEMBER"
            }
            ],
            "pageable": {
            "pageNumber": 0,
            "pageSize": 3,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
            },
            "first": true,
            "last": true,
            "size": 3,
            "number": 0,
            "sort": [],
            "numberOfElements": 3,
            "empty": false
        },
        "timestamp": "2025-03-19T21:49:27.631511"
    }
]
export default function LeaderModal({ isOpen, onClose, }) { 
    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 아래부터 시작------------------------------------>
    const [selectedMember, setSelectedMember] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [members, setMembers] = useState([]);
    const listRef = useRef();

    const currentUserId = projectUserData.data.projectParticipantId;

    useEffect(() => {
        const pageData = projectMemberData[currentPage];
        if (pageData?.data?.content) {
            const filtered = pageData.data.content.filter(
                (member) => member.projectParticipantId !== currentUserId
            );
            setMembers((prev) => [...prev, ...filtered]);
        }
    }, [currentPage]);

    // 스크롤 핸들러
    const handleScroll = () => {
        const container = listRef.current;
        if (!container) return;

        const isBottom =
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 10;

        if (isBottom && currentPage + 1 < projectMemberData.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };
    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 위까지 끝-------------------------------------->

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
                {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                <--------------------------------------map 함수 부분--------------------------------------> */}
                <MemberList ref={listRef} onScroll={handleScroll}>
                    {members.map((member) => (
                        <MemberItem key={member.projectParticipantId}>
                            <MemberInfo>
                            <Image 
                                src={member.profileImageUrl} 
                                alt="프로필 이미지" 
                                width={35} 
                                height={35} 
                                style={{
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    width: '35px',
                                    height: '35px'
                                }}
                            />
                            <span style = {{marginLeft: "20px"}}>{member.projectNickname}</span>
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
                    <m.ModalButton onClick={onClose}>예</m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </ButtonGroup>
            </m.ModalContent>
        </m.ModalOverlay>
    );

}