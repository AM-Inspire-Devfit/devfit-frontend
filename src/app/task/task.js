"use client";  

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import Image from "next/image";

import { ContentContainer, Divider1 } from '@/components/common_s';
import * as P from '../project/project_s';
import * as T from './task_s';
import TaskModal from './task_modal';
import AssignModal from "./assign_modal";


const projectUserData = {
    "success": true,
    "status": 200,
    "data": {
        "projectParticipantId": 1,
        "projectNickname": "최현태",
        "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
        "role": "ADMIN" 
    },
    "timestamp": "2025-03-19T21:42:40.59254"
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
        "taskStatus": "ON_GOING",
        "assignedStatus": "ASSIGNED",
        "sosStatus": "NOT_SOS",
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
        "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
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
        "taskStatus": "ON_GOING",
        "assignedStatus": "ASSIGNED",
        "sosStatus": "NOT_SOS",
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
        "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
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
        "taskStatus": "ON_GOING",
        "assignedStatus": "ASSIGNED",
        "sosStatus": "NOT_SOS",
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
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
        "memberId": 2,
        "projectNickname": "조수빈",
        "profileImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIby_kbsDmHckQur6UKlkn1a4Ul89JdAf82TvYSGwehu-oVRA=s96-c",
        },
        {
        "taskId": 6,
        "description": "피그마 화면 설계 수정ㅎㅎㅎ",
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


export default function Task() {
    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 아래부터 시작------------------------------------>
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [tasks, setTasks] = useState(taskData[0].data.content);
    const [hasMore, setHasMore] = useState(!taskData[0].data.last);

    const loadMoreTasks = () => {
        const nextIndex = currentPageIndex + 1;
        if (!hasMore || nextIndex >= taskData.length) return;

        const nextPage = taskData[nextIndex];
        setTasks(prev => [...prev, ...nextPage.data.content]);
        setCurrentPageIndex(nextIndex);

        if (nextPage.data.last) {
            setHasMore(false);
        }
    };

    useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;
    
        if (hasMore && scrollTop + windowHeight >= docHeight - 100) {
            loadMoreTasks();
        }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, currentPageIndex]);

    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 위까지 끝-------------------------------------->

    const searchParams = useSearchParams();

    const sprint_num = searchParams.get('sprint_num');
    const sprint_start = searchParams.get('sprint_start');
    const sprint_end = searchParams.get('sprint_end');
    const sprint_goal = searchParams.get('sprint_goal');
    const sprint_progress = Number(searchParams.get('sprint_progress') || 0);

    const currentSprint = {
        sprint_num,
        sprint_start,
        sprint_end,
        goal: sprint_goal,
        progress: sprint_progress
    };
    
    const [isTaskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedTaskTitle, setSelectedTaskTitle] = useState("");

    // Task 생성 modal
    const handleAddTaskModal = () => {
        setSelectedTask(null);
        setTaskModalOpen(true);
    };

    // Task 수정/삭제 modal
    const handleEditTaskModal = (task) => {
        setSelectedTask(task);
        setTaskModalOpen(true);
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
    
        if (isTaskModalOpen || isAssignModalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return enableScroll;
    }, [isTaskModalOpen, isAssignModalOpen]);
    

    return (
        <>
            <ContentContainer style={{minHeight: "600px"}}>
            <div 
                style={{
                    width: "750px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                }}
            >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h2 style={{ fontWeight: 'bold', color: '#2E1A86' }}>
                    <span style={{ fontSize: '32px', marginLeft: '20px' }}>
                        Sprint {currentSprint.sprint_num}
                    </span>
                    <span style={{ fontSize: '15px', marginLeft: '15px' }}>
                        {currentSprint.sprint_start} ~ {currentSprint.sprint_end}
                    </span>
                </h2>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Divider1 />
            </div>
            <p style={{ fontSize: '15px', fontWeight: 400, color: '#4F3DBD', marginTop: '10px', marginLeft: '20px', marginBottom: '15px', textAlign: 'left' }}>
                {currentSprint.goal}
            </p>    
            </div>
            <P.ProgressContainer
                style ={{
                    width: "720px",
                    display: "flex",
                    justifyContent: "center"
            }}>
                <P.ProgressLabels>
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                </P.ProgressLabels>
                <P.ProgressBarWrapper>
                    <P.ProgressBar progress={currentSprint.progress} /> 
                </P.ProgressBarWrapper>
            </P.ProgressContainer>

            <T.TaskContainerWrapper>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#2E1A86" }}>
                    Task
                </h2>
                <T.AddTaskButton onClick={handleAddTaskModal}>추가하기</T.AddTaskButton>
            </T.TaskContainerWrapper>

                <T.TaskContainer>
                {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                <--------------------------------------map 함수 부분--------------------------------------> */}
                {tasks.map((task, index) => {
                    const isCompleted = task.taskStatus === "COMPLETED";
                    const isOnGoing = task.taskStatus === "ON_GOING";
                    const isNotStarted = task.taskStatus === "NOT_STARTED";
                    const isSOS = task.sosStatus === "SOS";
                    const isNotSOS = task.sosStatus === "NOT_SOS";
                    const isMyTask = task.projectNickname === projectUserData.data.projectNickname && isOnGoing && !isSOS;

                    return (
                        <T.TaskWrapper key={`${task.taskId}-${index}`}>
                        <T.TaskBox 
                            $isCompleted={isCompleted} 
                            $isSOS={isSOS}
                            onClick={() => handleEditTaskModal(task)}
                            style={{ cursor: "pointer" }}
                        >
                            <T.TaskLeft>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <P.TaskCheckbox
                                    checked={isCompleted} readOnly
                                />
                                <T.TaskTitle>{task.description}</T.TaskTitle>
                            </div>
                                {/* <T.TaskDate>{task.task_start} ~ {task.task_end}</T.TaskDate> */}
                            </T.TaskLeft>

                            <T.TaskRight>
                                {task.profileImageUrl && task.projectNickname && (
                                    <>
                                        <T.AssigneeProfile $profileImage={task.profileImageUrl}  />
                                        <T.AssigneeName>{task.projectNickname}</T.AssigneeName>
                                    </>
                                )}
                            </T.TaskRight>
                        </T.TaskBox>
                        {isCompleted && (
                            <T.TaskCompleteDateContainer>
                                {task.finish_date}
                            </T.TaskCompleteDateContainer>
                        )}
                        {isNotStarted  && (
                            <T.TaskStatusButton
                                onClick={() => {
                                    setSelectedTask(task);
                                    setAssignModalOpen(true);
                                }}
                            >
                                Get Task
                            </T.TaskStatusButton>
                        )} 
                        {isMyTask && (
                            <T.MyTaskButton>
                                My Task
                            </T.MyTaskButton>
                        )}
                        {isSOS && (
                            <T.SOSButton
                                onClick={() => {
                                setSelectedTask(task);
                                setAssignModalOpen(true);
                                }}
                            >
                                SOS
                            </T.SOSButton>
                        )}
                        </T.TaskWrapper>
                    );
                })}
                </T.TaskContainer>

            </ContentContainer>
            
            <TaskModal
                isOpen={isTaskModalOpen}
                onClose={() => setTaskModalOpen(false)}
                sprintNum={currentSprint.sprint_num}
                task={selectedTask}
            />

            <AssignModal
                isOpen={isAssignModalOpen}
                task={selectedTask}
                onClose={() => setAssignModalOpen(false)}
            />
        </>
    )
}