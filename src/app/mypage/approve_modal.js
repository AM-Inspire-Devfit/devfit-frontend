import React, { useEffect, useRef, useState, useCallback } from 'react';
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
`;

const RejectButton = styled.button`
    background: #d9534f;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
`;


// <--------------------여기부터 더미데이터 ------------------------>

const projectData = 
    {
        "success": true,
        "status": 200,
        "data": 
            {
                "projectId": 1,
                "projectTitle": "Devfitt",
                "projectDescription": "LG CNS AM Inspire Camp 사이드 프로젝트gg",
                "projectGoal": "개발자 건강을 위한 협업 툴 개발",
                "startDt": "2024-01-01",
                "dueDt": "2026-01-01"
            },
        "timestamp": "2025-02-06T09:56:45.150727"
    }


    const requestData = [
    {
        "first": true,
        "last": false,
        "size": 1073741824,
        "content": [
            {
                "projectId": 1, 
                "registrationId": 1, 
                "requesterId": 1, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            },
            {
                "projectId": 1, 
                "registrationId": 2, 
                "requesterId": 2, 
                "requesterName": "조수빈", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_ACCEPTED"
            },
            {
                "projectId": 1, 
                "registrationId": 3, 
                "requesterId": 3, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_REJECTED"
            },
            {
                "projectId": 1, 
                "registrationId": 4, 
                "requesterId": 4, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            }
        ],
        "number": 1073741824,
        "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
        },
        "pageable": {
            "offset": 9007199254740991,
            "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
            },
            "paged": true,
            "unpaged": true,
            "pageNumber": 1073741824,
            "pageSize": 1073741824
        },
        "numberOfElements": 1073741824,
        "empty": true
    },
    {
        "first": false,
        "last": false,
        "size": 1073741824,
        "content": [
            {
                "projectId": 1, 
                "registrationId": 5, 
                "requesterId": 5, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            },
            {
                "projectId": 1, 
                "registrationId": 6, 
                "requesterId": 6, 
                "requesterName": "조수빈", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_ACCEPTED"
            },
            {
                "projectId": 1, 
                "registrationId": 7, 
                "requesterId": 7, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_REJECTED"
            },
            {
                "projectId": 1, 
                "registrationId": 8, 
                "requesterId": 8, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            }
        ],
        "number": 1073741824,
        "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
        },
        "pageable": {
            "offset": 9007199254740991,
            "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
            },
            "paged": true,
            "unpaged": true,
            "pageNumber": 1073741824,
            "pageSize": 1073741824
        },
        "numberOfElements": 1073741824,
        "empty": true
    },
    {
        "first": false,
        "last": true,
        "size": 1073741824,
        "content": [
            {
                "projectId": 1, 
                "registrationId": 9, 
                "requesterId": 9, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            },
            {
                "projectId": 1, 
                "registrationId": 10, 
                "requesterId": 10, 
                "requesterName": "조수빈", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_ACCEPTED"
            },
            {
                "projectId": 1, 
                "registrationId": 11, 
                "requesterId": 11, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_REJECTED"
            },
            {
                "projectId": 1, 
                "registrationId": 12, 
                "requesterId": 12, 
                "requesterName": "채민주", 
                "requesterProfileUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "projectRegistrationStatus": "REQUEST_PENDING"
            }
        ],
        "number": 1073741824,
        "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
        },
        "pageable": {
            "offset": 9007199254740991,
            "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": true
            },
            "paged": true,
            "unpaged": true,
            "pageNumber": 1073741824,
            "pageSize": 1073741824
        },
        "numberOfElements": 1073741824,
        "empty": true
    }
]

// <--------------------여기까지 더미데이터 ------------------------>

export default function ApproveModal({ isOpen, onClose}) {
    if (!isOpen) return null;

    const [currentPage, setCurrentPage] = useState(0);
    const [requestList, setRequestList] = useState(requestData[0].content);
    const listRef = useRef();

    const handleScroll = () => {
        const container = listRef.current;
        if (!container) return;

        const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;

        if (isBottom && currentPage + 1 < requestData.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (currentPage === 0) return;

        const nextPage = requestData[currentPage];
        if (nextPage) {
            setRequestList((prev) => [...prev, ...nextPage.content]);
        }
    }, [currentPage]);

    const getStatusMessage = (projectRegistrationStatus) => {
        switch (projectRegistrationStatus) {
            case "REQUEST_PENDING":
                return "님이 가입을 신청했습니다.";
            case "REQUEST_REJECTED":
                return "님의 신청이 거절되었습니다.";
            case "REQUEST_ACCEPTED":
                return "님의 가입이 승인되었습니다.";
            default:
                return "";
        }
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
                    <Title>{projectData.data.projectTitle} 가입 신청</Title>
                    <CloseButton onClick={onClose}>
                        <IoClose size={22} />
                    </CloseButton>
                </Header>

                <RequestList ref={listRef} onScroll={handleScroll}>
                    {requestList.map((request) => (
                        <RequestItem key={request.registrationId}>
                            <Image
                                src={request.requesterProfileUrl}
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
                            <RequestText>
                                <strong>{request.requesterName}</strong> {getStatusMessage(request.projectRegistrationStatus)}
                            </RequestText>
                            <ButtonGroup>
                                {request.projectRegistrationStatus === "REQUEST_PENDING" && (
                                    <>
                                        <ApproveButton onClick={() => handleApprove(request.registrationId)}>
                                            승인
                                        </ApproveButton>
                                        <RejectButton onClick={() => handleReject(request.registrationId)}>
                                            거절
                                        </RejectButton>
                                    </>
                                )}
                                {request.projectRegistrationStatus === "REQUEST_REJECTED" && (
                                    <ApproveButton onClick={() => handleApprove(request.registrationId)}>
                                        승인
                                    </ApproveButton>
                                )}
                            </ButtonGroup>
                        </RequestItem>
                    ))}
                </RequestList>
            </m.ModalContent>
        </m.ModalOverlay>
    );

}