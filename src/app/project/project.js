"use client";  

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

import { PieChart, Pie, Cell } from "recharts";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SprintCalendar from "./sprint_calendar"; 

import { ContentContainer, Divider1 } from '../../components/common_s';

import * as P from './project_s';

import SprintModal from "./sprint_modal"; 
import MeetingModal from "./meeting_modal";
import ProjectModal from "../team/project_modal";

import { fetchProjectData, fetchProjectUser, fetchProjectMemberList } from "@/app/api/project/projectApi";
import { fetchSprintTaskData } from "@/app/api/sprint/sprintApi";

import Image from "next/image";

import { useAlert } from "@/context/AlertContext";

    const colorData = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#C9CBCF", "#8D44AD",
        "#27AE60", "#D35400"
    ];

const sprintContributionData = [
    {
        "success": true,
        "status": 200,
        "data": [
        {
            "contributionId": 3,
            "sprintId": 1,
            "memberId": 4,
            "nickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            "score": 54
        },
        {
            "contributionId": 1,
            "sprintId": 1,
            "memberId": 2,
            "nickname": "조수빈",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            "score": 47
        },
        {
            "contributionId": 2,
            "sprintId": 1,
            "memberId": 3,
            "nickname": null,
            "profileImageUrl": null,
            "score": 19
        }
        ],
        "timestamp": "2025-03-20T21:45:31.228694"
    },
    {
        "success": true,
        "status": 200,
        "data": [
        {
            "contributionId": 3,
            "sprintId": 2,
            "memberId": 4,
            "nickname": "최현태",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            "score": 54
        },
        {
            "contributionId": 1,
            "sprintId": 2,
            "memberId": 2,
            "nickname": "조수빈",
            "profileImageUrl": "https://img1.kakaocdn.net/thumb/R110x110.q70/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Faccount_images%2Fdefault_profile.jpeg",
            "score": 47
        },
        {
            "contributionId": 2,
            "sprintId": 2,
            "memberId": 3,
            "nickname": "채민주",
            "profileImageUrl": 10,
            "score": 19
        },
        {
            "contributionId": 2,
            "sprintId": 2,
            "memberId": 1,
            "nickname": "정선우",
            "profileImageUrl": 30,
            "score": 19
        },
        ],
        "timestamp": "2025-03-20T21:45:31.228694"
    }
]

