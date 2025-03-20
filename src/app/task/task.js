"use client";  

import { useState, useEffect } from "react";
import Image from "next/image";

import { ContentContainer, Divider1 } from '@/components/common_s';
import * as P from '../project/project_s';
import * as T from './task_s';
import TaskModal from './task_modal';
import AssignModal from "./assign_modal";

export default function Task() {

    const userData = [
        {
            name: "채민주",
        }
    ]

    const sprintData = [
        {
            sprint_num: 1,
            goal: "UI 디자인을 완료하고 핵심 기능 단위를 정리합니다.",
            sprint_start: "2025-01-20",
            sprint_end: "2025-02-20",
            progress: 50,
        }
    ];

    const taskData = [
        { 
            title: "결제 페이지 디자인 구현결제 페이지 디자인 구현 결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "",
            taskDifficulty: "MID",
            sos: false
        },
        { 
            title: "스프린트 API 구현", 
            assignee: "조수빈", 
            profileImage: "/img/profile.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "COMPELTED",
            finish_date: "2025-01-28",
            taskDifficulty: "HIGH",
            sos: false
        },
        { 
            title: "결제 페이지 디자인 구현결제 페이지 페", 
            assignee: "최현태", 
            profileImage: "/img/profile2.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "2025-01-28",
            taskDifficulty: "HIGH",
            sos: true
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "", 
            profileImage: "", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "NOT_STARTED",
            finish_date: "",
            taskDifficulty: "HIGH",
            sos: false
        },
        { 
            title: "스프린트 API 구현", 
            assignee: "조수빈", 
            profileImage: "/img/profile.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "COMPELTED",
            finish_date: "2025-01-28",
            taskDifficulty: "HIGH",
            sos: false
        },
        { 
            title: "유저 API 구현", 
            assignee: "최현태", 
            profileImage: "/img/profile2.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "",
            taskDifficulty: "LOW",
            sos: false 
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "", 
            profileImage: "", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "NOT_STARTED",
            finish_date: "",
            taskDifficulty: "HIGH",
            sos: false
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "", 
            profileImage: "", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "NOT_STARTED",
            finish_date: "",
            taskDifficulty: "HIGH",
            sos: false
        },
        
    ]

    const [currentSprint] = useState(sprintData[0]);

    const [goal, setGoal] = useState(currentSprint.goal);
    const [startDate, setStartDate] = useState(currentSprint.sprint_start);
    const [endDate, setEndDate] = useState(currentSprint.sprint_end);
    
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
            <ContentContainer>
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
                    {taskData.map((task, index) => (
                        <T.TaskWrapper key={index}>
                        <T.TaskBox key={index} 
                            $isCompleted={task.toDoStatus === "COMPELTED"} 
                            $isSOS={task.sos}
                            onClick={() => handleEditTaskModal(task)}
                            style={{ cursor: "pointer" }}
                        >
                            <T.TaskLeft>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <P.TaskCheckbox
                                    checked={task.toDoStatus === "COMPELTED"} readOnly
                                />
                                <T.TaskTitle>{task.title}</T.TaskTitle>
                            </div>
                                {/* <T.TaskDate>{task.task_start} ~ {task.task_end}</T.TaskDate> */}
                            </T.TaskLeft>

                            <T.TaskRight>
                                {task.profileImage && task.assignee && (
                                    <>
                                        <T.AssigneeProfile $profileImage={task.profileImage} />
                                        <T.AssigneeName>{task.assignee}</T.AssigneeName>
                                    </>
                                )}
                            </T.TaskRight>
                        </T.TaskBox>
                        {task.toDoStatus === "COMPELTED" && (
                            <T.TaskCompleteDateContainer>
                                {task.finish_date}
                            </T.TaskCompleteDateContainer>
                        )}
                        {task.toDoStatus === "NOT_STARTED" && (
                            <T.TaskStatusButton
                                onClick={() => {
                                    setSelectedTaskTitle(task.title);
                                    setAssignModalOpen(true);
                                }}
                            >
                                Get Task
                            </T.TaskStatusButton>
                        )} 
                        {task.toDoStatus === "ON_GOING" && !task.sos && task.assignee === userData[0]?.name && (
                            <T.MyTaskButton>
                                My Task
                            </T.MyTaskButton>
                        )}
                        {task.toDoStatus === "ON_GOING" && task.sos && (
                            <T.SOSButton
                                onClick={() => {
                                setSelectedTaskTitle(task.title);
                                setAssignModalOpen(true);
                                }}
                            >
                                SOS
                            </T.SOSButton>
                        )}
                        </T.TaskWrapper>
                    ))}  
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
                taskTitle={selectedTaskTitle}
                onClose={() => setAssignModalOpen(false)}
            />
        </>
    )
}