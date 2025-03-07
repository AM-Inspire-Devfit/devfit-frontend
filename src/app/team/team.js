"use client";

import { useState, useEffect, useRef } from "react";

import * as c from '@/components/common_s'

import * as T from '@/app/team/team_s'

import * as S from '@/app/team/section_s'
import { LeaveProjectButton, JoinProjectButton } from "@/app/team/section_s";

import LeaveModal from "./leave_modal";

import Image from "next/image";
import EmojiPicker from "emoji-picker-react";

export default function Team() {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("SideEffect");
    const [subtitle, setSubtitle] = useState("Lg CNS AM Inspire Camp 1기 스터디그룹 2조");

    const [chosenEmoji, setChosenEmoji] = useState("🍇"); // sideEffect 디폴트 이모지
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [pendingProjects, setPendingProjects] = useState({});

    const [leaveModal, setLeaveModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const [members, setMembers] = useState([
        {
            id: 1,
            name: "김팀장",
            role: "leader",
            profileImage: "/img/profile2.png"
        },
        {
            id: 2,
            name: "박팀원",
            role: "member",
            profileImage: "/img/profile.png"
        },
        {
            id: 3,
            name: "이팀원",
            role: "member",
            profileImage: "/img/profile.png"
        },
        {
            id: 4,
            name: "정팀원",
            role: "member",
            profileImage: "/img/profile.png"
        },
        {
            id: 5,
            name: "강팀원",
            role: "member",
            profileImage: "/img/profile.png"
        }
    ]);

    const [projects, setProjects] = useState([
        {
            project_id: 1,
            title: "SideEffect",
            description: "개발자들을 위한 협업 도구 제공 프로젝트",
            my_project: true,
        },
        {
            project_id: 2,
            title: "AWS",
            description: "클라우드 기반 웹서비스 구축 프로젝트",
            my_project: true,
        },
        {
            project_id: 3,
            title: "KING",
            description: "유니티 기반 게임 개발 동아리",
            my_project: false,
        },
        {
            project_id: 4,
            title: "CodeSync",
            description: "실시간 코드 공유 및 협업을 위한 플랫폼",
            my_project: false,
        },
        {
            project_id: 5,
            title: "AI Scholar",
            description: "AI를 활용한 맞춤형 장학금 추천 서비스",
            my_project: true,
        },
        {
            project_id: 6,
            title: "DevMatch",
            description: "개발자 매칭 및 협업을 지원하는 플랫폼",
            my_project: false,
        }
    ]);


    const leaders = members.filter(member => member.role === "leader");
    const teamMembers = members.filter(member => member.role === "member");
    const allMembers = [...leaders, ...teamMembers];    

    // 내 프로젝트 / 타 프로젝트
    const myProjects = projects.filter(project => project.my_project);
    const otherProjects = projects.filter(project => !project.my_project);

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
    
        if (leaveModal) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return () => enableScroll();
    }, [leaveModal]);


    const handleEditClick = () => {
        setIsEditing((prev) => !prev); 
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    const onEmojiClick = (emojiData) => {
        setChosenEmoji(emojiData.emoji);
        setShowEmojiPicker(false);
    };

    // 나의 프로젝트 나가기 모달
    const handleLeaveClick = (project) => {
        setSelectedProject(project);
        setLeaveModal(true);
    };

    // 프로젝트 삭제 모달
    const handleDeleteClick = (project) => {
        setSelectedProject(project);
        setDeleteModal(true);
    };

    // 타 프로젝트 가입 신청 <-> 승인 대기
    const handleClick = (projectId) => {
        setPendingProjects((prev) => ({
            ...prev,
            [projectId]: !prev[projectId]
        }));
    };
    

    useEffect(() => {
        function handleClickOutside(event) {
            // 이모지 피커 내부 클릭 시 닫히지 않도록 예외 처리
            if (
                emojiPickerRef.current &&
                (emojiPickerRef.current.contains(event.target) ||
                event.target.closest(".emoji-picker"))
            ) {
                return;
            }
    
            // 이외의 경우는 이모지 피커 닫기
            setShowEmojiPicker(false);
        }
    
        // 화면 전체에서 클릭 이벤트 감지
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    

    return (

        <c.ContentContainer>
            <T.TitleContainer>
                <T.TitleLeft>
                <T.EmojiBox onClick={(e) => {
                    e.stopPropagation(); // 이벤트 전파 방지
                    setShowEmojiPicker(!showEmojiPicker);
                }}>
                        {chosenEmoji}
                        <Image src="/img/emoji_edit.png" alt="Edit" width={35} height={35} />
                        {showEmojiPicker && (
                            <EmojiPickerContainer ref={emojiPickerRef} className="emoji-picker-container">
                                <EmojiPicker 
                                    onEmojiClick={onEmojiClick} 
                                    className="emoji-category"
                                />
                        </EmojiPickerContainer>
                        )}
                    </T.EmojiBox>
                </T.TitleLeft>
                    
                    <T.TitleRight>
                        <T.TitleRow>
                        {isEditing ? (
                            <StyledInput
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        ) : (
                            <T.Title>{title}</T.Title>
                        )}
                        <Image
                            src="/img/edit.png"
                            alt="Edit"
                            width={20}
                            height={20}
                            onClick={handleEditClick}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                        />
                        </T.TitleRow>
                        <c.Divider1 />
                        {isEditing ? (
                            <StyledInput
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <T.Subtitle>{subtitle}</T.Subtitle>
                        )}
                    </T.TitleRight>
            </T.TitleContainer>

            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer>
                <S.SectionHeader>Member</S.SectionHeader>
                </S.SectionHeaderContainer>
                <T.Button>초대코드 생성</T.Button>
            </S.SectionHeaderWrapper>
            <S.Divider2 />
                <S.MemberList>
                    {/* 리더 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "10px" }}>
                        {leaders.map((leader) => (
                            <S.MemberItem key={leader.id}>
                                <S.MemberProfile isLeader={true}>
                                <Image src={leader.profileImage} alt={leader.name} width={50} height={50} />
                                </S.MemberProfile>
                                <S.MemberName isLeader={true}>{leader.name}</S.MemberName>
                            </S.MemberItem>
                        ))}
                    {/* 팀원들 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "30px" }}>
                        {teamMembers.map((member) => (
                            <S.MemberItem key={member.id}>
                                <S.MemberProfile>
                                    <Image src={member.profileImage} alt={member.name} width={50} height={50} />
                                </S.MemberProfile>
                                <S.MemberName>{member.name}</S.MemberName>
                            </S.MemberItem>
                        ))}
                    </div>
                    </div>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <S.MemberDetail onClick={() => setIsDetailOpen(prev => !prev)}>더보기 </S.MemberDetail>
                        <S.MemberName style={{ visibility: "hidden" }}></S.MemberName>
                        <S.ToggleMemberList isOpen={isDetailOpen}>
                            {allMembers.map(member => (
                                <S.ToggleMemberItem key={member.id}>
                                <S.ToggleMemberImage>
                                    <Image src={member.profileImage} alt={member.name} width={40} height={40} />
                                </S.ToggleMemberImage>
                                <S.ToggleMemberText>{member.name}</S.ToggleMemberText>
                            </S.ToggleMemberItem>
                            ))}
                        </S.ToggleMemberList>
                    </div>
                </S.MemberList>
            </S.SectionContainer>

            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer>
                <S.SectionHeader>내 프로젝트</S.SectionHeader>
                </S.SectionHeaderContainer>
                <T.Button>추가하기</T.Button>
            </S.SectionHeaderWrapper>
            <S.Divider2 />

            {/* 프로젝트 박스 */}
            {myProjects.map((project) => (
                <S.ProjectBox key={project.project_id}>
                    <S.ProjectContent>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectInfo>
                        <S.ProjectDescription>
                            {project.description}
                        </S.ProjectDescription>
                    </S.ProjectInfo>
                    </S.ProjectContent>
                    <S.ProjectDivider1 />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                    <LeaveProjectButton onClick={() => handleLeaveClick(project)} />
                    <S.DeleteProjectButton onClick={() => handleDeleteClick(project)}>삭제</S.DeleteProjectButton>
                    </div>
                </S.ProjectBox>
                ))}
            </S.SectionContainer>


            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer>
                <S.SectionHeader>타 프로젝트</S.SectionHeader>
                </S.SectionHeaderContainer>
            </S.SectionHeaderWrapper>
            <S.Divider2 />
                {otherProjects.map((project) => (
                <S.ProjectBox key={project.project_id}>
                    <S.ProjectTitle>{project.title}</S.ProjectTitle>
                    <S.ProjectInfo>
                        <S.ProjectDescription>
                            {project.description}
                        </S.ProjectDescription>
                    </S.ProjectInfo>
                    <S.ProjectDivider2 />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                    <JoinProjectButton 
                        onClick={() => handleClick(project.project_id)} 
                        isPending={pendingProjects[project.project_id]}
                    />
                    </div>
                </S.ProjectBox>
            ))}
        </S.SectionContainer>
        <c.Space />

        {/* 프로젝트 나가기 modal */}
        {leaveModal && selectedProject && (
        <LeaveModal 
            selectedProject={selectedProject} 
            onClose={() => setLeaveModal(false)}
        />
        )}
        </c.ContentContainer>
    );

}