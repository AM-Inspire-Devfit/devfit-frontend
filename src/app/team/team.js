"use client";

import { useState, useEffect, useRef } from "react";
import {
    ContentContainer,
    TitleContainer,
    TitleRow,
    TitleLeft,
    TitleRight,
    EmojiBox,
    EmojiPickerContainer,
    Title,
    Divider1,
    Subtitle,
    StyledInput,
    Button,
    Space
} from './team_s'

import {
    SectionContainer,
    SectionHeaderWrapper,
    SectionHeaderContainer,
    SectionHeader,
    MemberList,
    MemberItem,
    MemberProfile,
    MemberName,
    MemberDetail,
    ToggleMemberList,
    Divider2,
    ProjectBox,
    ProjectInfo,
    ProjectTitle,
    ProjectDescription,
    ProjectContent,
    ProjectDivider,
    ProjectHButton
} from './section_s'

import {
    ModalOverlay,
    ModalContent,
    ModalButton

} from '@/components/modal_s';

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

    const [showModal, setShowModal] = useState(false);
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

    const [randomMembers, setRandomMembers] = useState(() => {
        return teamMembers.length >= 3 
            ? teamMembers.slice(0, 3) 
            : teamMembers;
    });
    
    useEffect(() => {
        const shuffled = teamMembers.length >= 3
            ? [...teamMembers].sort(() => Math.random() - 0.5).slice(0, 3)
            : teamMembers;
    
        if (JSON.stringify(shuffled) !== JSON.stringify(randomMembers)) {
            setRandomMembers(shuffled);
        }
    }, [teamMembers]);
    

    // 내 프로젝트 / 타 프로젝트
    const myProjects = projects.filter(project => project.my_project);
    const otherProjects = projects.filter(project => !project.my_project);

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
        setShowModal(true);
    };

    // 타 프로젝트 가입 신청 -> 승인 대기
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

        <ContentContainer>
            <TitleContainer>
                <TitleLeft>
                <EmojiBox onClick={(e) => {
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
                    </EmojiBox>
                </TitleLeft>
                    
                    <TitleRight>
                        <TitleRow>
                        {isEditing ? (
                            <StyledInput
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        ) : (
                            <Title>{title}</Title>
                        )}
                        <Image
                            src="/img/edit.png"
                            alt="Edit"
                            width={20}
                            height={20}
                            onClick={handleEditClick}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                        />
                        </TitleRow>
                        <Divider1 />
                        {isEditing ? (
                            <StyledInput
                                type="text"
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <Subtitle>{subtitle}</Subtitle>
                        )}
                    </TitleRight>
            </TitleContainer>

            <SectionContainer>
            <SectionHeaderWrapper>
                <SectionHeaderContainer>
                <SectionHeader>Member</SectionHeader>
                </SectionHeaderContainer>
                <Button>초대코드 생성</Button>
            </SectionHeaderWrapper>
            <Divider2 />
                <MemberList>
                    {/* 리더 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "10px" }}>
                        {leaders.map((leader) => (
                            <MemberItem key={leader.id}>
                                <MemberProfile isLeader={true}>
                                <Image src={leader.profileImage} alt={leader.name} width={50} height={50} />
                                </MemberProfile>
                                <MemberName isLeader={true}>{leader.name}</MemberName>
                            </MemberItem>
                        ))}
                    {/* 팀원들 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "30px" }}>
                        {randomMembers.map((member) => (
                            <MemberItem key={member.id}>
                                <MemberProfile isLeader={false}>
                                    <Image src={member.profileImage} alt="Member" width={50} height={50} />
                                </MemberProfile>
                                <MemberName isLeader={false}>{member.name}</MemberName>
                            </MemberItem>
                        ))}
                    </div>
                    </div>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <MemberDetail onClick={() => setIsDetailOpen(prev => !prev)}>더보기 </MemberDetail>
                        <MemberName style={{ visibility: "hidden" }}></MemberName>
                        <ToggleMemberList isOpen={isDetailOpen}>
                            {allMembers.map(member => (
                                <div key={member.id} style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    width: "100%", 
                                    padding: "5px 3px",
                                    gap: "10px" 
                                }}>
                                    <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        border: "2px solid #796AD9"
                                    }}>
                                        <Image src={member.profileImage} alt={member.name} width={40} height={40} />
                                    </div>
                                    <p style={{
                                        flexGrow: 1, 
                                        textAlign: "right", 
                                        fontSize: "14px",
                                        color: "#432CA4",
                                        fontWeight: "bold",
                                    }}>
                                        {member.name}
                                    </p>
                                </div>
                            ))}
                        </ToggleMemberList>
                    </div>
                </MemberList>
            </SectionContainer>

            <SectionContainer>
            <SectionHeaderWrapper>
                <SectionHeaderContainer>
                <SectionHeader>내 프로젝트</SectionHeader>
                </SectionHeaderContainer>
                <Button>추가하기</Button>
            </SectionHeaderWrapper>
            <Divider2 />

            {/* 프로젝트 박스 */}
            {myProjects.map((project) => (
                <ProjectBox key={project.project_id}>
                    <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectInfo>
                        <ProjectDescription>
                            {project.description}
                        </ProjectDescription>
                    </ProjectInfo>
                    </ProjectContent>
                    <ProjectDivider />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <ProjectHButton>프로젝트 홈</ProjectHButton>
                    <button style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "white",
                        background: "#796AD9",
                        border: "2px solid #796AD9",
                        borderRadius: "12px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        minWidth: "85px",
                        transition: "0.2s ease-in-out"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#5a46c6"}
                    onMouseOut={(e) => e.target.style.background = "#796AD9"}
                    onClick={() => handleLeaveClick(project)}
                    >
                    나가기
                    </button>
                    </div>
                </ProjectBox>
                ))}
            </SectionContainer>


            <SectionContainer>
            <SectionHeaderWrapper>
                <SectionHeaderContainer>
                <SectionHeader>타 프로젝트</SectionHeader>
                </SectionHeaderContainer>
            </SectionHeaderWrapper>
            <Divider2 />
                {otherProjects.map((project) => (
                <ProjectBox key={project.project_id}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectInfo>
                        <ProjectDescription>
                            {project.description}
                        </ProjectDescription>
                    </ProjectInfo>
                    <ProjectDivider />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <ProjectHButton>프로젝트 홈</ProjectHButton>
                    <button
                        style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "white",
                            background: pendingProjects[project.project_id] ? "#B3B3B3" : "#796AD9",
                            border: `2px solid ${pendingProjects[project.project_id] ? "#B3B3B3" : "#796AD9"}`,
                            borderRadius: "12px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            minWidth: "85px",
                            transition: "0.2s ease-in-out"
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = pendingProjects[project.project_id] ? "#B3B3B3" : "#5a46c6";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = pendingProjects[project.project_id] ? "#B3B3B3" : "#796AD9";
                        }}
                        onClick={() => handleClick(project.project_id)}
                    >
                        {pendingProjects[project.project_id] ? "승인대기" : "가입신청"}
                    </button>
                    </div>
                </ProjectBox>
            ))}
        </SectionContainer>
        <Space />

        {/* 프로젝트 나가기 modal */}
        {showModal && selectedProject && (
            <ModalOverlay>
                <ModalContent>
                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <p style={{ fontSize: "25px", marginBottom: "5px" }}>
                            <strong>{selectedProject.title}</strong> 프로젝트를
                        </p>
                        <p style={{ fontSize: "25px", fontWeight: "normal" }}>
                            나가시겠습니까?
                        </p>
                    </div>
                    <div style={{ marginTop: "20px", display: "flex", gap: "60px", justifyContent: "center" }}> 
                        <ModalButton onClick={() => setShowModal(false)}>예</ModalButton>
                        <ModalButton onClick={() => setShowModal(false)}>아니오</ModalButton>
                    </div>
                </ModalContent>
            </ModalOverlay>
        )}
        </ContentContainer>
    );

}