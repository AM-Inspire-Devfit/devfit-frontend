"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link'; 

import * as c from '@/components/common_s'

import * as T from '@/app/team/team_s'

import * as S from '@/app/team/section_s'
import { LeaveProjectButton, JoinProjectButton } from "@/app/team/section_s";

import InviteModal from "./invite_modal";
import AddModal from "./add_modal";
import LeaveModal from "./leave_modal";
import DeleteModal from "./delete_modal";
import AdminLModal from "./admin_leave_modal";

import Image from "next/image";
import EmojiPicker from "emoji-picker-react";

export default function Team() {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("SideEffect");
    const [subtitle, setSubtitle] = useState("Lg CNS AM Inspire Camp 1기 스터디그룹 2조");

    const [chosenEmoji, setChosenEmoji] = useState("🍇"); // sideEffect 디폴트 이모지
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiBoxRef = useRef(null);
    const emojiPickerRef = useRef(null);
    const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [pendingProjects, setPendingProjects] = useState({});

    const [inviteModal, setInviteModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [leaveModal, setLeaveModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [adminLModal, setAdminLModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const userData = { memberId: 1234 };

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
            title: "devFit",
            description: "개발자들을 위한 협업 도구 제공 프로젝트",
            my_project: true,
            adminId: 1234
        },
        {
            project_id: 2,
            title: "AWS",
            description: "클라우드 기반 웹서비스 구축 프로젝트",
            my_project: true,
            adminId: 5678
        },
        {
            project_id: 3,
            title: "KING",
            description: "유니티 기반 게임 개발 동아리",
            my_project: false,
            adminId: 5678
        },
        {
            project_id: 4,
            title: "CodeSync",
            description: "실시간 코드 공유 및 협업을 위한 플랫폼",
            my_project: false,
            adminId: 5678
        },
        {
            project_id: 5,
            title: "AI Scholar",
            description: "AI를 활용한 맞춤형 장학금 추천 서비스",
            my_project: true,
            adminId: 1234
        },
        {
            project_id: 6,
            title: "DevMatch",
            description: "개발자 매칭 및 협업을 지원하는 플랫폼",
            my_project: false,
            adminId: 5678
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
    
        if (leaveModal || inviteModal || addModal || deleteModal) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return () => enableScroll();
    }, [leaveModal, inviteModal, addModal, deleteModal]);


    const handleEditClick = () => {
        setIsEditing((prev) => !prev); 
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    // 이모지 클릭 시 위치 계산
    const updatePickerPosition = () => {
        if (emojiBoxRef.current) {
            const rect = emojiBoxRef.current.getBoundingClientRect();
            setPickerPosition({
                top: rect.bottom + window.scrollY + 8, 
                left: rect.left + rect.width / 2,  
            });
        }
    };

    // 창 크기 변경 시 이모지 팝업 위치 업데이트
    useEffect(() => {
        if (showEmojiPicker) {
            updatePickerPosition(); // Picker가 열릴 때 한 번 실행

            const handleResize = () => {
                updatePickerPosition(); 
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [showEmojiPicker]);


    useEffect(() => {
        function handleClickOutside(event) {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                !emojiBoxRef.current.contains(event.target)
            ) {
                setShowEmojiPicker(false);
            }
        }

        if (showEmojiPicker) {
            window.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEmojiPicker]);

    // 초대코드 생성 모달
    const handleInviteClick = () => {
        setInviteModal(true);
    };

    // 프로젝트 생성 모달 
    const handleAddClick = () => {
        setAddModal(true);
    }
    
    // 나의 프로젝트 나가기 모달
    const handleLeaveClick = (project) => {
        setSelectedProject(project);
        setLeaveModal(true);
    };

    // 프로젝트 팀장 나가기 모달
    const handleAdminLClick = (project) => {
        console.log("handleAdminLClick 실행됨", project);
        setSelectedProject(project);
        setAdminLModal(true);
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
    

    return (

        <c.ContentContainer>
            <T.TitleContainer>
                <T.TitleLeft>
                <T.EmojiBox
                    ref={emojiBoxRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        updatePickerPosition();
                        setShowEmojiPicker((prev) => !prev);
                    }}
                >
                        {chosenEmoji}
                        <Image src="/img/emoji_edit.png" alt="Edit" width={35} height={35} />
                        </T.EmojiBox>
                </T.TitleLeft>
                    
                    <T.TitleRight>
                        <T.TitleRow>
                        {isEditing ? (
                            <T.StyledInput
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
                            <T.StyledInput
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

            {showEmojiPicker && (
                <div
                    ref={emojiPickerRef}
                    style={{
                        position: "absolute",
                        top: `${pickerPosition.top}px`,  
                        left: `${pickerPosition.left}px`, 
                        transform: "translateX(-50%)",
                        zIndex: 200,
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <EmojiPicker onEmojiClick={(emojiData) => setChosenEmoji(emojiData.emoji)} />
                </div>
            )}

            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer>
                <S.SectionHeader>팀 멤버</S.SectionHeader>
                </S.SectionHeaderContainer>
                <T.Button onClick={handleInviteClick}>
                    초대코드 확인
                </T.Button>
            </S.SectionHeaderWrapper>
            <S.Divider2 />
                <S.MemberList>
                    {/* 리더 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "20px" }}>
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
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <S.MemberItem key={member.id} style={{ position: "relative", marginLeft: index === 0 ? "0" : "-15px" }}>
                                <S.MemberProfile>
                                    <Image src={member.profileImage} alt={member.name} width={50} height={50} />
                                </S.MemberProfile>
                                <S.MemberName style={{ visibility: member.name ? "hidden" : "visible" }}>
                                    {member.name}
                                </S.MemberName>
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
            
            {/* 내 프로젝트 */}
            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer>
                <S.SectionHeader>내 프로젝트</S.SectionHeader>
                </S.SectionHeaderContainer>
                <T.Button onClick={() => handleAddClick()}>추가하기</T.Button>
            </S.SectionHeaderWrapper>
            <S.Divider2 />
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

                    {/* 유저가 프로젝트 팀장일 경우 */}
                    {project.adminId === userData.memberId ? (
                        <>
                        <S.ProjectDivider1 />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <Link href={`/project/${project.project_id}`}>
                            <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                        </Link>
                        <LeaveProjectButton onClick={() => handleAdminLClick(project)} />
                        <S.DeleteProjectButton onClick={() => handleDeleteClick(project)}>삭제</S.DeleteProjectButton>
                        </div>
                        </>
                    ) : (
                        // 유저가 프로젝트 팀원일 경우
                        <>
                        <S.ProjectDivider2 />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            <Link href={`/project/${project.project_id}`}>
                                <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                            </Link>
                            <LeaveProjectButton onClick={() => handleLeaveClick(project)} />
                        </div>
                        </>
                    )}
                </S.ProjectBox>
                ))}
            </S.SectionContainer>

            {/* 타 프로젝트 */}
            <S.SectionContainer>
            <S.SectionHeaderWrapper>
                <S.SectionHeaderContainer
                    style={{ 
                    background: "#9688ED"
                    }} >
                <S.SectionHeader
                    style={{ 
                        color: "white"
                    }}
                >타 프로젝트</S.SectionHeader>
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
                    <Link href={`/project/${project.project_id}/view`}>
                        <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                    </Link>
                    <JoinProjectButton 
                        onClick={() => handleClick(project.project_id)} 
                        isPending={pendingProjects[project.project_id]}
                    />
                    </div>
                </S.ProjectBox>
            ))}
        </S.SectionContainer>
        <c.Space />


        {/* 초대코드 생성 modal */}
        {inviteModal && 
        <InviteModal  
            onClose={() => setInviteModal(false)} 
        />}

        {/* 프로젝트 생성 modal */}
        {addModal && 
        <AddModal  
            onClose={() => setAddModal(false)} 
        />}

        {/* 프로젝트 삭제 modal */}
        {deleteModal && selectedProject && (
        <DeleteModal 
            selectedProject={selectedProject} 
            onClose={() => setDeleteModal(false)}
        />
        )}

        {/* 프로젝트 나가기 modal */}
        {leaveModal && selectedProject && (
        <LeaveModal 
            selectedProject={selectedProject} 
            onClose={() => setLeaveModal(false)}
        />
        )}

        {/* 프로젝트 팀장 나가기 modal */}
        {adminLModal && (
        <AdminLModal
            onClose={() => setAdminLModal(false)}
        />
        )}
        </c.ContentContainer>

    );

}