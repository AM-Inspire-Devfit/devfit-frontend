"use client";  

import { useState } from "react";
import Link from 'next/link';

import { ContentContainer, Divider1 } from '@/components/common_s';
import * as M from './mypage_s';
import * as T from '../task/task_s';
import * as P from '../project/project_s';
import {ContributionCircle } from './contributionCircle';

export default function My() {

    const userData = [
        {
            name: "채민주",
            profileImage: "/img/profile.png", 
            percentage: 50
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
        },

    ]

    const taskData = [
        { 
            title: "결제 페이지 디자인 구현결제 페이지 디자인 구현 결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "COMPELTED",
            finish_date: "2025-01-28",
            sos: false
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png", 
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "",
            sos: true
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png",  
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "",
            sos: false
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png",  
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "COMPELTED",
            finish_date: "2025-01-28",
            sos: false
        },
        { 
            title: "결제 페이지 디자인 구현", 
            assignee: "채민주", 
            profileImage: "/img/profile.png",  
            task_start: "2025-01-21", 
            task_end: "2025-01-30",
            toDoStatus: "ON_GOING",
            finish_date: "",
            sos: false
        },
    ]

    return (

        <ContentContainer>
            <M.Container style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <M.ProfileSection>
            <M.ProfileImage $profileImage={userData[0].profileImage}/>
            <M.ProfileInfo>
                <M.Username>{userData[0].name} <span style={{ fontWeight: "normal" }}>님의 마이페이지</span>
                </M.Username>
                {projectData.map((project, index) => (
                    <Link key={project.project_id} href="/project/${project.project_id}/feedback">
                    <M.EvaluationButton>동료평가 메세지</M.EvaluationButton>
                    </Link>
                ))}
            </M.ProfileInfo>
            </M.ProfileSection>
            
            {projectData.map((project, index) => (
            <div key={`project-${index}`} style={{ width: '750px', textAlign: 'left'}}>
                <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2E1A86', marginTop: '100px' }}>
                    <span style={{ color: '#9377FF', fontSize: '20px', marginLeft: '20px', marginRight: '15px' }}>{project.teamName} </span> 
                    <span>{project.projectName}</span>
                </h2>
                <Divider1/>
                <p style={{ fontSize: '15px', color: '#4F3DBD', marginTop: '10px', marginLeft: '20px' }}>
                    {project.projectDescription}
                </p>

                {sprintData.map((sprint, index) => (
                <M.SprintBox key={`sprint-${index}`}>

                    {/* 스프린트 정보 */}
                    <M.SprintInfo>
                        <M.SprintTitle>Sprint {sprint.sprint_num}</M.SprintTitle>
                        <M.SprintDescription>{sprint.goal}</M.SprintDescription>
                    </M.SprintInfo>

                    <M.BoxDivider />

                    <M.ContributionWrapper>
                        <M.ContributionTitle>기여도</M.ContributionTitle>
                        <ContributionCircle percentage={userData[0].percentage} />
                    </M.ContributionWrapper>

                    <M.BoxDivider />

                    <M.RoleWrapper>
                        <M.RoleTitle>역할</M.RoleTitle>
                        <M.RoleText>팀장</M.RoleText>
                    </M.RoleWrapper>
                </M.SprintBox>
            ))}
            </div>
        ))}

        <M.TaskHeader>Todo</M.TaskHeader>
        <T.TaskContainer>
            {taskData.map((task, index) => (
                <T.TaskWrapper key={index}>
                <T.TaskBox key={index} $isCompleted={task.toDoStatus === "COMPELTED"} $isSOS={task.sos}>
                    <T.TaskLeft>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <P.TaskCheckbox
                            checked={task.toDoStatus === "COMPELTED"} readOnly
                        />
                        <T.TaskTitle>{task.title}</T.TaskTitle>
                    </div>
                        <T.TaskDate>{task.task_start} ~ {task.task_end}</T.TaskDate>
                    </T.TaskLeft>

                    {/* <T.TaskRight>
                        {task.profileImage && task.assignee && (
                            <>
                                <T.AssigneeProfile $profileImage={task.profileImage} />
                                <T.AssigneeName>{task.assignee}</T.AssigneeName>
                            </>
                        )}
                    </T.TaskRight> */}
                </T.TaskBox>
                {task.toDoStatus === "COMPELTED" && (
                    <T.NCButton>
                        미완료
                    </T.NCButton >
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
    )

}