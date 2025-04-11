"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ContentContainer, Divider1 } from '@/components/common_s';
import * as M from './mypage_s';
import * as T from '../task/task_s';
import * as P from '../project/project_s';
import { ContributionCircle } from './contributionCircle';
import ApproveModal from "./approve_modal";
import LeaderModal from "./leader_modal";

import { fetchProjectData, fetchProjectUser } from "@/app/api/project/projectApi";
import { fetchMySprintTaskData  } from "@/app/api/sprint/sprintApi";
import { completeTask, sosTask } from  "@/app/api/task/taskApi";

import { useAlert } from "@/context/AlertContext";

const teamData = {
    "success": true,
    "status": 200,
    "data": {
        "teamId": "1",
        "teamName": "Side Effect",
        "teamDescription": "Lg CNS AM Inspire Camp 1기 스터디그룹 2조",
        "teamEmoji": "🍇"
    },
    "timestamp": "2025-02-10T14:18:46.135007"
}

export default function My({ projectId }) {
    const { showAlert } = useAlert();

    const ProjectId = Number(projectId);

    const [projectUserData, setProjectUserData] = useState(null);
    const [projectData, setProjectData] = useState(null);

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);

    const [mySprints, setMySprints] = useState([]);
    const [lastSprintId, setLastSprintId] = useState(null);
    const [sprintLast, setSprintLast] = useState(false);
    
    const [currentSprint, setCurrentSprint] = useState(null);
    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);

    useEffect(() => {
        const getProjectInfo = async () => {
            try {
                const userData = await fetchProjectUser(ProjectId);
                setProjectUserData(userData);
                console.log("프로필 이미지:", userData?.profileImageUrl);
            } catch (err) {
                console.error("프로젝트 유저 정보 에러:", err.message);
            }

            try {
                const data = await fetchProjectData(ProjectId);
                setProjectData(data);
            } catch (err) {
                console.error("프로젝트 데이터 에러:", err.message);
            }
        };

        getProjectInfo();
    }, []);

    const loadMySprints = async (baseSprintId = null, direction = "NEXT") => {
        try {
            const response = await fetchMySprintTaskData(ProjectId, baseSprintId, direction);
            const newSprints = response.content;
    
            if (baseSprintId === null) {
                // 최초 로딩
                setMySprints(newSprints);
    
                const today = new Date().toISOString().split('T')[0];
                const index = newSprints.findIndex(s => s.startDt <= today && s.dueDt >= today);
    
                let finalIndex;
                if (index !== -1) {
                    finalIndex = index;
                } else {
                    const upcomingIndex = newSprints.findIndex(s => s.startDt > today);
                    finalIndex = upcomingIndex !== -1 ? upcomingIndex : Math.max(0, newSprints.length - 1);
                }
    
                setCurrentSprintIndex(finalIndex);
                setCurrentSprint(newSprints[finalIndex]);
            } else {
                // 이전 스프린트 추가
                setMySprints((prev) => [...prev, ...newSprints]);
                setCurrentSprintIndex((prev) => prev + newSprints.length); // 새로 추가한 만큼 index 이동
            }
    
            const newLastId = newSprints.length > 0 ? newSprints[newSprints.length - 1].id : lastSprintId;
            setLastSprintId(newLastId);
            setSprintLast(response.last);
    
        } catch (error) {
            console.error("스프린트 불러오기 실패:", error.message);
        }
    };

    useEffect(() => {
        if (mySprints.length > 0 && mySprints[currentSprintIndex]) {
            setCurrentSprint(mySprints[currentSprintIndex]);
        }
    }, [currentSprintIndex, mySprints]);

    useEffect(() => {
        if (ProjectId) {
            loadMySprints();
        }
    }, [ProjectId]);

    const handlePrevSprint = async () => {
        const currentBaseSprint = mySprints[currentSprintIndex];
    
        if (currentSprintIndex === mySprints.length - 1 && !sprintLast) {
            await loadMySprints(currentBaseSprint.id, "PREV");
        } else {
            setCurrentSprintIndex((prev) => Math.min(prev + 1, mySprints.length - 1));
        }
    };

    const handleNextSprint = () => {
        setCurrentSprintIndex((prev) => Math.max(prev - 1, 0));
    };

    const refreshCurrentSprint = async () => {
        try {
            const response = await fetchMySprintTaskData(ProjectId);
            const updatedSprints = response.content;
    
            setMySprints(updatedSprints);
    
            if (updatedSprints.length > 0 && updatedSprints[currentSprintIndex]) {
                setCurrentSprint(updatedSprints[currentSprintIndex]);
            }
        } catch (error) {
            console.error("현재 스프린트 갱신 실패:", error.message);
        }
    };

    const handleCompleteTask = async (taskId) => {
        try {
            await completeTask(taskId);
            showAlert("success", "태스크를 완료했습니다.");
            await refreshCurrentSprint(); 
        } catch (err) {
            showAlert("error", err.message);
        }
    };

    const handleSOSTask = async (taskId) => {
        try {
            await sosTask(taskId);
            showAlert("success", "태스크가 SOS 상태로 변경되었습니다.");
            await refreshCurrentSprint();
        } catch (err) {
            showAlert("error", err.message);
        }
    };

    // 모달 상태에 따라 스크롤 제어
    useEffect(() => {
        const disableScroll = () => {
            document.documentElement.style.overflow = "hidden"; 
            document.body.style.overflow = "hidden";
        };
    
        const enableScroll = () => {
            document.documentElement.style.overflow = "auto"; 
            document.body.style.overflow = "auto";
        };
    
        if (isApproveModalOpen || isLeaderModalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return enableScroll;
    }, [isApproveModalOpen, isLeaderModalOpen]);

    if (!projectUserData || !projectData) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
        <ContentContainer>
            <M.Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <M.ProfileSection>
                    <M.ProfileImage $profileImage={projectUserData?.profileImageUrl} />
                    <M.ProfileInfo>
                        <M.Username>{projectUserData?.projectNickname} <span style={{ fontWeight: "normal" }}>님의 마이페이지</span></M.Username>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                        <Link href={`/project/${projectData?.projectId}/feedback`}>
                            <M.EvaluationButton>동료평가 메세지</M.EvaluationButton>
                        </Link>
                        
                        {projectUserData?.role === "ADMIN" && (
                            <>
                            <M.ApproveButton onClick={() => setIsApproveModalOpen(true)}>가입 신청</M.ApproveButton>
                            <M.LeaderButton onClick={() => setIsLeaderModalOpen(true)}>팀장 변경</M.LeaderButton>
                            </>
                        )}
                        </div>
                    </M.ProfileInfo>
                </M.ProfileSection>

                <div style={{ width: '750px', textAlign: 'left', position: 'relative', marginTop: '10px'}}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '100px' }}>
                        <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px' }}>{projectData?.teamName}</span>
                        <span>{projectData?.projectTitle}</span>
                    </h2>
                    <Divider1 />
                    <p style={{ fontSize: '15px', color: '#4F3DBD', marginTop: '10px', marginLeft: '20px' }}>
                        {projectData?.projectDescription}
                    </p>

                    <M.SprintBox id="sprint-box" style={{ position: 'relative' }}>

                        {/* 왼쪽 화살표 */}
                        {(() => {
                            const shouldShowLeftArrow = currentSprintIndex < mySprints.length - 1 || !sprintLast;
                            console.log("currentSprintIndex:", currentSprintIndex, "/", mySprints.length);
                            console.log("왼쪽 화살표 조건:", currentSprintIndex > 0);
                            return shouldShowLeftArrow;
                            })() && (
                            <div style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} 
                            onClick={handlePrevSprint}>
                            <AiOutlineLeft size={50} color="#796AD9" />
                            </div>
                        )}

                        <M.SprintInfo>
                            <M.SprintTitle>Sprint {currentSprint?.title}</M.SprintTitle>
                            <M.SprintDescription>{currentSprint?.goal}</M.SprintDescription>
                        </M.SprintInfo>

                        <M.BoxDivider />

                        <M.ContributionWrapper>
                            <M.ContributionTitle>기여도</M.ContributionTitle>
                            {typeof currentSprint?.progress === "number" && !isNaN(currentSprint.progress) && (
                                <ContributionCircle percentage={currentSprint.progress} />
                            )}
                        </M.ContributionWrapper>

                        <M.BoxDivider />

                        <M.RoleWrapper>
                            <M.RoleTitle>역할</M.RoleTitle>
                            <M.RoleText>
                            {projectUserData?.data?.role === "ADMIN" ? "팀장" : "팀원"}
                            </M.RoleText>
                        </M.RoleWrapper>

                        {/* 오른쪽 화살표 */}
                        {currentSprintIndex > 0 && (
                            <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleNextSprint}>
                            <AiOutlineRight size={50} color="#796AD9" />
                            </div>
                        )}
                    </M.SprintBox>
                </div>

                <M.TaskHeader>Todo</M.TaskHeader>
                <T.TaskContainer>
                    {currentSprint?.taskList?.map((task, index) => (
                        <T.TaskWrapper key={index}>
                            <T.TaskBox 
                                $isCompleted={task.taskStatus === "COMPLETED"} 
                                $isSOS={task.sosStatus === "SOS"}
                            >
                                <T.TaskLeft>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                        <P.TaskCheckbox checked={task.taskStatus === "COMPLETED"} readOnly />

                                        <T.TaskTitle>{task.description}</T.TaskTitle>
                                    </div>
                                        {/* <T.TaskDate>{task.task_start} ~ {task.task_end}</T.TaskDate> */}
                                </T.TaskLeft>
                            </T.TaskBox>

                            {task.taskStatus === "COMPLETED" && (
                                <T.NCButton>
                                    미완료
                                </T.NCButton>
                            )}
                            {task.taskStatus === "ON_GOING" && task.sosStatus !== "SOS" && (
                                <T.ButtonContainer>
                                <T.CButton onClick={() => handleCompleteTask(task.taskId)}>완료</T.CButton>
                                <T.SButton onClick={() => handleSOSTask(task.taskId)}>SOS</T.SButton>
                                </T.ButtonContainer>
                            )}
                            {task.taskStatus === "ON_GOING" && task.sosStatus === "SOS" && (
                                <T.ButtonContainer>
                                <T.CButton onClick={() => handleCompleteTask(task.taskId)}>완료</T.CButton>
                                <T.SButton $isSOS={true} onClick={() => handleSosTask(task.taskId)}>SOS</T.SButton>
                                </T.ButtonContainer>
                            )}
                        </T.TaskWrapper>
                    ))}
                </T.TaskContainer>
            </M.Container>
        </ContentContainer>

        <ApproveModal
            isOpen={isApproveModalOpen}
            onClose={() => setIsApproveModalOpen(false)}
        />

        <LeaderModal 
            isOpen={isLeaderModalOpen}
            onClose={() => setIsLeaderModalOpen(false)}
        />;
        </>
    );
}