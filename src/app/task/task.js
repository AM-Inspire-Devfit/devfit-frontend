"use client";  

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';

import Image from "next/image";

import { ContentContainer, Divider1 } from '@/components/common_s';
import * as P from '../project/project_s';
import * as T from './task_s';
import TaskModal from './task_modal';
import AssignModal from "./assign_modal";

import { fetchProjectUser } from "@/app/api/project/projectApi";
import { fetchTaskDataBySprint } from '@/app/api/task/taskApi';

import { useAlert } from "@/context/AlertContext";

export default function Task({ projectId }) {
    const { showAlert } = useAlert();

    const searchParams = useSearchParams();

    const sprintId = Number(searchParams.get('sprint_id'));
    const sprintTitle = searchParams.get('sprint_title'); 
    const sprintStart = searchParams.get('sprint_start');
    const sprintEnd = searchParams.get('sprint_end');
    const sprint_goal = searchParams.get('sprint_goal');
    const sprint_progress = Number(searchParams.get('sprint_progress') || 0);

    const [projectUser, setProjectUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [lastTaskId, setLastTaskId] = useState(0);
    const [isFetching, setIsFetching] = useState(false);


    const TASK_PAGE_SIZE = 6;

    useEffect(() => {
        if (!projectId) return;
    
        const fetchUser = async () => {
            const user = await fetchProjectUser(projectId);
            setProjectUser(user);
        };
    
        fetchUser();
    }, [projectId]);

    const loadMoreTasks = async () => {
        if (isFetching || !hasMore) return;
        setIsFetching(true);
    
        try {
            const data = await fetchTaskDataBySprint(sprintId, lastTaskId, TASK_PAGE_SIZE);
            const content = data.content ?? [];

            if (content.length === 0) {
            setHasMore(false);
            } else {
            setTasks((prev) => [...prev, ...content]);
            setLastTaskId(content[content.length - 1].taskId);
            }

            if (data.last || content.length < TASK_PAGE_SIZE) {
            setHasMore(false);
            }

        } catch (error) {
            console.error("태스크 로딩 실패:", error.message);
            setHasMore(false);
        } finally {
            setIsFetching(false);
        }
    };
    

    useEffect(() => {
    if (sprintId) {
        setTasks([]);
        setLastTaskId(0);
        setHasMore(true);

        const timeout = setTimeout(() => {
            loadMoreTasks();
            }, 100); 
        
        return () => clearTimeout(timeout);
        }
    }, [sprintId]);

    const handleScroll = () => {
    if (!hasMore || isFetching) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMoreTasks();
    }
    };
    
    useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isFetching]);

    const currentSprint = {
        sprintTitle,
        sprintStart,
        sprintEnd,
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
                        Sprint {currentSprint.sprintTitle}
                    </span>
                    <span style={{ fontSize: '15px', marginLeft: '15px' }}>
                        {currentSprint.sprintStart} ~ {currentSprint.sprintEnd}
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
                {tasks.map((task, index) => {
                    const isCompleted = task.taskStatus === "COMPLETED";
                    const isOnGoing = task.taskStatus === "ON_GOING";
                    const isNotStarted = task.taskStatus === "NOT_STARTED";
                    const isSOS = task.sosStatus === "SOS";
                    const isMyTask = task.memberId === projectUser?.projectParticipantId && isOnGoing && !isSOS;
                    const isMySOS = task.memberId === projectUser?.projectParticipantId && isOnGoing && isSOS;
                    const isProjectAdmin = projectUser?.role === "ADMIN" && isOnGoing;

                    return (
                        <T.TaskWrapper key={`${task.taskId}-${index}`}>
                        <T.TaskBox 
                            $isCompleted={isCompleted} 
                            $isSOS={isSOS}
                            onClick={() => {
                                // NOT_STARTED이면 누구나 모달 열 수 있음
                                if (isNotStarted) {
                                    handleEditTaskModal(task);
                                }
                                // ON_GOING일 때는 Task 담당자, 관리자만 열 수 있음
                                else if (isOnGoing && (isMyTask || isMySOS || isProjectAdmin)) {
                                    handleEditTaskModal(task);
                                }
                            }}
                            style={{
                                cursor:
                                    (isNotStarted || (isOnGoing && (isMyTask || isMySOS || isProjectAdmin)))
                                        ? "pointer"
                                        : "default"
                            }}
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
                                    if (isMySOS) {
                                        alert("본인의 SOS task를 할당 받을 수 없습니다");
                                        return;
                                    }
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
                projectId={projectId} 
                sprintId={sprintId}
                sprintTitle={currentSprint.sprintTitle}
                task={selectedTask}
                onTaskCreated={async () => {
                    setTasks([]);
                    setLastTaskId(null);
                    setHasMore(true);
                    await loadMoreTasks();
                }}
                role={projectUser?.role} 
            />

            <AssignModal
                isOpen={isAssignModalOpen}
                task={selectedTask}
                onClose={() => setAssignModalOpen(false)}
                onAssigned={async () => {
                    setTasks([]);
                    setLastTaskId(null);
                    setHasMore(true);
                    await loadMoreTasks();
                }}
            />
        </>
    )
}