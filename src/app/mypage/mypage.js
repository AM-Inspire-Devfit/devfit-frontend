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

export default function My() {
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

    const userData = {
        name: "채민주",
        profileImage: "/img/default_profile.png",
        role: "ADMIN"
    };

    const projectData = {
        project_id: 1,
        teamName: "SideEffect",
        projectName: "devFit",
        projectDescription: "개발자들의 성공적인 협업을 돕는 웹서비스",
    };

    const sprintData = [
        { sprint_num: 1, goal: "UI 디자인을 완료하고 핵심 기능 단위를 정리합니다.", sprint_start: "2025-01-20", sprint_end: "2025-02-19", percentage: 50 },
        { sprint_num: 2, goal: "리액트 프로젝트 생성 및 초기 개발을 진행합니다.", sprint_start: "2025-02-20", sprint_end: "2025-03-19", percentage: 70 },
        { sprint_num: 3, goal: "API 연결을 시작하고 전체 기능 구현을 마무리합니다.", sprint_start: "2025-03-20", sprint_end: "2025-03-19",percentage: 90 },
    ];

    const taskData = [
        { sprint_num: 1, 
            tasks: [
            { 
                title: "로그인 페이지 API 연동", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-20", 
                task_end: "2025-03-01", 
                toDoStatus: "ON_GOING", 
                finish_date: "", 
                taskDifficulty: "HIGH",
                sos: false 
            },
            { 
                title: "회원가입 페이지 개발", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-21", 
                task_end: "2025-03-03", 
                toDoStatus: "COMPLETED", 
                finish_date: "2025-03-01", 
                taskDifficulty: "LOW",
                sos: false 
            },
            { 
                title: "로그인 페이지 API 연동", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-20", 
                task_end: "2025-03-01", 
                toDoStatus: "ON_GOING", 
                finish_date: "", 
                taskDifficulty: "HIGH",
                sos: false 
            },
            { 
                title: "회원가입 페이지 개발", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-21", 
                task_end: "2025-03-03", 
                toDoStatus: "COMPLETED", 
                finish_date: "2025-03-01", 
                taskDifficulty: "HIGH",
                sos: false 
            },
            { 
                title: "로그인 페이지 API 연동", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-20", 
                task_end: "2025-03-01", 
                toDoStatus: "ON_GOING", 
                finish_date: "", 
                taskDifficulty: "MID",
                sos: true 
            },
        ]},
        { sprint_num: 2, 
            tasks: [
            { 
                title: "로그인 페이지 API 연동", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-20", 
                task_end: "2025-03-01", 
                toDoStatus: "ON_GOING", 
                finish_date: "", 
                taskDifficulty: "LOW",
                sos: false 
            },
            { 
                title: "회원가입 페이지 개발", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-02-21", 
                task_end: "2025-03-03", 
                toDoStatus: "COMPLETED", 
                finish_date: "2025-03-01", 
                taskDifficulty: "LOW",
                sos: false 
            },
        ]},
        { sprint_num: 3, 
            tasks: [
            { 
                title: "대시보드 페이지 구현", 
                assignee: "채민주", 
                profileImage: "/img/profile.png", 
                task_start: "2025-03-22", 
                task_end: "2025-04-01", 
                toDoStatus: "ON_GOING", 
                finish_date: "", 
                taskDifficulty: "MID",
                sos: false 
            },
        ]},
    ];

    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);

    const handlePrevSprint = () => {
        setCurrentSprintIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextSprint = () => {
        setCurrentSprintIndex((prev) => Math.min(prev + 1, sprintData.length - 1));
    };

    const currentSprint = sprintData[currentSprintIndex];
    const currentTasks = taskData.find(s => s.sprint_num === currentSprint.sprint_num)?.tasks || [];

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const sprintIndex = sprintData.findIndex(sprint =>
            sprint.sprint_start <= today && sprint.sprint_end >= today
        );
    
        if (sprintIndex !== -1) {
            setCurrentSprintIndex(sprintIndex);
        } else {
            const upcomingSprintIndex = sprintData.findIndex(sprint => sprint.sprint_start > today);
            if (upcomingSprintIndex !== -1) {
                setCurrentSprintIndex(upcomingSprintIndex);
            } else {
                setCurrentSprintIndex(sprintData.length - 1);
            }
        }
    }, []); // 컴포넌트가 최초 마운트될 때만 실행

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
    
        if (isApproveModalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return enableScroll;
    }, [isApproveModalOpen]);

    return (
        <>
        <ContentContainer>
            <M.Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <M.ProfileSection>
                    <M.ProfileImage $profileImage={userData.profileImage} />
                    <M.ProfileInfo>
                        <M.Username>{userData.name} <span style={{ fontWeight: "normal" }}>님의 마이페이지</span></M.Username>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                        <Link href={`/project/${projectData.project_id}/feedback`}>
                            <M.EvaluationButton>동료평가 메세지</M.EvaluationButton>
                        </Link>
                        
                        {userData.role === "ADMIN" && (
                            <>
                            <M.ApproveButton onClick={() => setIsApproveModalOpen(true)}>가입 신청</M.ApproveButton>
                            <M.LeaderButton>팀장 변경</M.LeaderButton>
                            </>
                        )}
                        </div>
                    </M.ProfileInfo>
                </M.ProfileSection>

                <div style={{ width: '750px', textAlign: 'left', position: 'relative', marginTop: '10px'}}>
                    <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '100px' }}>
                        <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px' }}>{projectData.teamName}</span>
                        <span>{projectData.projectName}</span>
                    </h2>
                    <Divider1 />
                    <p style={{ fontSize: '15px', color: '#4F3DBD', marginTop: '10px', marginLeft: '20px' }}>
                        {projectData.projectDescription}
                    </p>

                    <M.SprintBox id="sprint-box" style={{ position: 'relative' }}>

                        {/* 왼쪽 화살표 */}
                        {currentSprintIndex > 0 && (
                            <div style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handlePrevSprint}>
                            <AiOutlineLeft size={50} color="#796AD9" />
                            </div>
                        )}

                        <M.SprintInfo>
                            <M.SprintTitle>Sprint {currentSprint.sprint_num}</M.SprintTitle>
                            <M.SprintDescription>{currentSprint.goal}</M.SprintDescription>
                        </M.SprintInfo>

                        <M.BoxDivider />

                        <M.ContributionWrapper>
                            <M.ContributionTitle>기여도</M.ContributionTitle>
                            <ContributionCircle percentage={currentSprint.percentage} />
                        </M.ContributionWrapper>

                        <M.BoxDivider />

                        <M.RoleWrapper>
                            <M.RoleTitle>역할</M.RoleTitle>
                            <M.RoleText>팀장</M.RoleText>
                        </M.RoleWrapper>

                        {/* 오른쪽 화살표 */}
                        {currentSprintIndex < sprintData.length - 1 && (
                            <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleNextSprint}>
                            <AiOutlineRight size={50} color="#796AD9" />
                            </div>
                        )}
                    </M.SprintBox>
                </div>

                <M.TaskHeader>Todo</M.TaskHeader>
                <T.TaskContainer>
                    {currentTasks.map((task, index) => (
                        <T.TaskWrapper key={index}>
                            <T.TaskBox $isCompleted={task.toDoStatus === "COMPLETED"} $isSOS={task.sos}>
                                <T.TaskLeft>
                                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                        <P.TaskCheckbox checked={task.toDoStatus === "COMPLETED"} readOnly />

                                        <T.TaskTitle>{task.title}</T.TaskTitle>
                                    </div>
                                        {/* <T.TaskDate>{task.task_start} ~ {task.task_end}</T.TaskDate> */}
                                </T.TaskLeft>
                            </T.TaskBox>

                            {task.toDoStatus === "COMPLETED" && (
                                <T.NCButton>
                                미완료
                                </T.NCButton>
                            )}
                            {task.toDoStatus === "ON_GOING" && !task.sos && (
                                <T.ButtonContainer>
                                <T.CButton>완료</T.CButton>
                                <T.SButton>SOS</T.SButton>
                                </T.ButtonContainer>
                            )}
                            {task.toDoStatus === "ON_GOING" && task.sos && (
                                <T.ButtonContainer>
                                <T.CButton>완료</T.CButton>
                                <T.SButton $isSOS={task.sos}>SOS</T.SButton>
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
        </>
    );
}