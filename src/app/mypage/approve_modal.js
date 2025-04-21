import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import Image from "next/image";
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

export default function ApproveModal({ isOpen, onClose, projectId }) {
    const [projectInfo, setProjectInfo] = useState(null);
    const [requestList, setRequestList] = useState([]);
    const [lastRegistrationId, setLastRegistrationId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const listRef = useRef();


    const { showAlert } = useAlert();

    useEffect(() => {
        if (!isOpen || !projectId) return;

        const fetchData = async () => {
            try {
                const project = await projectData(projectId);
                setProjectInfo(project);

                const requests = await requestData(projectId);
                console.log(requests)
                setRequestList(requests);
            } catch (error) {
                showAlert("error", error.message);
            }
        };

        fetchData();
    }, [isOpen, projectId]);

    const projectData = async (projectId) => {
        try {
            const res = await axiosWithAuthorization.get(`/projects/${projectId}`);
            console.log("프로젝트 개별 정보 조회:", res.data);
            return res.data.data;
        } catch (error) {
            showAlert("error", "프로젝트 정보를 불러올 수 없습니다.");
            console.log(error.response.data);
        }
    };

    const requestData = async (projectId) => {
        try {
          const res = await axiosWithAuthorization.get(
            `/projects/${projectId}/registration/list`,
            {
              params: {
                lastRegistrationId: lastRegistrationId,
                size: 10,
              },
            }
          );
          console.log("프로젝트 가입 신청 목록 조회:", res.data);
          return res.data.data.content || []; 
        } catch (error) {
          showAlert("error","가입 신청자가 없습니다.");
          console.log(error.response.data);
          return []; 
        }
      };

    const fetchRequests = async () => {
        
        if (isFetching || !hasMore || !projectId) return;
    
        setIsFetching(true);
        try {
            const res = await axiosWithAuthorization.get(
                `/projects/${projectId}/registration/list`, 
                {
                    params: {
                        lastRegistrationId: lastRegistrationId, 
                        pageSize: 10,
                    },
                }
            );
            console.log(res);
            const newContent = res.data.data.content || [];
            const isLastPage = res.data.data.last; // 마지막 페이지 여부
    
            if (newContent.length === 0) {
                // 데이터가 비어 있으면 더 이상 불러올 게 없음
                setHasMore(false);
              } else {
                //기존 목록 + 새로 가져온 목록
                setRequestList((prev) => {
                    const existingIds = new Set(prev.map((r) => r.registrationId));
                    const uniqueNew = newContent.filter((r) => !existingIds.has(r.registrationId));
                    return [...prev, ...uniqueNew];
                });
        
                const nextLastId = newContent[newContent.length - 1].registrationId;
                setLastTeamId(nextLastId);
              }
        
              if (isLastPage) {
                setHasMore(false);
              }
            } catch (error) {
              showAlert("error", error.response?.data?.data?.message);
              console.log(error.response?.data);
            } finally {
              setIsFetching(false);
            }
          };
    

    const handleScroll = () => {
        const container = listRef.current;
        if (!container) return;
    
        const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
        if (isBottom) {
            fetchRequests(); 
        }
    };

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

    const handleApprove = async (registrationId) => {
        try {
            await axiosWithAuthorization.put(`/projects/${projectId}/registration/approve`, null, {
                params: {
                    projectRegisterId: registrationId,
                },
            });
            showAlert("success", "가입 신청이 승인되었습니다.");
            setRequestList([]);
            setLastRegistrationId(null);
            setHasMore(true);
            fetchRequests(); // 목록 갱신
        } catch (error) {
            showAlert("error", error.response?.data?.data?.message || "승인에 실패했습니다.");
            console.log(error.response?.data);
        }
    };
    
    const handleReject = async (registrationId) => {
        try {
            await axiosWithAuthorization.put(`/projects/${projectId}/registration/reject`, null, {
                params: {
                    projectRegisterId: registrationId,
                },
            });
            showAlert("success", "가입 신청이 거절되었습니다.");
            setRequestList([]);
            setLastRegistrationId(null);
            setHasMore(true);
            fetchRequests(); // 목록 갱신
        } catch (error) {
            showAlert("error", error.response?.data?.data?.message || "거절에 실패했습니다.");
            console.log(error.response?.data);
        }
    };
    

    useEffect(() => {
        if (isOpen && projectId) {
            setRequestList([]);
            setLastRegistrationId(null);
            setHasMore(true);
            fetchRequests();
        }
    }, [isOpen, projectId]);

    if (!isOpen) return null;

    return (
        <m.ModalOverlay>
            <m.ModalContent style={{ height: "370px" }}>
                <Header>
                    <Title>{projectInfo ? `${projectInfo.projectTitle} 가입 신청` : "로딩 중..."}</Title>
                    <CloseButton onClick={onClose}>
                        <IoClose size={22} />
                    </CloseButton>
                </Header>

                <RequestList ref={listRef} onScroll={handleScroll}>
                    {requestList.length === 0 ? (
                        <p>가입 요청이 없습니다.</p>
                    ) : (
                        requestList
                        .filter((request) => request.projectRegistrationStatus !== "APPROVED")
                        .map((request) => (
                            <RequestItem key={request.registrationId}>
                                <Image
                                    src={request.requesterImageUrl || "/img/default_profile.png"}
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
                                    <strong>{request.requesterNickname}</strong> {getStatusMessage(request.projectRegistrationStatus)}
                                </RequestText>
                                <ButtonGroup>
                                    {request.projectRegistrationStatus === "PENDING" && (
                                        <>
                                            <ApproveButton onClick={() => handleApprove(request.registrationId)}>승인</ApproveButton>
                                            <RejectButton onClick={() => handleReject(request.registrationId)}>거절</RejectButton>
                                        </>
                                    )}
                                    {request.projectRegistrationStatus === "REJECTED" && (
                                        <ApproveButton onClick={() => handleApprove(request.registrationId)}>승인</ApproveButton>
                                    )}

                                </ButtonGroup>
                            </RequestItem>
                        ))
                    )}
                </RequestList>
            </m.ModalContent>
        </m.ModalOverlay>
    );
}