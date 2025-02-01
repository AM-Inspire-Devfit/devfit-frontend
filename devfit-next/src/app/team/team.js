"use client";

import { useState } from "react";
import {
    ContentContainer,
    TitleContainer,
    TitleRow,
    Title,
    Title2,
    Divider,
    Subtitle,
    StyledInput,
    TeamContainer,
    Button,
    ProjectBox
} from './team_s'

import Image from "next/image";

export default function Team() {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("SideEffect");
    const [subtitle, setSubtitle] = useState("Lg CNS AM Inspire Camp 1기 스터디그룹 2조");

    const handleEditClick = () => {
        setIsEditing((prev) => !prev); 
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false);
        }
    };

    return (

        <ContentContainer>
            <TitleContainer>
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
                        width={30}
                        height={30}
                        onClick={handleEditClick}
                        style={{ cursor: "pointer" }}
                    />
                </TitleRow>
                <Divider />
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
            </TitleContainer>

            <TeamContainer>
                <TitleRow>
                    <Title2>팀원</Title2>
                    <Button>초대하기</Button>
                </TitleRow>
                <Divider />
            </TeamContainer>


            <TeamContainer>
                <TitleRow>
                    <Title2>프로젝트</Title2>
                    <Button>추가하기</Button>
                </TitleRow>
                <Divider />
                <ProjectBox/>
            </TeamContainer>
        </ContentContainer>
    );

}