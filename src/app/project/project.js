"use client";  

import { useState, useEffect, useMemo, useRef } from "react";

import Link from "next/link";

import { PieChart, Pie, Cell } from "recharts";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import SprintCalendar from "./sprint_calendar"; 

import { ContentContainer, Divider1 } from '../../components/common_s';

import * as P from './project_s';

import SprintModal from "./sprint_modal"; 
import MeetingModal from "./meeting_modal";
import ProjectModal from "../team/project_modal";

import { fetchProjectData, fetchProjectUser, fetchProjectMemberList, fetchSprintContributions } from "@/app/api/project/projectApi";
import { fetchSprintTaskData, fetchSprintParticipantsFeedback } from "@/app/api/sprint/sprintApi";

import Image from "next/image";

import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

    const colorData = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
        "#9966FF", "#FF9F40", "#C9CBCF", "#8D44AD",
        "#27AE60", "#D35400"
    ];

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

    const [pendingPrependCount, setPendingPrependCount] = useState(null);

    const [hasPrev, setHasPrev] = useState(false); // 이전 스프린트 존재 여부
    const [hasNext, setHasNext] = useState(false); // 다음 스프린트 존재 여부

    // 스프린트별 기여도 랭킹 조회
    const [sprintContributions, setSprintContributions] = useState({});

    // 동료평가 상태
    const [feedbackStatusMap, setFeedbackStatusMap] = useState({});

    //meeting
    const [hasMoreMeetings, setHasMoreMeetings] = useState(false);
    const [lastMeetingtId, setLastMeetingId] = useState(null); 
    const [meetingList, setMeetingList] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [selectedMeetingId, setSelectedMeetingId] = useState(null);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const today = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];

    const checkSprintDue = (dueDate, includeNextDay = false) => {
        if (!dueDate) return false;

        const endDate = new Date(dueDate);
        if (includeNextDay) {
            endDate.setDate(endDate.getDate() + 1);
        }
        const sprintEndDate = new Date(endDate.getTime() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];

        return today >= sprintEndDate;
    };

    const ProjectId = Number(projectId);

    const isExternalUser = useMemo(() => {
        return projectUser?.errorClassName === "PROJECT_PARTICIPATION_REQUIRED";
    }, [projectUser]);

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
            console.log("fetched projectUser", user);
            setProjectUser(user);
        } catch (error) {
            console.log("fetchProjectUser error", error);

        if (error.message === "해당 프로젝트 참여자가 아닙니다.") {
            setProjectUser({ errorClassName: "PROJECT_PARTICIPATION_REQUIRED" });
            }
        }
    };

    useEffect(() => {
        if (projectId) {
            getProjectData(); 
        }
    }, [projectId]);


    const getSprintTaskData = async (baseSprintId = null, direction = "NEXT", checkOnly = false) => {
        try {
            const response = await fetchSprintTaskData(projectId, baseSprintId, direction);
    
            if (checkOnly) return response;
    
            if (direction === "PREV") {
                const updated = [...response.content, ...sprintData];
    
                const uniqueMap = new Map();
                updated.forEach(s => {
                    uniqueMap.set(String(s.id), s); // id를 key로 해서 중복 제거
                });
    
                const unique = Array.from(uniqueMap.values());
                setSprintData(unique);
                setHasPrev(!response.last);
            }
    
            setHasNext(!response.last);
    
            const newLastId = response.content.length > 0
                ? response.content[response.content.length - 1].id
                : null;
            setLastSprintId(newLastId);
            setSprintLast(response.last);
    
            const isNextArrowVisible = checkSprintDue(response.content[0]?.dueDt);
            setCanShowNextArrow(isNextArrowVisible);

            return response;
        } catch (error) {
            showAlert("error", error.message);
        }
    };

    useEffect(() => {
    }, [isExternalUser, sprintData]);
    
    const loadInitialSprints = async () => {
        const response = await fetchSprintTaskData(projectId, null, "PREV");
        console.log("fetch 성공:", response);

        if (!response) {
            console.warn("스프린트 데이터 fetch 실패");
            setSprintData([]);
            setShowCreateSprintBox(false);
            return;
        }

        if (response.success === false && isExternalUser) {
            setShowCreateSprintBox(false);  
            setSprintData([]);  
            return;  
        }

        if (!response || !response.content?.length) return;
        
        // 첫 번째 스프린트
        setSprintData([response.content[0]]);
        setCurrentSprintIndex(0);
        setLastSprintId(response.content[0]?.id || null);

        setHasPrev(!response.last);
        setSprintLast(response.last || response.content.length === 1);
        setHasNext(false); // NEXT는 처음에 무조건 false로 시작

        const isNextArrowVisible = checkSprintDue(response.content[0]?.dueDt);
        setCanShowNextArrow(isNextArrowVisible);
    };

    useEffect(() => {
        if (projectId && !sprintData.length) {
            loadInitialSprints();
        }
    }, [projectId, sprintData, isExternalUser]);
    
    useEffect(() => {
        if (isExternalUser && !sprintData.length) {
            loadInitialSprints();  // isExternalUser와 sprintData가 초기화되었을 때만 호출
        }
    }, [isExternalUser, sprintData]); // isExternalUser와 sprintData 변경 시

    // <-------------------스프린트 모달--------------------------->
    // <-------------------스프린트 모달--------------------------->

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

    const mergeProjectMembersWithContributions = (projectMembers, contributionData) => {
        return projectMembers.map((member, index) => {
            const contribution = contributionData.find(
                c => c.projectParticipantId === member.projectParticipantId
            );
    
            const score = contribution?.score ?? 0;
            const nickname = (!member.nickname || member.nickname === "UNKNOWN_PROJECT_NICKNAME" || member.status === "INACTIVE") 
                ? "알수없음" 
                : member.nickname;
            const profileImage = (!member.profileImageUrl || member.profileImageUrl === "UNKNOWN_PROJECT_PROFILE_URL" || member.status === "INACTIVE") 
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
        
        return sprintData.map((sprintContent, idx) => {
            if (!sprintContent) return null;
        
            const contributions = sprintContributions[sprintContent.id] ?? [];
        
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
            member: mergeProjectMembersWithContributions(projectMembers, contributions),
            };
        }).filter(Boolean);
    }, [sprintData, projectMembers, sprintContributions]);

    const [currentSprintIndex, setCurrentSprintIndex] = useState(0);
    const currentSprint = processedSprintData[currentSprintIndex]; 

    const sprint = processedSprintData.find(s => s.sprint_title === currentSprint?.sprint_title);
    const sprint_id = sprint ? sprint.sprint_id : "default_sprint";

    const [showCreateSprintBox, setShowCreateSprintBox] = useState(null);; // Sprint 생성 박스 표시 여부
    
    const [canShowNextArrow, setCanShowNextArrow] = useState(false);

    // <----------------프로젝트 멤버별 기여도 --------------------->

    useEffect(() => {
        const loadContributions = async () => {
            if (!currentSprint?.sprint_id) return;
        
            try {
            const contributions = await fetchSprintContributions(currentSprint.sprint_id);

            console.log("기여도 전체 응답:", contributions);

            setSprintContributions(prev => ({
                ...prev,
                [currentSprint.sprint_id]: contributions
            }));
            } catch (error) {
            showAlert("error", error.message);
            }
        };
        
        loadContributions();
    }, [currentSprint?.sprint_id]);

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

    const handleNextSprint = async () => {
        console.log("오른쪽 화살표 클릭됨");

        if (currentSprint?.last) {
            if (!sprintLast) {
                await getSprintTaskData(currentSprint.sprint_id, "NEXT"); // 다음 스프린트 불러오기
            } else {
                setShowCreateSprintBox(true); // 스프린트 기간이 끝났을 때 생성 상자 표시
            }
        } else {
            setCurrentSprintIndex((prev) => prev + 1);
        }
    };
    
    const handlePrevSprint = async () => {
        console.log("왼쪽 화살표 클릭됨");
    
        if (showCreateSprintBox) {
            setShowCreateSprintBox(false);
            setCurrentSprintIndex(processedSprintData.length - 1);
            return;
        }
    
        if (currentSprintIndex === 0 && hasPrev) {
            console.log("이전 스프린트 fetch 시작");
    
            const response = await getSprintTaskData(currentSprint.sprint_id, "PREV", false);
            console.log("받아온 이전 스프린트 응답:", response);

            // 인덱스 먼저 감소
            setCurrentSprintIndex(prev => prev - 1);
    
            if (response?.content?.length > 0) {
                const newSprints = response.content;
    
                setSprintData(prev => {
                    const merged = [...newSprints, ...prev];
                    const map = new Map();
    
                    merged.forEach(s => {
                        map.set(String(s.id), s); 
                    });
    
                    const unique = Array.from(map.values());
                    console.log("sprintData 업데이트:", unique.map(s => s.title));
                    return unique;
                });
    
                setPendingPrependCount(newSprints.length);

            }
        } else if (currentSprintIndex > 0) {
            console.log("인덱스만 감소");
            setCurrentSprintIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (pendingPrependCount > 0) {
            setCurrentSprintIndex(prev => prev + pendingPrependCount);
            setPendingPrependCount(0); // 다시 초기화
        }
    }, [sprintData]); // sprintData가 업데이트 되었을 때 실행

    useEffect(() => {
        if (currentSprint?.sprint_end) {
            setCanShowNextArrow(checkSprintDue(currentSprint.sprint_end, true));
        }
    }, [currentSprint]);

    useEffect(() => {
        console.log("canShowNextArrow:", canShowNextArrow);
    }, [canShowNextArrow]);

    const isFeedbackDay = currentSprint && currentSprint.sprint_end === today;
    const sprintsWithFeedback = Array.isArray(processedSprintData)
        ? processedSprintData.filter(sprint => sprint.sprint_end === today)
        : [];

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

    useEffect(() => {
        console.log("hasPrev 값 변경됨:", hasPrev);
        console.log("currentSprintIndex 값:", currentSprintIndex);
    }, [hasPrev]);

    if (isExternalUser === null) {
        return null; // 또는 로딩 UI를 보여줄 수도 있음
    }

    useEffect(() => {
        const fetchFeedbackStatuses = async () => {
            if (!currentSprint?.sprint_id) return;
            try {
            const feedbackData = await fetchSprintParticipantsFeedback(ProjectId, currentSprint.sprint_id);
        
            const map = {};
            feedbackData.content.forEach((participant) => {
                map[participant.projectParticipantId] = participant.feedbackStatus;
            });
        
            setFeedbackStatusMap(map);
            } catch (err) {
            showAlert("error", err.message);
            console.log(err.message);
            }
        };
        
        fetchFeedbackStatuses();
    }, [currentSprint?.sprint_id]);


    const fetchMeetingList = async (sprintId, lastId = null) => {
        try {
          const response = await axiosWithAuthorization.get(`/meetings/${sprintId}/list`, {
            params: {
              lastMeetingId: lastId,  // null이면 첫 페이지 조회
              pageSize: 10,
            },
          });
          console.log("미팅 목록 조회 응답:", response.data);
          const data = response.data.data;
          
          // 만약 content에 항목이 있다면, 마지막 미팅의 ID를 저장
          if (data.content && data.content.length > 0 && data.content[0].meetingId !== undefined) {
            const lastItem = data.content[data.content.length - 1];
            setLastMeetingId(lastItem.meetingId);
          }
          
          setHasMoreMeetings(!data.last);  // 더 불러올 페이지가 있는지 확인
          setMeetingList(data.content);    // content 배열만 저장
          return data.content;
        } catch (error) {
            console.log(error);
          return [];
        }
      };
    
      // 현재 스프린트 변경 시 미팅 목록 새로 조회 (초기 페이지)
      useEffect(() => {
        if (currentSprint?.sprint_id) {
          setLastMeetingId(null);
          fetchMeetingList(currentSprint.sprint_id, null).then((data) => {
            setMeetingList(data);
          });
        }
      }, [currentSprint]);
    
      // "더보기" 함수: 추가 페이지 조회 및 기존 목록에 append
      const loadMoreMeetings = async () => {
        if (!currentSprint?.sprint_id || !hasMoreMeetings) return;
        const more = await fetchMeetingList(currentSprint.sprint_id, lastMeetingId);
        setMeetingList((prev) => [...prev, ...more]);
      };
      
    
      const meetingData = meetingList.map((meeting) => {
        const [date, startFull] = meeting.meetingStart.split("T");
        const [, endFull] = meeting.meetingEnd.split("T");
        return {
            id: meeting.meetingId,
            sprint_title: Number(currentSprint?.sprint_title),
            title: meeting.meetingTitle,
            date: date, // "YYYY-MM-DD"
            startTime: startFull.slice(0, 5), // "HH:mm"
            endTime: endFull.slice(0, 5), // "HH:mm"
            toDoStatus: "STATUS_COMPLETED", //기본값
        };
      });
      

    // 신규 미팅 생성
    const openMeetingModalForCreate = () => {
        setSelectedMeeting(null);
        setSelectedMeetingId(null);
        setMeetingTitle("");
        setMeetingDate("");
        setStartTime("");
        setEndTime("");
        setIsMeetingModalOpen(true);
    };
    
    // 기존 미팅 수정
    const openMeetingModalForEdit = (meeting) => {
        setSelectedMeeting(meeting);
        setSelectedMeetingId(meeting.id);
        console.log(meeting.id + "???")
        setMeetingTitle(meeting.title);
        setMeetingDate(meeting.date);
        setStartTime(meeting.startTime);
        setEndTime(meeting.endTime);
        setIsMeetingModalOpen(true);
    };

    const refreshMeetingList = async () => {
        if (currentSprint?.sprint_id) {
          setLastMeetingId(null);
          const data = await fetchMeetingList(currentSprint.sprint_id, null);
          setMeetingList(data);
        }
      };

    // 멤버 이름 4글자 이상이면 축약 표시
    const reduceMemberName = (name) => {
        return name.length > 4 ? name.slice(0, 4) + ".." : name;
    };

    return (
        <>
        <ContentContainer>
            <div style={{ width: '750px', textAlign: 'left' }}>
                <p style={{
                    fontSize: '13px',
                    color: '#fff', 
                    backgroundColor: '#8E7BDF',
                    margin: 0,
                    marginLeft: '20px',
                    fontWeight: 800,
                    padding: '4px 10px', 
                    borderRadius: '6px', 
                    display: 'inline-block', 
                }}>
                    {projectData?.startDt} ~ {projectData?.dueDt}
                </p>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2E1A86', marginTop: '0px', display: "flex", alignItems: "center", justifyContent: "space-between", height: "40px" }}>
                    <div style={{ display: "flex", alignItems: "left" }}>
                    <span style={{ color: '#9377FF', fontSize: '18px', marginLeft: '20px', marginRight: '15px', marginTop: '10px' }}>{projectData?.teamName} </span> 
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
                            lineHeight: "20px", 
                            padding: "0", 
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "25px",
                            marginTop: "20px"
                        }}>
                        {projectDescription || "프로젝트에 대한 설명을 추가하세요!"}
                    </p>
            </div>
            {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
             <--------------------------------------map 함수 부분--------------------------------------> */}
            
            {projectUser && projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && 
currentSprint?.sprint_end === today && isExternalUser === true && (
            <P.AlertBox key={`feedback-${sprint.sprint_title}`}>
                <div>
                    <P.AlertIcon>🔔</P.AlertIcon> 
                    <span>Sprint {sprint.sprint_title} 동료평가를 잊지 마세요!</span>
                </div>
            </P.AlertBox>
            )}

            <P.BoxContainer>
                {/* 왼쪽 화살표 (첫 Sprint가 아닐 때만 표시) */}
                {(
                !(currentSprintIndex === 0 && hasPrev === false) || 
                (currentSprintIndex === 0 && showCreateSprintBox)
            ) && (
                    <div
                        style={{ position: 'absolute', left: '-100px', top: '300px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        onClick={handlePrevSprint}
                    >
                        <AiOutlineLeft size={80} color="#796AD9" />
                    </div>
                )}

                {isExternalUser === true && sprintData.length === 0 ? (
                <div
                    style={{
                        width: '100%',
                        height: '600px',
                        backgroundColor: '#F6F3FF',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '16px',
                        color: '#6C5CE7',
                        fontSize: '20px',
                        fontWeight: '500',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <div style={{ fontSize: '40px', marginBottom: '20px' }}>📭</div>
                    <div>아직 생성된 Sprint가 없습니다</div>
                </div>
                ) : isExternalUser === false && (sprintData.length === 0 || showCreateSprintBox) ? (
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
                    {currentSprint?.member?.map((member, index) => (
                        <P.ProjectMember key={`${member.id}-${index}`}> 
                        <P.ProfileContainer>
                            <P.ProfileMain $profileImage={member.profileImage} />
                            <P.ProfileIcon color={member.color} />
                        </P.ProfileContainer>
                        <span style={{ marginLeft: '10px' }}>{reduceMemberName(member.name)}</span>
                        <P.TopBadge style={{ visibility: member.isTop ? 'visible' : 'hidden' }}>🥇</P.TopBadge>

                        {projectUser &&
                            member.id !== projectUser.projectParticipantId &&
                            member.name !== "알수없음" && (
                            <div style={{ marginLeft: 'auto' }}>
                                <Link
                                    href={{
                                        pathname: `/project/${ProjectId}/message`,
                                        query: {
                                        name: member.name,
                                        profileImage: member.profileImage,
                                        sprintId: currentSprint?.sprint_id,
                                        receiverId: member.id,             
                                        }
                                    }}
                                >
                                {projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED" && (
                                    <P.FeedbackButton 
                                        hidden={!isFeedbackDay}
                                        disabled={feedbackStatusMap[member.id] === "COMPLETED"}
                                    >
                                    동료 평가
                                    </P.FeedbackButton>
                                )}
                                </Link>
                            </div>
                        )}
                        </P.ProjectMember>
                    ))}
                    </P.ScrollableMemberList>

                    {/* 기여도 차트 */}
                    <P.DonutChartContainer>
                        {isClient && (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={
                                    currentSprint?.member?.some(m => m.value > 0)
                                        ? currentSprint.member
                                        : [{ name: "기여도 없음", value: 1, color: "#e0e0e0" }]
                                }
                                dataKey="value"
                                cx="50%"
                                cy="50%"
                                innerRadius="65%" 
                                outerRadius="90%" 
                                startAngle={90}
                                endAngle={450}
                                stroke="none"
                            >
                                {(currentSprint?.member?.some(m => m.value > 0)
                                    ? currentSprint.member
                                    : [{ color: "#e0e0e0" }]
                                ).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color || "#e0e0e0"} />
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
                {(currentSprintIndex < processedSprintData.length - 1 || 
                    (
                        sprintLast &&
                        canShowNextArrow &&
                        projectUser &&
                        projectUser.errorClassName !== "PROJECT_PARTICIPATION_REQUIRED"
                    )
                ) && !showCreateSprintBox && (
                    <div
                        style={{ position: 'absolute', right: '-100px', top: '300px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                        onClick={handleNextSprint}
                    >
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
                    meetingId={selectedMeetingId}
                    meetingTitle={meetingTitle}
                    setMeetingTitle={setMeetingTitle}
                    meetingDate={meetingDate}
                    setMeetingDate={setMeetingDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    sprintId = {currentSprint?.sprint_id}
                    sprintTitle={currentSprint?.sprint_title}
                    isEditing={!!selectedMeeting} 
                    onMeetingSaved={refreshMeetingList} 
                    onMeetingDeleted={refreshMeetingList}
                />
                
                <Divider1/>
                <P.MeetingContainer>
                    {currentSprint?.sprint_start && currentSprint?.sprint_end && (
                        <SprintCalendar 
                        sprintStart={currentSprint?.sprint_start} 
                        sprintEnd={currentSprint?.sprint_end}
                        meetingData={meetingData}
                        onMeetingClick={(meeting) =>openMeetingModalForEdit(meeting)}
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