const meetingData = {
    1: {
        "first": true,
        "last": true,
        "size": 1073741824,
        "content": [
            {
            "meetingTitle": "미팅 타이틀",
            "meetingStart": "2025-02-20T16:38:14.792466",
            "meetingEnd": "2025-02-20T18:38:14.792466"
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

    2: {
        "first": true,
        "last": true,
        "size": 1073741824,
        "content": [
            {
            "meetingTitle": "미팅 타이틀",
            "meetingStart": "2025-03-20T16:00:14.792466",
            "meetingEnd": "2025-03-20T18:00:14.792466",
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
};


export default function Project({projectId}) {
    const { showAlert } = useAlert();

    const [isClient, setIsClient] = useState(false);
    const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
    const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
    const [goal, setGoal] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [projectData, setProjectData] = useState(null);
    const [projectDescription, setProjectDescription] = useState("");

    const [projectUser, setProjectUser] = useState(null);
    const [projectMembers, setProjectMembers] = useState([]);

    const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);

    const [lastSprintId, setLastSprintId] = useState(null);
    const [sprintLast, setSprintLast] = useState(false); // 마지막 페이지 여부
    const [sprintData, setSprintData] = useState([]);

    //meeting
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];

    const ProjectId = Number(projectId);
    const searchParams = useSearchParams();
    const teamName = searchParams.get("teamName");

    useEffect(() => {
        setIsClient(true); // 클라이언트에서만 true
    }, []);

    const getProjectData = async () => {
        try {
            const project = await fetchProjectData(projectId);
            setProjectData(project);
            setProjectDescription(project.projectDescription);
        } catch (error) {
            showAlert("error", error.message);
        }
    
        try {
            const members = await fetchProjectMemberList(projectId);
            setProjectMembers(members.content);
        } catch (error) {
            showAlert("error", error.message);
        }
    
        try {
            const user = await fetchProjectUser(projectId);
            setProjectUser(user);
        } catch (error) {
        }
    };

    useEffect(() => {   
        if (projectId) {
            getProjectData(); 
            setLastSprintId(null); 
            getSprintTaskData();   
            //loadAllSprintData();
        }
    }, [projectId]);


    const getSprintTaskData = async (cursor = null) => {
        try {
            const response = await fetchSprintTaskData(projectId, cursor);
    
            if (cursor === null) {
                setSprintData(response.content);
            } else {
                setSprintData(prev => [...prev, ...response.content]);
            }
    
            const newLastId = response.content.length > 0
                ? response.content[response.content.length - 1].id
                : null;
    
            setLastSprintId(newLastId);
            setSprintLast(response.last); // 마지막 여부 저장
        } catch (error) {
            //showAlert("error", error.message);
        }
    };

    useEffect(() => {
    if (projectId) getSprintTaskData();
    }, [projectId]);

    // sprint 수정 모달 열기/닫기 함수
    const handleSprintModal = () => setIsSprintModalOpen(prev => !prev);

    // sprint 생성 모달
    const handleCreateSprintModal = () => {
        setIsCreateSprintModalOpen(true);
        setGoal("");    

        if (!sprintData || sprintData.length === 0) {
            setStartDate(today);
        }
        setDueDate(""); // 사용자가 입력하게 비워두기 
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
    
        if (isSprintModalOpen || isCreateSprintModalOpen || isMeetingModalOpen || isProjectEditModalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return enableScroll;
    }, [isSprintModalOpen, isCreateSprintModalOpen, isMeetingModalOpen, isProjectEditModalOpen]);


    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 아래부터 시작------------------------------------>
    const mergeProjectMembersWithContributions = (projectMembers, contributionData) => {
        return projectMembers.map((member, index) => {
            const contribution = contributionData.find(
                c => c.memberId === member.projectParticipantId
            );
    
            const score = contribution?.score ?? 0;
            const nickname = (!member.projectNickname || member.projectNickname === "UNKNOWN_PROJECT_NICKNAME") 
                ? "알수없음" 
                : member.projectNickname;
            const profileImage = (!member.profileImageUrl || member.profileImageUrl === "UNKNOWN_PROJECT_PROFILE_URL") 
                ? "/img/default_profile.png" 
                : member.profileImageUrl;
                
            return {
                id: member.projectParticipantId,
                name: nickname,
                profileImage: profileImage,
                value: score,
                color: colorData[index % colorData.length],
            };
        }).sort((a, b) => b.value - a.value).map((member, _, array) => ({
            ...member,
            isTop: member.value > 0 && member.value === array[0].value
        }));
    };

    const processedSprintData = useMemo(() => {
        if (!Array.isArray(sprintData)) return [];
    
        const result = sprintData.map((sprintContent, idx) => {
            if (!sprintContent) return null;
    
                const sprintContributionsForSprint = sprintContributionData.find(item =>
                    item.data?.[0]?.sprintId === sprintContent.id
                )?.data ?? [];
        
                const isLast = idx === sprintData.length - 1;
    
                return {
                    sprint_id: sprintContent.id,
                    sprint_title: sprintContent.title,
                    goal: sprintContent.goal,
                    sprint_start: sprintContent.startDt,
                    sprint_end: sprintContent.dueDt,
                    progress: sprintContent.progress ?? 0,
                    last: isLast,
                    title: sprintContent.title,
                    startDt: sprintContent.startDt,
                    dueDt: sprintContent.dueDt,
                    member: mergeProjectMembersWithContributions(
                        projectMembers,
                        sprintContributionsForSprint
                    ),
                };
            })
            .filter(Boolean);
    
        return result;
    }, [sprintData, projectMembers]);

    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const currentSprint = processedSprintData[currentSprintIndex]; 

    const sprint = processedSprintData.find(s => s.sprint_title === currentSprint?.sprint_title);
    const sprint_id = sprint ? sprint.sprint_id : "default_sprint";

    const [showCreateSprintBox, setShowCreateSprintBox] = useState(false); // Sprint 생성 박스 표시 여부
    
    const [canShowNextArrow, setCanShowNextArrow] = useState(false);

    const getTaskDataBySprintId = (sprintId) => {
        const sprint = sprintData.find(s => s.id === sprintId);
        if (!sprint || !Array.isArray(sprint.taskList)) return [];
    
        return sprint.taskList.map(task => ({
            task: task.description,
            toDoStatus: task.taskStatus,
            sosStatus: task.sosStatus
        }));
    };

    const currentSprintTasks = currentSprint
        ? getTaskDataBySprintId(currentSprint.sprint_id)
        : [];

    
    // const loadAllSprintData = async () => {
    //     let hasNext = true;
    //     let cursor = null;
    //     let allSprintData = [];
        
    //     while (hasNext) {
    //         const response = await fetchSprintTaskData(projectId, cursor);
    //         allSprintData = [...allSprintData, ...response.content];
        
    //         hasNext = !response.last;
    //         cursor = response.content.length > 0
    //         ? response.content[response.content.length - 1].id
    //         : null;
    //     }
        
    //     setSprintData(allSprintData);
    //     const todayDate = new Date(today + "T00:00:00");

    //     const processed = allSprintData.map((sprintContent, idx) => {
    //         const startDate = new Date(sprintContent.startDt + "T00:00:00");
    //         const endDate = new Date(sprintContent.dueDt + "T23:59:59");
    //         return { idx, startDate, endDate };
    //     });
    
    //     const sprintIndex = processed.find(p =>
    //         p.startDate <= todayDate && todayDate <= p.endDate
    //     )?.idx;
    
    //     if (sprintIndex !== undefined) {
    //         setCurrentSprintIndex(sprintIndex);
    //     } else {
    //         const upcoming = processed.find(p => p.startDate > todayDate)?.idx;
    //         setCurrentSprintIndex(
    //             upcoming !== undefined ? upcoming : Math.max(0, processed.length - 1)
    //         );
    //     }
    // };


    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 위까지 끝-------------------------------------->


    const handleNextSprint = async () => {
        if (currentSprint.last) {
            if (!sprintLast) {
                await getSprintTaskData(lastSprintId);
            } else {
                setShowCreateSprintBox(true); // 마지막이면 Sprint 생성 상자
            }
        } else {
            setCurrentSprintIndex(prev => prev + 1);
        }
    };

    const handlePrevSprint = () => {
        if (showCreateSprintBox) {
            setShowCreateSprintBox(false); // Sprint 생성 화면에서 이전 Sprint로 돌아가기
            setCurrentSprintIndex(processedSprintData.length - 1); // 마지막 Sprint로 이동
        } else if (currentSprintIndex > 0) {
            setCurrentSprintIndex(prevIndex => prevIndex - 1); // 이전 Sprint로 이동
        }
    };

    const isFeedbackDay = currentSprint && currentSprint.sprint_end === today;
    const sprintsWithFeedback = Array.isArray(processedSprintData)
        ? processedSprintData.filter(sprint => sprint.sprint_end === today)
        : [];

    useEffect(() => {
        if (!currentSprint) return;
    
        const isLastSprint = currentSprintIndex === processedSprintData.length - 1;
    
        const isNotParticipant =
            projectUser?.errorClassName === "PROJECT_PARTICIPATION_REQUIRED" || projectUser === null;
    
        if (isLastSprint) {
            if (isNotParticipant) {
                setCanShowNextArrow(false);
            } else {
                const nowKST = new Date(Date.now() + 9 * 60 * 60 * 1000);
                const sprintEndKST = new Date(new Date(currentSprint.sprint_end + "T23:59:59").getTime() + 9 * 60 * 60 * 1000);
                setCanShowNextArrow(nowKST > sprintEndKST);
            }
        } else {
            setCanShowNextArrow(true);
        }
    }, [currentSprint, projectUser, currentSprintIndex]);

    const lastSprint = processedSprintData[processedSprintData.length - 1];

    const lastSprintNum = lastSprint ? parseInt(lastSprint.sprint_title, 10) || 0 : 0; 

    useEffect(() => {
        if (isSprintModalOpen && !isCreateSprintModalOpen && currentSprint) {
            setGoal(currentSprint.goal);
            setStartDate(currentSprint.sprint_start);
            setDueDate(currentSprint.sprint_end);
        }
    }, [isSprintModalOpen, isCreateSprintModalOpen, currentSprint]);

    // Sprint 새로 만들 때는 오늘 날짜로
    useEffect(() => {
        if (isCreateSprintModalOpen) {
            setStartDate(today);
            setGoal("");
            setDueDate(""); 
        }
    }, [isCreateSprintModalOpen]);

    // 신규 미팅 생성
    const openMeetingModalForCreate = () => {
        setSelectedMeeting(null);
        setMeetingTitle("");
        setMeetingDate("");
        setStartTime("");
        setEndTime("");
        setIsMeetingModalOpen(true);
    };
    
    // 기존 미팅 수정
    const openMeetingModalForEdit = (meeting) => {
        setSelectedMeeting(meeting);
        setMeetingTitle(meeting.title);
        setMeetingDate(meeting.date);
        setStartTime(meeting.startTime);
        setEndTime(meeting.endTime);
        setIsMeetingModalOpen(true);
    };



    return (
        <>
        <ContentContainer>
            <div style={{ width: '750px', textAlign: 'left' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '10px', display: "flex", alignItems: "center", justifyContent: "space-between", height: "40px" }}>
                    <div style={{ display: "flex", alignItems: "left" }}>
                    <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px', marginTop: '10px' }}>{teamName} </span> 
                        <span style={{ height: "40px", lineHeight: "40px" }}>{projectData?.projectTitle}</span>
                    </div>
                    {projectUser && projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && (
                    <Image
                        src="/img/edit.png"
                        alt="Edit"
                        width={20}
                        height={20}
                        onClick={() => setIsProjectEditModalOpen(true)} 
                        style={{ cursor: "pointer" }}
                    />
                    )}
                </h2>
                <Divider1/>
                    <p 
                        style={{ 
                            fontSize: "15px", 
                            color: projectDescription ? "#4F3DBD" : "#A9A9A9", 
                            fontStyle: projectDescription ? "normal" : "italic",
                            height: "30px", 
                            lineHeight: "30px", 
                            padding: "0", 
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px"
                        }}>
                        {projectDescription || "프로젝트에 대한 설명을 추가하세요!"}
                    </p>
            </div>
            {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
             <--------------------------------------map 함수 부분--------------------------------------> */}
            {currentSprint?.sprint_end === today && (
            <P.AlertBox key={`feedback-${sprint.sprint_title}`}>
                <div>
                    <P.AlertIcon>🔔</P.AlertIcon> 
                    <span>Sprint {sprint.sprint_title} 동료평가를 잊지 마세요!</span>
                </div>
            </P.AlertBox>
            )}

            <P.BoxContainer>
                {/* 왼쪽 화살표 (첫 Sprint가 아닐 때만 표시) */}
                {currentSprintIndex > 0 && (
                    <div style={{ position: 'absolute', left: '-100px', top: '300px', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handlePrevSprint}>
                        <AiOutlineLeft size={80} color="#796AD9" />
                    </div>
                )}

                {(!processedSprintData.length || showCreateSprintBox) ? (
                    // Sprint 생성 상자
                    <div style={{
                        width: '100%',
                        height: '600px', 
                        backgroundColor: '#EEEAFF',
                        display: 'flex',
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: '10px',
                        color: '#432CA4',
                        fontSize: '20px',
                        textAlign: 'center', 
                    }}>
                        <div>Sprint {lastSprintNum + 1}을(를) 생성해보세요!</div>
                        <button 
                            onClick={handleCreateSprintModal} 
                            style={{
                                marginTop: '20px', 
                                padding: '7px 15px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#432CA4',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            생성하기
                        </button>
                        <SprintModal 
                            isOpen={isCreateSprintModalOpen}
                            onClose={() => setIsCreateSprintModalOpen(false)}
                            sprintId={currentSprint?.sprint_id}
                            title={lastSprintNum + 1}
                            goal={goal}
                            setGoal={setGoal}
                            startDate={startDate}
                            setStartDate={setStartDate}  
                            dueDate={dueDate}
                            setDueDate={setDueDate}  
                            isLastSprint={true} 
                            projectId={projectId}
                            onSprintCreated={async () => {
                                setSprintData([]);           
                                setLastSprintId(null);
                                setSprintLast(false);
                                await getSprintTaskData();  
                                setShowCreateSprintBox(false);
                                setCurrentSprintIndex(processedSprintData.length); 
                            }}
                            isEdit={false} 
                        />
                    </div>
                ) : (
                    <>
                <P.ChartWrapper>
                    <P.ChartTitle>Sprint {currentSprint?.sprint_title}</P.ChartTitle>

                    {/* 팀원 리스트 */}
                    <P.ScrollableMemberList>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                    {currentSprint?.member?.map((member, index) => (
                        <P.ProjectMember key={`${member.id}-${index}`}> 
                        <P.ProfileContainer>
                            <P.ProfileMain $profileImage={member.profileImage} />
                            <P.ProfileIcon color={member.color} />
                        </P.ProfileContainer>
                        <span style={{ marginLeft: '10px' }}>{member.name}</span>
                        <P.TopBadge style={{ visibility: member.isTop ? 'visible' : 'hidden' }}>🥇</P.TopBadge>
                        {projectUser && member.id !== projectUser.projectParticipantId &&
                            member.name !== "알수없음" && 
                            <Link 
                            href={`/project/${ProjectId}/message?name=${encodeURIComponent(member.name)}&profileImage=${encodeURIComponent(member.profileImage)}`}>
                            <P.FeedbackButton hidden={!isFeedbackDay}>
                                동료 평가
                            </P.FeedbackButton>
                            </Link>
                        }
                        </P.ProjectMember>
                    ))}
                    </P.ScrollableMemberList>

                    {/* 기여도 차트 */}
                    <P.DonutChartContainer>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                        {isClient && (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={currentSprint?.member}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius="65%" 
                                outerRadius="90%" 
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                {currentSprint?.member.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                        )}
                    </P.DonutChartContainer>
                </P.ChartWrapper>

                <div style={{ width: '80%', minWidth: '400px', textAlign: 'left', marginTop: '5px', position: 'relative', }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', flex: 1 }}>
                                <span style={{ fontSize: '23px', marginLeft: '20px' }}>Sprint {currentSprint?.title}</span>
                                <span style={{ fontSize: '12px', marginLeft: '15px' }}>
                                    {currentSprint?.startDt} ~ {currentSprint?.dueDt}
                                </span>
                            </h2>
                            <div onClick={handleSprintModal} style={{ cursor: "pointer", position: 'absolute', top: '15px', right: '0px' }}>
                                {projectUser && projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && (
                                <Image
                                    src="/img/edit.png" 
                                    alt="icon"
                                    width={20}  
                                    height={20}
                                    priority
                                />
                                )}
                            </div>
                            <SprintModal 
                                isOpen={isSprintModalOpen}
                                onClose={() => {
                                    handleSprintModal();                
                                }}
                                sprintId={currentSprint?.sprint_id}
                                title={currentSprint?.title}
                                goal={currentSprint?.goal}
                                setGoal={setGoal}
                                startDate={currentSprint?.startDt}
                                setStartDate={setStartDate}  
                                dueDate={currentSprint?.dueDt}
                                setDueDate={setDueDate}  
                                isLastSprint={currentSprint?.last} 
                                onSprintEdited={async () => {
                                    await getSprintTaskData(); 
                                    const index = sprintData.findIndex(s => s.id === currentSprint?.sprint_id);
                                    if (index !== -1) {
                                        setCurrentSprintIndex(index); 
                                    }
                                }}
                                onSprintDeleted={async () => {
                                    setSprintData([]);
                                    setLastSprintId(null);
                                    setSprintLast(false);
                                
                                    await getSprintTaskData(); 
                                
                                    setCurrentSprintIndex(0);  
                                    setShowCreateSprintBox(false); 
                                }}
                                isEdit={true} 
                            />
                        </div>
                        <Divider1 />
                        <p style={{ fontSize: '14px', fontWeight: 400, color: '#4F3DBD', marginTop: '10px', marginLeft: '20px', marginBottom: '25px' }}>
                            {currentSprint?.goal}
                        </p>
                    </div>

                <P.ProgressContainer>
                    <P.ProgressLabels>
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </P.ProgressLabels>
                    <P.ProgressBarWrapper>
                        <P.ProgressBar progress={currentSprint?.progress} /> 
                    </P.ProgressBarWrapper>
                </P.ProgressContainer>
                
                <P.SprintBox>
                    Task
                    <P.TaskGrid>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                        {currentSprintTasks?.map((item, index) => (
                            <P.TaskItem key={`task-${index}`}> 
                                <P.TaskCheckbox
                                    checked={item.toDoStatus === "COMPLETED"} readOnly
                                />
                                {item.task}
                            </P.TaskItem>
                        ))}
                    </P.TaskGrid>
                    <P.ButtonWrapper>
                    {projectUser && projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && (
                    <Link
                        href={{
                            pathname: `/project/${ProjectId}/sprint/${sprint_id}`,
                            query: {
                                project_id: ProjectId,      
                                sprint_id: Number(sprint_id),
                                sprint_title: currentSprint?.sprint_title,
                                sprint_start: currentSprint?.startDt,
                                sprint_end: currentSprint?.dueDt,
                                sprint_goal: currentSprint?.goal,
                                sprint_progress: currentSprint?.progress
                            }
                        }}
                        >
                            <P.TaskButton>상세보기</P.TaskButton>
                        </Link>
                        )}
                    </P.ButtonWrapper>
                </P.SprintBox>
                </>
                )}
            
                {/* 오른쪽 화살표 */}
                {canShowNextArrow && !showCreateSprintBox && (
                    <div style={{ position: 'absolute', right: '-100px', top: '300px', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleNextSprint}>
                        <AiOutlineRight size={80} color="#796AD9" />
                    </div>
                )}
            </P.BoxContainer>
                
            {processedSprintData.length > 0 && (
            <div style={{ width: '750px', textAlign: 'left', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '10px' }}>
                    <span style= {{ fontSize: '28px', marginLeft: '20px'}}>팀 미팅</span>
                </h2>
                <div onClick={openMeetingModalForCreate} style={{ cursor: "pointer", position: 'absolute', top: '20px', right: '5px' }}>
                    {projectUser && projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && (
                    <Image
                        src="/img/edit.png" 
                        alt="icon"
                        width={20}  
                        height={20}
                        priority  
                    />
                    )}
                </div>
                {/* 미팅 modal */}
                <MeetingModal 
                    isOpen={isMeetingModalOpen} 
                    onClose={() => setIsMeetingModalOpen(false)}
                    meetingTitle={meetingTitle}
                    setMeetingTitle={setMeetingTitle}
                    meetingDate={meetingDate}
                    setMeetingDate={setMeetingDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    sprintTitle={currentSprint?.sprint_title}
                    isEditing={!!selectedMeeting} 
                />
                
                <Divider1/>
                <P.MeetingContainer>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                    {currentSprint?.sprint_start && currentSprint?.sprint_end && (
                    <SprintCalendar 
                        sprintStart={currentSprint?.sprint_start} 
                        sprintEnd={currentSprint?.sprint_end}
                        meetingData={
                            (meetingData[currentSprint?.sprint_title]?.content || []).map(meeting => {
                            const [date, startTime] = meeting.meetingStart.split("T");
                            const [, endTime] = meeting.meetingEnd.split("T");
                        
                            return {
                                sprint_title: Number(currentSprint?.sprint_title),
                                title: meeting.meetingTitle,
                                date: date,
                                startTime: startTime.slice(0, 5),
                                endTime: endTime.slice(0, 5),
                                toDoStatus: "STATUS_COMPLETED", // 기본값
                            };
                            })
                        }
                        onMeetingClick={(meeting) => {
                            {/*if (projectUserData.data?.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED") {*/}
                                openMeetingModalForEdit(meeting);
                            {/*}}*/}
                        }}
                    />
                    )}
                </P.MeetingContainer>
            </div>
            )}
        </ContentContainer>
        {isProjectEditModalOpen && projectData && (
            <ProjectModal
                onClose={() => setIsProjectEditModalOpen(false)}
                isEditing={true}
                projectId={projectData.projectId}
                currentTitle={projectData.projectTitle}
                currentDescription={projectData.projectDescription}
                currentStartDate={projectData.startDt}
                currentDueDate={projectData.dueDt}
                onProjectCreated={getProjectData}
            />
        )}
        </>
    );
}
