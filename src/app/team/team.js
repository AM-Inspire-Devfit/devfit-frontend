"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

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

import { fetchUserData } from "../api/user/userApi";
import { fetchTeamData, fetchTeamCode, updateTeamData, fetchTeamAdmin, fetchTeamMembers} from "@/app/api/team/teamApi";
import { fetchProjectListData } from "@/app/api/project/projectApi";

import { useAlert } from "@/context/AlertContext";

import axiosWithAuthorization from "@/context/axiosWithAuthorization";



export default function Team({ teamId }) {
    const { showAlert } = useAlert();

    const [currentUser, setCurrentUser] = useState(null);
    const [allMembers, setAllMembers] = useState([]);

    const [teamInfo, setTeamInfo] = useState(null);

    const [hasMore, setHasMore] = useState(true);
    const [myProjects, setMyProjects] = useState([]);
    const [otherProjects, setOtherProjects] = useState([]);

    const [isEditing, setIsEditing] = useState(false);

    const [inviteCode, setInviteCode] = useState(null);
    const [inviteCodeError, setInviteCodeError] = useState("");

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

    const [teamAdmin, setTeamAdmin] = useState(null);

    const [teamMembers, setTeamMembers] = useState([]);
    const [displayedMembers, setDisplayedMembers] = useState([]);
    const [hasMoreMembers, setHasMoreMembers] = useState(true);

    const [lastProjectId, setLastProjectId] = useState(null); 
    const [lastMemberId, setLastMemberId] = useState(null);

    const [teamErrorMessage, setTeamErrorMessage] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [isMembersFetching, setIsMembersFetching] = useState(false);
    
    const TeamId = Number(teamId);
    const normalizeJoinStatus = (status) => status ?? "NONE";

    useEffect(() => {
        const getUserInfo = async () => {
            try {
            const user = await fetchUserData();
            setCurrentUser(user);
            } catch (error) {
            showAlert("error", error.message);
            }
        };
    
        getUserInfo();
    }, []);

    const getTeamAdmin = async () => {
        try {
            const adminData = await fetchTeamAdmin(TeamId); // teamId 넘기기
            setTeamAdmin({
                id: adminData.memberId,
                name: adminData.nickname,
                profileImage: adminData.profileImageUrl,
            });
        } catch (error) {
            showAlert("error", error.message);
        }
    };

    useEffect(() => {
        console.log("currentUser:", currentUser);
        console.log("teamAdmin:", teamAdmin);
    }, [currentUser, teamAdmin]);

    useEffect(() => {
        if (!TeamId) return;

        const getTeamInfo = async () => {

        try {
            const teamData = await fetchTeamData(TeamId); 
            setTeamInfo(teamData);  
            setTeamErrorMessage("");                
        } catch (error) {
            showAlert("error", error.message);
        }
        };
        
        getTeamInfo();
    }, [TeamId]);

    // 초대코드 생성 모달
    const handleInviteClick = async () => {
        try {
            const code = await fetchTeamCode(TeamId);
            setInviteCode(code);
            setInviteCodeError("");
        } catch (error) {
            setInviteCode(null);
            setInviteCodeError(error.message);
        } finally {
            setInviteModal(true);
        }
    };
    //project 가입 신청
    const requestProjectJoin = async (projectId) => {
        try {
            const res = await axiosWithAuthorization.post(`/projects/${projectId}/registration`);
            return res.data;
        } catch (error) {
            throw error.response?.data || error; // 명시적으로 throw
        }
    };

      const cancelProjectJoin = async (projectId) => {
        try {
          const res = await axiosWithAuthorization.delete(
            `/projects/${projectId}/registration/cancel`
          );
          return res.data;
        } catch (error) {
            showAlert("error", error.response.data.data.message||"잠시 뒤 다시 시도해주세요");
        }
      };

    useEffect(() => {
        if (!TeamId) return;
    
        getTeamAdmin();
    }, [TeamId]);

    const getTeamMembers = async () => {
        if (isMembersFetching || !hasMoreMembers) return; 
    
        setIsMembersFetching(true);
        try {
            const res = await fetchTeamMembers(TeamId, lastMemberId); 
    
            const nMembers = res.members || [];
            const isLastPage = res.isLastPage;
    
            const formattedMembers = nMembers.map((member) => ({
                ...member,
                role: "member",
            }));
    
            setTeamMembers((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const uniqueNew = formattedMembers.filter((m) => !existingIds.has(m.id));
                return [...prev, ...uniqueNew];
            });
          
            setDisplayedMembers((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const uniqueNew = formattedMembers.filter((m) => !existingIds.has(m.id));
                return [...prev, ...uniqueNew];
            });
    
            if (formattedMembers.length > 0) {
                const nextLastId = formattedMembers[formattedMembers.length - 1].id;
                setLastMemberId(nextLastId); 
            }
    
            if (isLastPage) {
                setHasMoreMembers(false);
            }

        } catch (error) {
            showAlert("error", error.message);
        } finally {
            setIsMembersFetching(false);
        }
    };

    useEffect(() => {
        if (!TeamId) return;
        getTeamMembers();
    }, [TeamId]);

    useEffect(() => {
        if (teamAdmin) {
            setAllMembers([teamAdmin, ...displayedMembers]);
        }
    }, [teamAdmin, displayedMembers]);
    const toggleListRef = useRef(null);

    const handleMemberScroll = () => {
        if (!hasMoreMembers || isMembersFetching) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            getTeamMembers(); 
        }
    };

    // 팀원 스크롤 이벤트
    useEffect(() => {
        window.addEventListener("scroll", handleMemberScroll);
        return () => window.removeEventListener("scroll", handleMemberScroll);
    }, [hasMoreMembers, isMembersFetching, lastMemberId]); 


    const fetchAllProjects = async () => {
        if (isFetching || !hasMore) return; 
        setIsFetching(true);
        
        try {
            const res = await fetchProjectListData(TeamId, null, lastProjectId, 10);
            const content = res?.content || [];

            if (content.length === 0) {
                setHasMore(false);
                return;
            }

            const newMyProjects = [];
            const newOtherProjects = [];

            content.forEach(project => {
                const status = project.currentUserParticipation?.status ?? "NONE";
                const newProject = {
                    ...project,

                };
            
                if (project.isParticipant) {
                    if (status === "INACTIVE") {
                        newOtherProjects.push(newProject);
                    } else {
                        newMyProjects.push(newProject);
                    }
                } else {
                    newOtherProjects.push(newProject);
                }
            });
            
            setMyProjects((prev) => {
                const existingIds = new Set(prev.map(p => p.projectInfo.projectId));
                const uniqueNew = newMyProjects.filter(p => !existingIds.has(p.projectInfo.projectId));
                return [...prev, ...uniqueNew];
            });
            
            setOtherProjects((prev) => {
                const existingIds = new Set(prev.map(p => p.projectInfo.projectId));
                const uniqueNew = newOtherProjects.filter(p => !existingIds.has(p.projectInfo.projectId));
                return [...prev, ...uniqueNew];
            });

            const last = content[content.length - 1];
            setLastProjectId(last.projectInfo.projectId);
            if (res.last) setHasMore(false);
        } catch (error) {
            showAlert("error", error.message);
            setHasMore(false);
        } finally {
            setIsFetching(false); // 호출 종료
        }
    };

    const handleScroll = () => {
        if (!hasMore || isFetching) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            fetchAllProjects();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, isFetching]);

    const refreshProjectList = async () => {
        setMyProjects([]);
        setOtherProjects([]);
        setLastProjectId(null);
        setHasMore(true);
        await fetchAllProjects();
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
    
        if (leaveModal || inviteModal || addModal || deleteModal) {
            disableScroll();
        } else {
            enableScroll();
        }
    
        return () => enableScroll();
    }, [leaveModal, inviteModal, addModal, deleteModal]);


    const handleEditClick = () => {
        // 편집 중이면 저장, 아니면 편집 시작
        if (isEditing) {
            saveTeamInfo();
        } else {
            setIsEditing(true);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            saveTeamInfo();
        }
    };

    const originalTeamName = useRef("");

    // 팀 정보 로드 시 초기 값 저장
    useEffect(() => {
        if (teamInfo) {
            originalTeamName.current = teamInfo.teamName;
        }
    }, [teamInfo]);
    
    const saveTeamInfo = async () => {
        const name = teamInfo.teamName?.trim();
        const desc = teamInfo.teamDescription?.trim(); 
    
        if (!name) {
            alert("팀 이름은 필수입니다.");

            try {
                const latestTeamInfo = await fetchTeamData(TeamId);

                // 원래 팀 이름으로만 수정 요청, 설명은 유지
                const updated = await updateTeamData(TeamId, latestTeamInfo.teamName, desc, null);

                setTeamInfo(updated);
                originalTeamName.current = updated.teamName;
            } catch (error) {
                showAlert("error", "팀 정보를 다시 불러오는 데 실패했습니다.");
            }
    
            setIsEditing(false);
            return;
        }
    
        try {
            const updated = await updateTeamData(TeamId, name, desc, null);
            setTeamInfo(updated);
            originalTeamName.current = updated.teamName;
            setIsEditing(false);
            showAlert("success", "팀 정보가 수정되었습니다.");
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEmojiClick = async (emojiData) => {
        const newEmoji = emojiData.emoji?.trim(); 
    
        try {
            const updated = await updateTeamData(TeamId, null, null, newEmoji);
    
            setTeamInfo((prev) => ({
                ...prev,
                teamEmoji: updated.teamEmoji, 
            }));
            showAlert("success", "이모지가 수정되었습니다.");
        } catch (error) {
            showAlert("error", error.message);
        }
    
        setShowEmojiPicker(false); // emoji Picker 닫기
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
    const handleClick = async (project) => {
        const projectId = project.projectInfo.projectId;
        const status = normalizeJoinStatus(project.joinStatus);
    
        if (pendingProjects[projectId]) return;
    
        setPendingProjects((prev) => ({
            ...prev,
            [projectId]: true,
        }));
    
        try {
            let updatedJoinStatus;
    
            if (status === "PENDING") {
                await cancelProjectJoin(projectId);
                updatedJoinStatus = "NONE";
                showAlert("success", "가입 신청이 취소되었습니다.");
            } else {
                await requestProjectJoin(projectId);
                updatedJoinStatus = "PENDING";
                showAlert("success", "가입 신청이 완료되었습니다.");
            }
    
            console.log(`프로젝트 ${projectId}의 새로운 상태:`, updatedJoinStatus);
    
            // 상태 업데이트
            setOtherProjects((prev) =>
                prev.map((p) => {
                    if (p.projectInfo.projectId === projectId) {
                        return {
                            ...p,
                            joinStatus: updatedJoinStatus,
                            currentUserParticipation: {
                                ...(p.currentUserParticipation || {}),
                                status: updatedJoinStatus, 
                            },
                        };
                    }
                    return p;
                })
            );
        } catch (error) {
            showAlert("error", error.message || "오류가 발생했습니다.");
        } finally {
            setPendingProjects((prev) => ({
                ...prev,
                [projectId]: false,
            }));
        }
    };
    
    
    
    

    // 멤버 이름 3글자 이상이면 축약 표시
    const reduceMemberName = (name) => {
        return name.length > 3 ? name.slice(0, 3) + ".." : name;

    };

    // 프로젝트 이름 7글자 이상이면 축약 표시
    const reduceProjectName = (name) => {
        return name.length > 5 ? name.slice(0, 5) + ".." : name;
    };
    
    if (!teamInfo) {
        return (
            <c.ContentContainer>
            </c.ContentContainer>
        );
    }
    

    return (

        <c.ContentContainer>
            <T.TitleContainer>
                <T.TitleLeft>
                <T.EmojiBox
                    ref={emojiBoxRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        updatePickerPosition();
                        if (currentUser?.memberId === teamAdmin?.id) {
                        setShowEmojiPicker((prev) => !prev);
                        }
                    }}
                    style={{ cursor: currentUser?.memberId === teamAdmin?.id ? "pointer" : "default" }}
                >
                    {teamInfo.teamEmoji}
                    {currentUser?.memberId === teamAdmin?.id && (
                    <Image 
                        src="/img/emoji_edit.png" 
                        alt="Edit" 
                        width={35} 
                        height={35} 
                    />
                    )}
                    </T.EmojiBox>
                </T.TitleLeft>
                    
                    <T.TitleRight>
                        <T.TitleRow>
                        {isEditing ? (
                            <T.StyledInput
                                type="text"
                                value={teamInfo.teamName}
                                onChange={(e) =>
                                    setTeamInfo((prev) => ({
                                        ...prev,
                                        teamName: e.target.value,
                                    }))
                                }
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
                                maxLength={15}
                            />
                        ) : (
                            <T.Title style={{ height: "35px", lineHeight: "35px", marginBottom: "5px", marginLeft: "5px",}}>
                                {teamInfo.teamName}
                            </T.Title>
                        )}
                        {currentUser?.memberId === teamAdmin?.id && (
                        <Image
                            src="/img/edit.png"
                            alt="Edit"
                            width={20}
                            height={20}
                            onClick={handleEditClick}
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                        />
                        )}
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
                                    lineHeight: "25px",
                                    width: "600px",
                                }}
                                maxLength={100}
                            />
                        ) : (
                            <T.Subtitle 
                            style={{ 
                                height: "25px", 
                                lineHeight: "25px", 
                                marginTop: "5px",
                                width: "600px",
                                color: teamInfo.teamDescription ? "#796AD9" : "#A9A9A9", 
                                fontStyle: teamInfo.teamDescription ? "normal" : "italic" 
                            }}>
                                {teamInfo.teamDescription || "팀에 대한 설명을 추가하세요! (100자 이내)"}
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
                {currentUser?.memberId === teamAdmin?.id && (
                <T.Button onClick={handleInviteClick}>
                    초대코드 확인
                </T.Button>
                )}
            </S.SectionHeaderWrapper>
            <S.Divider2 />
                <S.MemberList>
                    {/* <------------------------------------ 팀 리더 --------------------------------------> */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginLeft: "20px" }}>
                        {teamAdmin && (
                            <S.MemberItem key={teamAdmin.id}>
                                <S.MemberProfile isLeader={true}>
                                <Image 
                                    src={teamAdmin.profileImage ? teamAdmin.profileImage : "/img/default_profile.png"}
                                    alt={teamAdmin.name || "사용자"} 
                                    width={50} height={50} 
                                />
                                </S.MemberProfile>
                                <S.MemberName isLeader={true}>{reduceMemberName(teamAdmin.name)}</S.MemberName>
                            </S.MemberItem>
                        )}
                    {/* <------------------------------------ 팀원들(3명) --------------------------------------> */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "30px", marginBottom: "20px"}}>
                        {teamMembers.slice(0, 3).map((member, index) => (
                            <S.MemberItem 
                                key={member.id} 
                                style={{ position: "relative", marginLeft: index === 0 ? "0" : "-22px" }}>
                                <S.MemberProfile>
                                    <Image 
                                        src={member.profileImage ? member.profileImage : "/img/default_profile.png"}
                                        alt={member.name}
                                        width={50} 
                                        height={50} />
                                </S.MemberProfile>
                                
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
                            <S.ToggleMemberText>{reduceMemberName(member.name)|| "사용자"}</S.ToggleMemberText>
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
                <S.ProjectBox key={`my-${project.projectInfo.projectId}`}>
                    <S.ProjectContent>
                    <S.ProjectTitle>{reduceProjectName(project.projectInfo.projectTitle)}</S.ProjectTitle>
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
                        <Link 
                            href={{
                                pathname: `/project/${project.projectInfo.projectId}`,
                                query: {
                                    teamName: teamInfo.teamName,
                                },
                            }}
                        >
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
                            <Link 
                                href={{
                                    pathname: `/project/${project.projectInfo.projectId}`,
                                    query: {
                                        teamName: teamInfo.teamName,
                                    },
                                }}
                            >
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
                <S.ProjectBox key={`other-${project.projectInfo.projectId}`}>
                    <S.ProjectTitle>{reduceProjectName(project.projectInfo.projectTitle)}</S.ProjectTitle>
                    <S.ProjectInfo>
                        <S.ProjectDescription>
                            {project.projectInfo.projectDescription}
                        </S.ProjectDescription>
                    </S.ProjectInfo>
                    <S.ProjectDivider2 />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <Link 
                        href={{
                            pathname: `/project/${project.projectInfo.projectId}/view`,
                            query: {
                                teamName: teamInfo.teamName,
                            },
                        }}
                    >
                        <S.ProjectHButton>프로젝트 홈</S.ProjectHButton>
                    </Link>
                    <JoinProjectButton 
                        onClick={() => handleClick(project)} 
                        isPending={pendingProjects[project.projectInfo.projectId]}
                        joinStatus={normalizeJoinStatus(project.joinStatus ?? project.currentUserParticipation?.status)}
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
            inviteCode={inviteCode}
            inviteCodeError={inviteCodeError}
            onClose={() => setInviteModal(false)} 
        />}

        {/* 프로젝트 생성 modal */}
        {addModal && 
        <ProjectModal  
            teamId={TeamId} 
            onClose={() => setAddModal(false)} 
            onProjectCreated={refreshProjectList}
        />}

        {/* 프로젝트 삭제 modal */}
        {deleteModal && selectedProject && (
        <DeleteModal 
            selectedProject={selectedProject} 
            onClose={() => setDeleteModal(false)}
            onProjectDeleted={refreshProjectList}
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