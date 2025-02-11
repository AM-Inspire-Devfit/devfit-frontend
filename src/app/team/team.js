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
    Divider2
} from './section_s'

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

    const leaders = members.filter(member => member.role === "leader");
    const teamMembers = members.filter(member => member.role === "member");
    const allMembers = [...leaders, ...teamMembers];

    // 팀원 수가 3명 미만이면 전체 팀원 표시
    const randomMembers = teamMembers.length >= 3 
        ? [...teamMembers].sort(() => Math.random() - 0.5).slice(0, 3) 
        : teamMembers;  

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
                                <MemberProfile>
                                <Image src={leader.profileImage} alt={leader.name} width={50} height={50} />
                                </MemberProfile>
                                <MemberName>{leader.name}</MemberName>
                            </MemberItem>
                        ))}
                    </div>
                    {/* 팀원들 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0px", marginLeft: "auto" }}>
                        {randomMembers.map((member, index) => (
                            <MemberItem key={member.id} style={{ marginLeft: index === 0 ? "0px" : "-15px" }}>
                                <MemberProfile style={{ position: "relative" }}>
                                    <Image src={member.profileImage} alt="Member" width={50} height={50} />
                                </MemberProfile>
                                <MemberName style={{ visibility: "hidden" }}>이름</MemberName>
                            </MemberItem>
                        ))}
                    </div>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <MemberDetail onClick={() => setIsDetailOpen(prev => !prev)}>· · · </MemberDetail>
                        <MemberName style={{ visibility: "hidden" }}>이름</MemberName>
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
            </SectionContainer>


            <SectionContainer>
            <SectionHeaderWrapper>
                <SectionHeaderContainer>
                <SectionHeader>타 프로젝트</SectionHeader>
                </SectionHeaderContainer>
            </SectionHeaderWrapper>
            <Divider2 />
            </SectionContainer>

        </ContentContainer>
    );

}