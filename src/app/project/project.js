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
import ProjectModal from "../team/project_modal";

import Image from "next/image";

    const colorPalette = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#C9CBCF", "#8D44AD",
        "#27AE60", "#D35400"
    ];

    const userData = {
        "success": true,
        "status": 200,
        "data": {
            "memberId": 4,
            "nickname": "최현태",
            "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            "status": "NORMAL",
            "role": "USER"
        },
        "timestamp": "2025-02-11T17:08:20.340403"
    }

    const teamData = 
    {
        "success": true,
        "status": 200,
        "data": {
            "teamId": 1,
            "teamName": "Side Effect",
            "teamDescription": "Lg CNS AM Inspire Camp 1기 스터디그룹 2조",
            "teamEmoji": "🍇"
        },
        "timestamp": "2025-02-10T14:18:46.135007"
    }


    const projectData = 
    {
        "success": true,
        "status": 200,
        "data": 
            {
                "projectId": 1,
                "projectTitle": "Devfit-",
                "projectDescription": "LG CNS AM Inspire Camp 사이드 프로젝트gg",
                "projectGoal": "개발자 건강을 위한 협업 툴 개발",
                "startDt": "2024-01-01",
                "dueDt": "2026-01-01"
            },
        "timestamp": "2025-02-06T09:56:45.150727"
    }

    const projectMemberData = 
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
                "projectParticipantId": 1,
                "projectNickname": "정선우",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
                "role": "ADMIN"
            },
            {
                "projectParticipantId": 2,
                "projectNickname": "조수빈",
                "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
                "role": "MEMBER"
            },
            {
                "projectParticipantId": 3,
                "projectNickname": "UNKNOWN_PROJECT_NICKNAME",
                "profileImageUrl": "UNKNOWN_PROJECT_PROFILE_URL",
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
    }

    const sprintData = [
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "id": 1,
            "title": "1",
            "goal": "MVP 개발",
            "startDt": "2025-02-01",
            "dueDt": "2025-03-01",
            "status": "NOT_STARTED",
            "progress": 20.0
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 1,
            "sort": [],
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "first": true,
        "last": false,
        "size": 1,
        "number": 0,
        "sort": [],
        "numberOfElements": 1,
        "empty": false
        },
        "timestamp": "2025-03-06T22:22:06.395628"
    },
    {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "id": 2,
            "title": "2",
            "goal": "MVP2 개발",
            "startDt": "2025-03-01",
            "dueDt": "2025-03-21",
            "status": "NOT_STARTED",
            "progress": 50.0
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 1,
            "sort": [],
            "offset": 0,
            "unpaged": false,
            "paged": true
        },
        "first": true,
        "last": true,
        "size": 1,
        "number": 0,
        "sort": [],
        "numberOfElements": 1,
        "empty": false
        },
        "timestamp": "2025-03-06T22:23:36.017048"
    }
]

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

