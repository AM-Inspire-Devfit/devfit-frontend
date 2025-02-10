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
    Divider,
    Subtitle,
    StyledInput,
    TeamContainer,
    Button,
    ProjectBox
} from './team_s'

import Image from "next/image";
import EmojiPicker from "emoji-picker-react";

export default function Team() {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("SideEffect");
    const [subtitle, setSubtitle] = useState("Lg CNS AM Inspire Camp 1기 스터디그룹 2조");

    const [chosenEmoji, setChosenEmoji] = useState("🍇"); // sideEffect 디폴트 이모지
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef(null);

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
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
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
                        <EmojiBox onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            {chosenEmoji}
                            <Image src="/img/emoji_edit.png" alt="Edit" width={35} height={35} />
                        </EmojiBox>
                        {showEmojiPicker && (
                            <EmojiPickerContainer ref={emojiPickerRef}>
                                <EmojiPicker onEmojiClick={onEmojiClick} />
                            </EmojiPickerContainer>
                        )}
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
                    </TitleRight>
            </TitleContainer>
        </ContentContainer>
    );

}