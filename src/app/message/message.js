"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import * as MS from './message_s';
import { ContentContainer, Space } from '@/components/common_s';
import Image from "next/image";

export default function Message({ }) {
    const [message, setMessage] = useState("");
    const [gptMessage, setGptMessage] = useState("현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!");
    const router = useRouter();

    const searchParams = useSearchParams();
    const memberName = searchParams.get("name");
    const profileImage = searchParams.get("profileImage");

    return (
        <ContentContainer>
            <MS.Container>
                <MS.ProfileImageWrapper>
                    <MS.ProfileImageBorder>
                        <MS.ProfileImage 
                            src={profileImage} 
                            alt={`${memberName}의 프로필`} 
                        />
                    </MS.ProfileImageBorder>
                </MS.ProfileImageWrapper>

                <MS.MessageBox>
                    <MS.Title>{memberName}(님)에게 전할 메시지를 적어보세요!</MS.Title>
                    <MS.TextArea
                        placeholder="메세지를 입력하세요 (300자 이내)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={300}
                    />
                    <MS.SendButton>작성완료</MS.SendButton>
                </MS.MessageBox>

                <MS.GPTMessageBox>
                    <MS.Title
                        style={{
                            color: "#4438a6"
                        }}
                    >
                        GPT 생성 답변
                    </MS.Title>
                    <MS.GPTTextArea
                        value={gptMessage}
                        onChange={(e) => setGptMessage(e.target.value)}
                        maxLength={600}
                    />
                    <MS.ButtonWrapper>
                        <MS.EditButton>수정하기</MS.EditButton>
                        <MS.GSendButton>전송하기</MS.GSendButton>
                    </MS.ButtonWrapper>
                </MS.GPTMessageBox>
            </MS.Container>
        </ContentContainer>
    )

}