const taskData = {
    1: {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "taskId": 1,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 2,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "COMPELTED",
            "assignedStatus": "COMPELTED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 3,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 4,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 5,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 6,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
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

    2: {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "taskId": 1,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "COMPELTED",
            "assignedStatus": "COMPELTED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 2,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 3,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "MID",
            "dueDt": null,
            "taskStatus": "COMPELTED",
            "assignedStatus": "COMPELTED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 4,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 5,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
            },
            {
            "taskId": 6,
            "description": "피그마 화면 설계 수정",
            "taskDifficulty": "HIGH",
            "dueDt": null,
            "taskStatus": "NOT_STARTED",
            "assignedStatus": "NOT_ASSIGNED",
            "sosStatus": "NOT_SOS",
            "memberId": null,
            "projectNickname": null,
            "profileImageUrl": null
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
    }
}


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


export default function Project() {
    const [isClient, setIsClient] = useState(false);
    const [chartSize, setChartSize] = useState(300); // chart의 기본값 설정
    const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
    const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
    const [goal, setGoal] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(projectData.data.projectName);
    const [description, setDescription] = useState(projectData.data.projectDescription);

    const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);

    const project = projectData.data; 
    const project_id = project.projectId; 

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


    // sprint 수정 모달 열기/닫기 함수
    const handleSprintModal = () => setIsSprintModalOpen(prev => !prev);

    // sprint 생성 모달
    const handleCreateSprintModal = () => {
        setIsCreateSprintModalOpen(true);
        setGoal("");    

        if (sprintData.length === 0) {
            // Sprint 생성이면 오늘 날짜
            const today = new Date().toISOString().split("T")[0];
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


    const mergeProjectMembersWithContributions = (projectMembers, contributionData) => {
        return projectMembers.map((member, index) => {
            const contribution = contributionData.find(
                c => c.memberId === member.projectParticipantId
            );
    
            const score = contribution?.score ?? 0;
            const nickname = member.projectNickname === "UNKNOWN_PROJECT_NICKNAME" ? "알수없음" : member.projectNickname;
            const profileImage = member.profileImageUrl === "UNKNOWN_PROJECT_PROFILE_URL" ? "/img/default_profile.png" : member.profileImageUrl;
    
            return {
                id: member.projectParticipantId,
                name: nickname,
                profileImage: profileImage,
                value: score,
                color: colorPalette[index % colorPalette.length],
            };
        }).sort((a, b) => b.value - a.value).map((member, _, array) => ({
            ...member,
            isTop: member.value > 0 && member.value === array[0].value
        }));
    };

    // 색상 적용된 Sprint 데이터
    const sprintDataWithColors = sprintData.map((sprintObj, idx) => {
        const sprintContent = sprintObj.data.content[0]; 
        if (!sprintContent) return null; 

        const sprintContributionsForSprint = sprintContributionData.find(item =>
            item.data?.[0]?.sprintId === sprintContent.id
        )?.data ?? [];
    
        return {
            sprint_id: sprintContent.id,
            sprint_num: sprintContent.title,
            goal: sprintContent.goal,
            sprint_start: sprintContent.startDt,
            sprint_end: sprintContent.dueDt,
            progress: sprintContent.progress ?? 0,
            last: sprintObj.data.last,
            title: sprintContent.title,
            startDt: sprintContent.startDt,
            dueDt: sprintContent.dueDt,
            member: mergeProjectMembersWithContributions(
                projectMemberData.data.content,
                sprintContributionsForSprint
            ),
        };
    }).filter(Boolean); 


    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const currentSprint = sprintDataWithColors[currentSprintIndex]; 

    const sprint = sprintData.find(s => s.sprint_num === currentSprint.sprint_num);
    const sprint_id = sprint ? sprint.sprint_id : "default_sprint";

    const [showCreateSprintBox, setShowCreateSprintBox] = useState(false); // Sprint 생성 박스 표시 여부
    
    const [canShowNextArrow, setCanShowNextArrow] = useState(false);

    const getTaskDataBySprintId = (sprintId) => {
        const task = taskData[sprintId];
        if (!task || !task.data || !task.data.content) return [];

        return task.data.content.map(item => ({
            task: item.description,
            toDoStatus: item.taskStatus
        }));
    };

    const currentSprintTasks = getTaskDataBySprintId(currentSprint.sprint_id);


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
    const sprintsWithFeedback = sprintData.filter(sprint => sprint.sprint_end === today);

    useEffect(() => {
        if (currentSprint.last) {
            const isAfterLastSprint = new Date(today) > new Date(currentSprint.sprint_end);
            setCanShowNextArrow(isAfterLastSprint);
        } else {
            setCanShowNextArrow(true);
        }
    }, [currentSprint]);

    const lastSprint = sprintDataWithColors[sprintDataWithColors.length - 1];

    const lastSprintNum = lastSprint ? parseInt(lastSprint.sprint_num, 10) || 0 : 0; 

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
        if (isSprintModalOpen && !isCreateSprintModalOpen && currentSprint) {
            setGoal(currentSprint.goal);
            setStartDate(currentSprint.sprint_start);
            setDueDate(currentSprint.sprint_end);
        }
    }, [isSprintModalOpen, isCreateSprintModalOpen, currentSprint]);

    // Sprint 새로 만들 때는 오늘 날짜로
    useEffect(() => {
        if (isCreateSprintModalOpen) {
            const today = new Date().toISOString().split("T")[0];
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
                    <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px', marginTop: '10px' }}>{teamData.data.teamName} </span> 
                        <span style={{ height: "40px", lineHeight: "40px" }}>{projectData.data.projectTitle}</span>
                    </div>
                    <Image
                        src="/img/edit.png"
                        alt="Edit"
                        width={20}
                        height={20}
                        onClick={() => setIsProjectEditModalOpen(true)} 
                        style={{ cursor: "pointer" }}
                    />
                </h2>
                <Divider1/>
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
            </div>

            {sprintsWithFeedback.length > 0 && sprintsWithFeedback.map((sprint) => (
            <P.AlertBox key={sprint.id}>
                <div>
                    <P.AlertIcon>🔔</P.AlertIcon> 
                    <span>Sprint {sprint.sprint_num} 동료평가를 잊지 마세요!</span>
                </div>
            </P.AlertBox>
            ))}

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
                        {member.id !== userData.data.memberId && member.name !== "알수없음" && (
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
                                <span style={{ fontSize: '23px', marginLeft: '20px' }}>Sprint {currentSprint.title}</span>
                                <span style={{ fontSize: '12px', marginLeft: '15px' }}>
                                    {currentSprint.startDt} ~ {currentSprint.dueDt}
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
                                sprint={currentSprint.title}
                                goal={currentSprint.goal}
                                setGoal={setGoal}
                                startDate={currentSprint.startDt}
                                setStartDate={setStartDate}  
                                dueDate={currentSprint.dueDt}
                                setDueDate={setDueDate}  
                                isLastSprint={currentSprint.last} 
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
                        {currentSprintTasks?.map((item, index) => (
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
                            dueDate={dueDate}
                            setDueDate={setDueDate}  
                            isLastSprint={true} 
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
                        meetingData={
                            (meetingData[currentSprint.sprint_num]?.content || []).map(meeting => {
                            const [date, startTime] = meeting.meetingStart.split("T");
                            const [, endTime] = meeting.meetingEnd.split("T");
                        
                            return {
                                sprint_num: Number(currentSprint.sprint_num),
                                title: meeting.meetingTitle,
                                date: date,
                                startTime: startTime.slice(0, 5),
                                endTime: endTime.slice(0, 5),
                                toDoStatus: "STATUS_COMPLETED", // 기본값
                            };
                            })
                        }
                        onMeetingClick={openMeetingModalForEdit}
                    />
                </P.MeetingContainer>
            </div>
            )}
        </ContentContainer>
        {isProjectEditModalOpen && (
            <ProjectModal
                onClose={() => setIsProjectEditModalOpen(false)}
                isEditing={true}
                currentTitle={projectData.data.projectTitle}
                currentDescription={projectData.data.projectDescription}
                currentStartDate={projectData.data.startDt}
                currentDueDate={projectData.data.dueDt}
            />
        )}
        </>
    );
}
