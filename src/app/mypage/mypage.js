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


const taskData = [
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "taskId": 1,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 3,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
            },
            {
            "taskId": 4,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
            },
            {
            "taskId": 5,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": "2025-03-01",
            "taskStatus": "COMPLETED",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
            },
            {
            "taskId": 6,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 6,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": true,
        "last": false,
        "size": 6,
        "number": 0,
        "sort": [],
        "numberOfElements": 6,
        "empty": false
        },
        "timestamp": "2025-03-20T16:38:14.792466"
    },
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "taskId": 1,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 2,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 3,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 4,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 5,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": "2025-03-01",
            "taskStatus": "COMPLETED",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 6,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 6,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": false,
        "last": false,
        "size": 6,
        "number": 0,
        "sort": [],
        "numberOfElements": 6,
        "empty": false
        },
        "timestamp": "2025-03-20T16:38:14.792466"
    },
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "taskId": 1,
            "description": "피그마 화면 설계 수정ㅎ",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 2,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 3,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 4,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 5,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": "2025-03-01",
            "taskStatus": "COMPLETED",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            },
            {
            "taskId": 6,
            "description": "피그마 화면 설계 수정ㅎㅎㅎ",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "ON_GOING",
            "assignedStatus": "ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": 4,
            "projectNickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 6,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": false,
        "last": true,
        "size": 6,
        "number": 0,
        "sort": [],
        "numberOfElements": 6,
        "empty": false
        },
        "timestamp": "2025-03-20T16:38:14.792466"
    }
]

export default function My({ projectId }) {
    const ProjectId = Number(projectId);

    const [projectUserData, setProjectUserData] = useState(null);
    const [projectData, setProjectData] = useState(null);

    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);

    const [mySprints, setMySprints] = useState([]);
    const [lastSprintId, setLastSprintId] = useState(null);
    const [sprintLast, setSprintLast] = useState(false);
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

    const loadMySprints = async (cursor = null) => {
        try {
            const response = await fetchMySprintTaskData(ProjectId, cursor);
            const newSprints = response.content;
    
            if (cursor === null) {
                setMySprints(newSprints);
                
                const today = new Date().toISOString().split('T')[0];
                const index = newSprints.findIndex(s => s.startDt <= today && s.dueDt >= today);
    
                if (index !== -1) {
                    setCurrentSprintIndex(index);
                } else {
                    const upcomingIndex = newSprints.findIndex(s => s.startDt > today);
                    setCurrentSprintIndex(upcomingIndex !== -1 ? upcomingIndex : Math.max(0, newSprints.length - 1));
                }
            } else {
                setMySprints(prev => [...prev, ...newSprints]);
            }
    
            const newLastId = newSprints.length > 0 ? newSprints[newSprints.length - 1].id : null;
            setLastSprintId(newLastId);
            setSprintLast(response.last);
        } catch (error) {
            console.error("스프린트 불러오기 실패:", error.message);
        }
    };

    useEffect(() => {
        if (ProjectId) {
            loadMySprints();
        }
    }, [ProjectId]);

    const handlePrevSprint = () => {
        setCurrentSprintIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextSprint = async () => {
        if (currentSprintIndex === mySprints.length - 1 && !sprintLast) {
            await loadMySprints(lastSprintId); 
            setCurrentSprintIndex(prev => prev + 1);
        } else {
            setCurrentSprintIndex(prev => prev + 1);
        }
    };

    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 아래부터 시작------------------------------------>
    
    const [visibleTasks, setVisibleTasks] = useState([]);
    const [taskPage, setTaskPage] = useState(0);
    const [hasMoreTasks, setHasMoreTasks] = useState(true);

    const loadMoreTasks = () => {
        if (taskPage < taskData.length) {
            const newTasks = taskData[taskPage].data.content;
            setVisibleTasks((prev) => [...prev, ...newTasks]);
            setTaskPage((prev) => prev + 1);
    
            if (taskPage + 1 >= taskData.length) {
                setHasMoreTasks(false);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                loadMoreTasks();
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [taskPage, hasMoreTasks]);

    const currentSprint = mySprints[currentSprintIndex];
    const currentTasks = taskData[currentSprintIndex]?.data.content || [];

    useEffect(() => {
        if (visibleTasks.length === 0 && taskData.length > 0) {
            loadMoreTasks();
        }
    }, []);
     // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 위까지 끝-------------------------------------->

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
                        <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px' }}>{teamData.data.teamName}</span>
                        <span>{projectData?.projectTitle}</span>
                    </h2>
                    <Divider1 />
                    <p style={{ fontSize: '15px', color: '#4F3DBD', marginTop: '10px', marginLeft: '20px' }}>
                        {projectData?.projectDescription}
                    </p>

                    <M.SprintBox id="sprint-box" style={{ position: 'relative' }}>

                        {/* 왼쪽 화살표 */}
                        {currentSprintIndex > 0 && (
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
                            <ContributionCircle percentage={currentSprint?.progress} />
                        </M.ContributionWrapper>

                        <M.BoxDivider />

                        <M.RoleWrapper>
                            <M.RoleTitle>역할</M.RoleTitle>
                            <M.RoleText>
                            {projectUserData?.data?.role === "ADMIN" ? "팀장" : "팀원"}
                            </M.RoleText>
                        </M.RoleWrapper>

                        {/* 오른쪽 화살표 */}
                        {(currentSprintIndex < mySprints.length - 1 || !sprintLast) && (
                            <div style={{ position: 'absolute', right: '-60px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleNextSprint}>
                            <AiOutlineRight size={50} color="#796AD9" />
                            </div>
                        )}
                    </M.SprintBox>
                </div>

                <M.TaskHeader>Todo</M.TaskHeader>
                <T.TaskContainer>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                    <--------------------------------------map 함수 부분--------------------------------------> */}
                    {visibleTasks.map((task, index) => (
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
                                <T.CButton>완료</T.CButton>
                                <T.SButton>SOS</T.SButton>
                                </T.ButtonContainer>
                            )}
                            {task.taskStatus === "ON_GOING" && task.sosStatus === "SOS" && (
                                <T.ButtonContainer>
                                <T.CButton>완료</T.CButton>
                                <T.SButton $isSOS={true}>SOS</T.SButton>
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