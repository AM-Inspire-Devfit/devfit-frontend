"use client";  

import { useState, useEffect } from "react";
import Link from "next/link";

import { PieChart, Pie, Cell } from "recharts";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SprintCalendar from "./sprint_calendar"; 

import { ContentContainer, Divider1 } from '../../components/common_s';

import * as P from './project_s';

import SprintModal from "./sprint_modal"; 
import MeetingModal from "./meeting_modal";


import Image from "next/image";

const colorPalette = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#C9CBCF", "#8D44AD",
    "#27AE60", "#D35400"
];

const userData = [
    {   
        id: 4,
        name: "채민주",
        profileImage: "/img/profile.png", 
    }
]

const projectData = [  
    {   
        project_id: 1,
        teamName: "SideEffect",
        projectName: "devFit",
        projectDescription: "개발자들의 성공적인 협업을 돕는 웹서비스",
    }
]

const sprintData = [
    {
        sprint_id: 1,
        sprint_num: 1,
        goal: "UI 디자인을 완료하고 핵심 기능 단위를 정리합니다.",
        sprint_start: "2025-01-20",
        sprint_end: "2025-02-19",
        progress: 70,
        member: [
            {
                id: 1,
                name: "최현태",
                value: 30,
                profileImage: "/img/profile2.png" 
            },
            {
                id: 2,
                name: "조수빈",
                value: 25,
                profileImage: "/img/profile.png" 
            },
            {
                id: 3,
                name: "정선우",
                value: 20,
                profileImage: "/img/profile.png" 
            },
            {
                id: 4,
                name: "채민주",
                value: 20,
                profileImage: "/img/profile.png" 
            },
            
        ],
        taskData : [
            { 
                task: "API 명세서 작성",
                toDoStatus: "COMPELTED"
            },
            { 
                task: "피그마 UI 디자인 완료",
                toDoStatus: "NOT_STARTED"
            },
            { 
                task: "백/프론트 깃레포 생성",
                toDoStatus: "COMPELTED"
            },
            { 
                task: "회의록 작성",
                toDoStatus: "NOT_STARTED"
            },
            { 
                task: "로고 디자인",
                toDoStatus: "NOT_STARTED"
            },
            { 
                task: "API 명세서 작성",
                toDoStatus: "COMPELTED"
            },
        ],
        last: false
    },
    {
        sprint_id: 2,
        sprint_num: 2,
        goal: "리액트 프로젝트를 생성합니다.",
        sprint_start: "2025-02-20",
        sprint_end: "2025-03-20",
        progress: 30,
        member: [
            {
                id: 1,
                name: "최현태",
                value: 5,
                profileImage: "/img/profile2.png" 
            },
            {
                id: 2,
                name: "조수빈",
                value: 15,
                profileImage: "/img/profile.png" 
            },
            {
                id: 3,
                name: "정선우",
                value: 35,
                profileImage: "/img/profile.png" 
            },
            {
                id: 4,
                name: "채민주",
                value: 10,
                profileImage: "/img/profile.png" 
            },
            {
                id: 5,
                name: "김팀원",
                value: 20,
                profileImage: "/img/profile.png" 
            },
            {
                id: 6,
                name: "이팀원",
                value: 10,
                profileImage: "/img/profile.png" 
            }
        ],
        taskData : [
            { 
                task: "API 명세서 작성",
                toDoStatus: "COMPELTED"
            },
            { 
                task: "피그마 UI 디자인 완료",
                toDoStatus: "NOT_STARTED"
            },
        ],
        last: true
    },
];

const meetingData = [
    {   sprint_num: 1,
        title: "아이디어 회의",
        date: "2025-02-19",
        startTime: "14:30:00",
        endTime: "16:00:00",
        toDoStatus: "STATUS_COMPLETED"
    },
    {   sprint_num: 2,
        title: "아이디어 2차 회의",
        date: "2025-02-20",
        startTime: "18:30:00",
        endTime: "20:00:00",
        toDoStatus: "STATUS_COMPLETED"
    },
    {   sprint_num: 2,
        title: "백엔드 회의",
        date: "2025-02-23",
        startTime: "14:00:00",
        endTime: "16:00:00",
        toDoStatus: "STATUS_COMPLETED"
    },
    {   sprint_num: 2,
        title: "프론트 회의",
        date: "2025-02-28",
        startTime: "14:00:00",
        endTime: "16:00:00",
        toDoStatus: "STATUS_COMPLETED"
    },
    {   sprint_num: 2,
        title: "프론트 회의",
        date: "2025-03-17",
        startTime: "14:00:00",
        endTime: "16:00:00",
        toDoStatus: "STATUS_COMPLETED"
    }

]


