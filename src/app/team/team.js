"use client";

import { useState, useEffect, useRef } from "react";
import Link from 'next/link'; 

import * as c from '@/components/common_s'

import * as T from '@/app/team/team_s'

import * as S from '@/app/team/section_s'
import { LeaveProjectButton, JoinProjectButton } from "@/app/team/section_s";

import InviteModal from "./invite_modal";
import ProjectModal from "./project_modal";
import LeaveModal from "./leave_modal";
import DeleteModal from "./delete_modal";
import AdminLModal from "./admin_leave_modal";

import Image from "next/image";
import EmojiPicker from "emoji-picker-react";

export default function Team() {

    const userData = {
        "success": true,
        "status": 200,
        "data": {
            "memberId": 1,
            "nickname": "최현태",
            "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            "status": "NORMAL",
            "role": "USER"
        },
        "timestamp": "2025-02-11T17:08:20.340403"
    }

    const teamData = {
        "success": true,
        "status": 200,
        "data": {
            "teamId": "1",
            "teamName": "Side Effect",
            "teamDescription": "Lg CNS AM Inspire Camp 1기 스터디그룹 2조",
            "teamEmoji": "🍇"
        },
        "timestamp": "2025-02-10T14:18:46.135007"
    }

    const teamLeaderData = 
        {
            "success": true,
            "status": 200,
            "data": {
                "memberId": 44,
                "nickname": "최현태",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg"
            },
            "timestamp": "2025-03-02T14:52:05.54385"
        }

    const teamMemberData = [
        {
            "success": true,
            "status": 200,
            "data": {
            "content": [
            {
                "memberId": 1,
                "nickname": "",
                "profileImageUrl": "",
            },
            {
                "memberId": 2,
                "nickname": "조수빈",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },
            {
                "memberId": 3,
                "nickname": "정선우",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },

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
            "last": false,
            "size": 3,
            "number": 0,
            "sort": [],
            "numberOfElements": 1,
            "empty": false
        },
        "timestamp": "2025-03-02T14:57:03.879893"
        },
        {
            "success": true,
            "status": 200,
            "data": {
            "content": [
            {
                "memberId": 4,
                "nickname": "채민주",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },
            {
                "memberId": 5,
                "nickname": "조수빈",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },
            {
                "memberId": 6,
                "nickname": "정선우",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },

            ],
            "pageable": {
            "pageNumber": 0,
            "pageSize": 3,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
            },
            "first": false,
            "last": false,
            "size": 3,
            "number": 0,
            "sort": [],
            "numberOfElements": 1,
            "empty": false
        },
        "timestamp": "2025-03-02T14:57:03.879893"
        },
        {
            "success": true,
            "status": 200,
            "data": {
            "content": [
            {
                "memberId": 7,
                "nickname": "채민주",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },
            {
                "memberId": 8,
                "nickname": "조수빈",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },
            {
                "memberId": 9,
                "nickname": "정선우",
                "profileImageUrl": "https://k.kakaocdn.net/dn/ceTrU6/btsL0V0mhKO/DAXjn1URCKkIOTBGqAZKAK/img_110x110.jpg",
            },

            ],
            "pageable": {
            "pageNumber": 0,
            "pageSize": 3,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
            },
            "first": false,
            "last": true,
            "size": 3,
            "number": 0,
            "sort": [],
            "numberOfElements": 1,
            "empty": false
        },
        "timestamp": "2025-03-02T14:57:03.879893"
        }

    ]

    const projectData = 
        {
            "first": true,
            "last": true,
            "size": 1073741824,
            "content": [
                {
                    "projectInfo": {
                        "projectId": 1,
                        "projectTitle": "Devfit",
                        "projectDescription": "LG CNS AM Inspire Camp 사이드 프로젝트",
                        "startDt": "2024-01-01",
                        "dueDt": "2025-01-01"
                    },
                    "isAdmin":true,
                    "isParticipant": true
                },
                {
                    "projectInfo": {
                        "projectId": 2,
                        "projectTitle": "Devfit",
                        "projectDescription": "LG CNS AM Inspire Camp 사이드 프로젝트",
                        "startDt": "2024-01-01",
                        "dueDt": "2025-01-01"
                    },
                    "isAdmin": false,
                    "isParticipant": true
                },
                {
                    "projectInfo": {
                        "projectId": 3,
                        "projectTitle": "Devfit",
                        "projectDescription": "LG CNS AM Inspire Camp 사이드 프로젝트",
                        "startDt": "2024-01-01",
                        "dueDt": "2025-01-01"
                    },
                    "isAdmin": false,
                    "isParticipant": false
                },
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


    const [myProjects, setMyProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    
    const [teamInfo, setTeamInfo] = useState(teamData.data);
    // const [chosenEmoji, setChosenEmoji] = useState(teamInfo.teamEmoji);
    // const [title, setTitle] = useState(teamInfo.teamName);
    // const [subtitle, setSubtitle] = useState(teamInfo.teamDescription);

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
    
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

    const [leaders, setLeaders] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    const [displayedMembers, setDisplayedMembers] = useState(teamMemberData[0].data.content);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [hasMore, setHasMore] = useState(!teamMemberData[0].data.last);

    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------여기부터 아래부터 시작-------------------------------------->
    
    
    useEffect(() => {
        // 팀 리더 데이터 변환
        const leader = {
            id: teamLeaderData.data.memberId,
            name: teamLeaderData.data.nickname,
            profileImage: teamLeaderData.data.profileImageUrl,
            role: "leader"
        };
        
        // 팀원 데이터 변환
        const members = teamMemberData[0].data.content.map(member => ({
            id: member.memberId,
            name: member.nickname,
            profileImage: member.profileImageUrl,
            role: "member"
        }));
    
        setLeaders([leader]);
        setTeamMembers(members);
        setDisplayedMembers(members);
    }, []);


    const [allMembers, setAllMembers] = useState([]);

    useEffect(() => {
    setAllMembers([...leaders, ...displayedMembers]);
    }, [leaders, displayedMembers]);

    const toggleListRef = useRef(null);

    // 팀원 스크롤 이벤트
    useEffect(() => {
        const listEl = toggleListRef.current;
        if (!listEl) return;
    
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = listEl;
            if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
                const nextPageIndex = currentPageIndex + 1;
                if (nextPageIndex < teamMemberData.length) {
                    const nextPage = teamMemberData[nextPageIndex];
                    const newMembers = nextPage.data.content.map(member => ({
                        id: member.memberId,
                        name: member.nickname,
                        profileImage: member.profileImageUrl,
                        role: "member"
                    }));
                    setDisplayedMembers(prev => [...prev, ...newMembers]);
                    setAllMembers(prev => [...prev, ...newMembers]);
                    setCurrentPageIndex(nextPageIndex);
                    setHasMore(!nextPage.data.last);
                }
            }
        };
    
        listEl.addEventListener('scroll', handleScroll);
        return () => listEl.removeEventListener('scroll', handleScroll);
    }, [hasMore, currentPageIndex]);
    
    useEffect(() => {
        if (projectData && projectData.content) {
            const myProjectsArray = [];
            const otherProjectsArray = [];
    
            projectData.content.forEach(project => {
                if (project.isParticipant) {
                    myProjectsArray.push(project);
                } else {
                    otherProjectsArray.push(project);
                }
            });
    
            setMyProjects(myProjectsArray);
            setOtherProjects(otherProjectsArray);
        }
    }, []);


    // <----------------------------------API 연결시 필요하면 수정 -------------------------------------->
    // <--------------------------------------------여기 위까지 끝-------------------------------------->

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

    const handleEmojiClick = (emojiData) => {
        setTeamInfo((prev) => ({ ...prev, teamEmoji: emojiData.emoji }));
        setShowEmojiPicker(false); // 이모지 선택 후 Picker 닫기
    };

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
                    {teamInfo.teamEmoji}
                    <Image 
                        src="/img/emoji_edit.png" 
                        alt="Edit" 
                        width={35} 
                        height={35} 
                    />
                    </T.EmojiBox>
                </T.TitleLeft>
                    
                    <T.TitleRight>
                        <T.TitleRow>
                        {isEditing ? (
                            <T.StyledInput
                                type="text"
                                value={teamInfo.teamName}
                                onChange={(e) => setTeamInfo({ ...teamInfo, teamName: e.target.value })} 
                                onKeyDown={handleKeyDown}
                                autoFocus
                                style={{
                                    height: "35px",
                                    fontSize: "27px",
                                    fontWeight: "bold",
                                    color: "#432CA4",
                                    marginBottom: "5px",
                                    marginLeft: "5px",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    padding: "0",
                                    lineHeight: "35px",
                                }}
                            />
                        ) : (
                            <T.Title style={{ height: "35px", lineHeight: "35px", marginBottom: "5px", marginLeft: "5px",}}>
                                {teamInfo.teamName}
                            </T.Title>
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
                                value={teamInfo.teamDescription}
                                onChange={(e) => setTeamInfo({ ...teamInfo, teamDescription: e.target.value })} 
                                onKeyDown={handleKeyDown}
                                style={{
                                    height: "25px", 
                                    fontSize: "15px",
                                    color: "#796AD9",
                                    marginTop: "5px",
                                    marginLeft: "10px",
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                    padding: "0",
                                    lineHeight: "25px"
                                }}
                            />
                        ) : (
                            <T.Subtitle style={{ height: "25px", lineHeight: "25px", marginTop: "5px" }}>
                                {teamInfo.teamDescription}
                            </T.Subtitle>
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
                    <EmojiPicker onEmojiClick={handleEmojiClick}/>
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
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
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
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <S.MemberItem key={member.id} style={{ position: "relative", marginLeft: index === 0 ? "0" : "-15px" }}>
                                <S.MemberProfile>
                                    <Image 
                                        src={member.profileImage ? member.profileImage : "/img/default_profile.png"}
                                        alt={member.name}
                                        width={50} 
                                        height={50} />
                                </S.MemberProfile>
                                {member.name ? (
                                <S.MemberName style={{ visibility: "hidden" }}>{member.name}</S.MemberName>
                                ) : (
                                <S.MemberName style={{ visibility: "hidden" }}>사용자</S.MemberName>
                                )}
                            </S.MemberItem>
                        ))}
                    </div>
                    </div>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <S.MemberDetail onClick={() => setIsDetailOpen(prev => !prev)}>더보기 </S.MemberDetail>
                        <S.MemberName style={{ visibility: "hidden" }}></S.MemberName>
                        <S.ToggleMemberList isOpen={isDetailOpen} ref={toggleListRef}>
                    {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
                     <--------------------------------------map 함수 부분--------------------------------------> */}
                        {allMembers.map((member, index) => (
                        <S.ToggleMemberItem key={`${member.id}-${index}`}>
                            <S.ToggleMemberImage>
                                <Image
                                    src={member.profileImage ? member.profileImage : "/img/default_profile.png"}
                                    alt={member.name || "사용자"}
                                    width={40}
                                    height={40}
                                    style={{
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        objectPosition: 'center', 
                                        width: '36px',
                                        height: '36px'
                                    }}
                                />
                            </S.ToggleMemberImage>
                            <S.ToggleMemberText>{member.name || "사용자"}</S.ToggleMemberText>
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
            {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
             <--------------------------------------map 함수 부분--------------------------------------> */}
            {myProjects.length > 0 ? (
                myProjects.map(project => (
                <S.ProjectBox key={project.projectInfo.projectId}>
                    <S.ProjectContent>
                    <S.ProjectTitle>{project.projectInfo.projectTitle}</S.ProjectTitle>
                    <S.ProjectInfo>
                        <S.ProjectDescription>
                            {project.projectInfo.projectDescription}
                        </S.ProjectDescription>
                    </S.ProjectInfo>
                    </S.ProjectContent>

                    {/* 유저가 프로젝트 팀장일 경우 */}
                    {project.isAdmin ? (
                        <>
                        <S.ProjectDivider1 />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                        <Link href={`/project/${project.projectInfo.projectId}`}>
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
                            <Link href={`/project/${project.projectInfo.projectId}`}>
                                <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                            </Link>
                            <LeaveProjectButton onClick={() => handleLeaveClick(project)} />
                        </div>
                        </>
                    )}
                </S.ProjectBox>
                ))
            ) : (
                <p style={{
                    marginTop: "30px",
                    textAlign: "center", 
                    fontSize: "16px", 
                    color: "#432CA4" 
                }}>
                    참여 중인 프로젝트가 없습니다.
                </p>
            )}
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
            {/* <----------------------------------API 연결시 필요하면 수정 --------------------------------------> 
             <--------------------------------------map 함수 부분--------------------------------------> */}
            {otherProjects.length > 0 ? (
                otherProjects.map((project) => (
                <S.ProjectBox key={project.projectInfo.projectId}>
                    <S.ProjectTitle>{project.projectInfo.projectTitle}</S.ProjectTitle>
                    <S.ProjectInfo>
                        <S.ProjectDescription>
                            {project.projectInfo.projectDescription}
                        </S.ProjectDescription>
                    </S.ProjectInfo>
                    <S.ProjectDivider2 />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <Link href={`/project/${project.projectInfo.projectId}/view`}>
                        <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                    </Link>
                    <JoinProjectButton 
                        onClick={() => handleClick(project.projectInfo.projectId)} 
                        isPending={pendingProjects[project.projectInfo.projectId]}
                    />
                    </div>
                </S.ProjectBox>
            ))
        ) : (
            <p style={{
                marginTop: "30px",
                textAlign: "center",  
                fontSize: "16px",
                color: "#432CA4"
            }}>
                참여하지 않은 타 프로젝트가 없습니다.
            </p>
        )}
        </S.SectionContainer>
        <c.Space />


        {/* 초대코드 생성 modal */}
        {inviteModal && 
        <InviteModal  
            onClose={() => setInviteModal(false)} 
        />}

        {/* 프로젝트 생성 modal */}
        {addModal && 
        <ProjectModal  
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