export default function Project() {
    const [isClient, setIsClient] = useState(false);
    const [chartSize, setChartSize] = useState(300); // chart의 기본값 설정
    const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
    const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
    const [goal, setGoal] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(projectData[0].projectName);
    const [description, setDescription] = useState(projectData[0].projectDescription);

    const project = projectData[0]; 
    const project_id = project.project_id; 

    //meeting
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
        setIsClient(true); // 클라이언트에서만 true
    }, []);

    // 수정 버튼 클릭 시 편집 모드 전환
    const handleEditClick = () => {
        setIsEditing((prev) => !prev);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    // sprint 수정 모달 열기/닫기 함수
    const handleSprintModal = () => setIsSprintModalOpen(prev => !prev);

    // sprint 생성 모달
    const handleCreateSprintModal = () => {
        setIsCreateSprintModalOpen(true);
        setGoal("");        
        setStartDate("");   
        setEndDate("");     
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
    
        if (isSprintModalOpen || isCreateSprintModalOpen || isMeetingModalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return enableScroll;
    }, [isSprintModalOpen, isCreateSprintModalOpen, isMeetingModalOpen]);


    // 멤버별 색상 배정 & value 기준 정렬
    const assignColorsToSprint = (sprints) => {
        return sprints.map(sprint => {
            // 먼저 색상을 배정
            const membersWithColors = sprint.member.map((member, index) => ({
                ...member,
                color: colorPalette[index % colorPalette.length] 
            }));
    
            // value 기준으로 내림차순 정렬
            const sortedMembers = [...membersWithColors].sort((a, b) => b.value - a.value);
    
            // 최고 기여도 멤버의 value 값 저장
            const highestValue = sortedMembers[0]?.value;
    
            return {
                ...sprint,
                member: sortedMembers.map(member => ({
                    ...member,
                    isTop: highestValue > 0 && member.value === highestValue // 최고 기여자에게 🥇 배지 추가
                }))
            };
        });
    };

    // 색상 적용된 Sprint 데이터
    const sprintDataWithColors = assignColorsToSprint(sprintData);


    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const currentSprint = sprintDataWithColors[currentSprintIndex]; 

    const sprint = sprintData.find(s => s.sprint_num === currentSprint.sprint_num);
    const sprint_id = sprint ? sprint.sprint_id : "default_sprint";

    const [showCreateSprintBox, setShowCreateSprintBox] = useState(false); // Sprint 생성 박스 표시 여부
    
    const [canShowNextArrow, setCanShowNextArrow] = useState(false);

    const handleNextSprint = () => {
        if (currentSprint.last) {
            setShowCreateSprintBox(true); // 마지막 Sprint에서 클릭하면 생성 상자 표시
        } else {
            setCurrentSprintIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevSprint = () => {
        if (showCreateSprintBox) {
            setShowCreateSprintBox(false); // Sprint 생성 화면에서 이전 Sprint로 돌아가기
            setCurrentSprintIndex(sprintDataWithColors.length - 1); // 마지막 Sprint로 이동
        } else if (currentSprintIndex > 0) {
            setCurrentSprintIndex(prevIndex => prevIndex - 1); // 이전 Sprint로 이동
        }
    };

    const today = new Date().toISOString().split('T')[0];
    const isFeedbackDay = today === currentSprint.sprint_end;

    useEffect(() => {
        if (currentSprint.last) {
            const isAfterLastSprint = new Date(today) > new Date(currentSprint.sprint_end);
            setCanShowNextArrow(isAfterLastSprint);
        } else {
            setCanShowNextArrow(true);
        }
    }, [currentSprint]);

    const lastSprintNum = sprintData[sprintData.length - 1].sprint_num; 

    useEffect(() => {
        const sprintIndex = sprintDataWithColors.findIndex(sprint =>
            sprint.sprint_start <= today && sprint.sprint_end >= today
        );
    
        if (sprintIndex !== -1) {
            setCurrentSprintIndex(sprintIndex);
        } else {
            const upcomingSprintIndex = sprintDataWithColors.findIndex(sprint => sprint.sprint_start > today);
            if (upcomingSprintIndex !== -1) {
                setCurrentSprintIndex(upcomingSprintIndex);
            } else {
                setCurrentSprintIndex(sprintDataWithColors.length - 1);
            }
        }
    }, []);

    useEffect(() => {
        if (!isSprintModalOpen || !currentSprint) return;
    
        setGoal(currentSprint.goal);
        setStartDate(currentSprint.sprint_start);
        setEndDate(currentSprint.sprint_end);
    }, [isSprintModalOpen, currentSprint]);

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
        <ContentContainer>
            {projectData.map((project, index) => (
            <div key={`project-${index}`} style={{ width: '750px', textAlign: 'left' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '10px', display: "flex", alignItems: "center", justifyContent: "space-between", height: "40px" }}>
                    <div style={{ display: "flex", alignItems: "left" }}>
                    <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px', marginTop: '10px' }}>{project.teamName} </span> 
                    {isEditing ? (
                        <P.StyledInput
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            style={{
                                height: "40px",
                                fontSize: "32px", 
                                fontWeight: "bold",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                width: "auto",
                                padding: "0",
                                lineHeight: "40px"
                            }}
                        />
                    ) : (
                        <span style={{ height: "40px", lineHeight: "40px" }}>{title}</span>
                    )}
                    </div>
                    <Image
                        src="/img/edit.png"
                        alt="Edit"
                        width={20}
                        height={20}
                        onClick={handleEditClick}
                        style={{ cursor: "pointer" }}
                    />
                </h2>
                <Divider1/>
                {isEditing ? (
                    <P.StyledInput
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ 
                            height: "30px",
                            fontSize: "15px", 
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            width: "100%",
                            padding: "0",
                            lineHeight: "30px", 
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px"
                        }}
                    />
                ) : (
                    <p 
                        style={{ 
                            fontSize: "15px", 
                            color: "#4F3DBD", 
                            height: "30px", 
                            lineHeight: "30px", 
                            padding: "0", 
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px"
                        }}>
                        {description}
                    </p>
                )}
            </div>
            ))}

            {isFeedbackDay && (
            <P.AlertBox>
                <div>
                    <P.AlertIcon>🔔</P.AlertIcon> 
                    <span>Sprint {currentSprint.sprint_num} 동료평가를 잊지 마세요!</span>
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

            {!showCreateSprintBox ? (
                    <>
                <P.ChartWrapper>
                    <P.ChartTitle>Sprint {currentSprint.sprint_num}</P.ChartTitle>

                    {/* 팀원 리스트 */}
                    <P.ScrollableMemberList>
                        {currentSprint.member.map((member, index) => (
                            <P.ProjectMember key={`${member.id}-${index}`}> 
                                <P.ProfileContainer>
                                    <P.ProfileMain $profileImage={member.profileImage} />
                                    <P.ProfileIcon color={member.color} />
                                </P.ProfileContainer>
                                <span style={{ marginLeft: '10px' }}>{member.name}</span>
                                <P.TopBadge style={{ visibility: member.isTop ? 'visible' : 'hidden' }}>🥇</P.TopBadge>
                                {member.id !== userData[0].id && ( // 본인 제외
                                    <Link 
                                        href={`/project/${project_id}/message?name=${encodeURIComponent(member.name)}&profileImage=${encodeURIComponent(member.profileImage)}`}>
                                        <P.FeedbackButton hidden={!isFeedbackDay}>
                                            동료 평가
                                        </P.FeedbackButton>
                                    </Link>
                                )}
                            </P.ProjectMember>
                        ))}
                    </P.ScrollableMemberList>

                    {/* 기여도 차트 */}
                    <P.DonutChartContainer>
                        {isClient && (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={currentSprint.member}
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius="65%" 
                                outerRadius="90%" 
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                {currentSprint.member.map((entry, index) => (
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
                                <span style={{ fontSize: '23px', marginLeft: '20px' }}>Sprint {currentSprint.sprint_num}</span>
                                <span style={{ fontSize: '12px', marginLeft: '15px' }}>
                                    {currentSprint.sprint_start} ~ {currentSprint.sprint_end}
                                </span>
                            </h2>
                            <div onClick={handleSprintModal} style={{ cursor: "pointer", position: 'absolute', top: '15px', right: '0px' }}>
                                <Image
                                    src="/img/edit.png" 
                                    alt="icon"
                                    width={20}  
                                    height={20}
                                    priority  
                                />
                            </div>
                            <SprintModal 
                                isOpen={isSprintModalOpen}
                                onClose={handleSprintModal}
                                sprint={currentSprint.sprint_num}
                                goal={goal}
                                setGoal={setGoal}
                                startDate={startDate}
                                setStartDate={setStartDate}  
                                endDate={endDate}
                                setEndDate={setEndDate}  
                            />
                        </div>
                        <Divider1 />
                        <p style={{ fontSize: '14px', fontWeight: 400, color: '#4F3DBD', marginTop: '10px', marginLeft: '20px', marginBottom: '25px' }}>
                            {currentSprint.goal}
                        </p>
                    </div>

                <P.ProgressContainer>
                    <P.ProgressLabels>
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </P.ProgressLabels>
                    <P.ProgressBarWrapper>
                        <P.ProgressBar progress={currentSprint.progress} /> 
                    </P.ProgressBarWrapper>
                </P.ProgressContainer>
                
                <P.SprintBox>
                    Task
                    <P.TaskGrid>
                        {currentSprint.taskData.map((item, index) => (
                            <P.TaskItem key={`task-${index}`}> 
                                <P.TaskCheckbox
                                    checked={item.toDoStatus === "COMPELTED"} readOnly
                                />
                                {item.task}
                            </P.TaskItem>
                        ))}
                    </P.TaskGrid>
                    <P.ButtonWrapper>
                        <Link href={`/project/${project_id}/sprint/${sprint_id}`}>
                            <P.TaskButton>상세보기</P.TaskButton>
                        </Link>
                    </P.ButtonWrapper>
                </P.SprintBox>
                </>
                ) : (
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
                            sprint={lastSprintNum + 1} 
                            goal={goal}
                            setGoal={setGoal}
                            startDate={startDate}
                            setStartDate={setStartDate}  
                            endDate={endDate}
                            setEndDate={setEndDate}  
                        />
                    </div>
                )}
            
                {/* 오른쪽 화살표 */}
                {canShowNextArrow && !showCreateSprintBox && (
                    <div style={{ position: 'absolute', right: '-100px', top: '300px', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={handleNextSprint}>
                        <AiOutlineRight size={80} color="#796AD9" />
                    </div>
                )}
            </P.BoxContainer>

            {!showCreateSprintBox && (
            <div style={{ width: '750px', textAlign: 'left', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '10px' }}>
                    <span style= {{ fontSize: '28px', marginLeft: '20px'}}>팀 미팅</span>
                </h2>
                <div onClick={openMeetingModalForCreate} style={{ cursor: "pointer", position: 'absolute', top: '20px', right: '5px' }}>
                    <Image
                        src="/img/edit.png" 
                        alt="icon"
                        width={20}  
                        height={20}
                        priority  
                    />
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
                    sprintNum={currentSprint.sprint_num}
                    isEditing={!!selectedMeeting} 
                />
                
                <Divider1/>
                <P.MeetingContainer>
                    <SprintCalendar 
                        sprintStart={currentSprint.sprint_start} 
                        sprintEnd={currentSprint.sprint_end}
                        meetingData={meetingData.filter(meet => meet.sprint_num === currentSprint.sprint_num)}
                        onMeetingClick={openMeetingModalForEdit}
                    />
                </P.MeetingContainer>
            </div>
            )}
            
        </ContentContainer>
    );
}
