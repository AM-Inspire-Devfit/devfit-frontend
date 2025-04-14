"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import * as MS from "./message_s";
import { ContentContainer, Space } from "@/components/common_s";
import Image from "next/image";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

export default function Message({}) {
  const [message, setMessage] = useState("");
  const [gptMessage, setGptMessage] = useState("");
  const [isLoadingRefinement, setIsLoadingRefinement] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();

  const searchParams = useSearchParams();
  const memberName = searchParams.get("name");
  const profileImage = searchParams.get("profileImage");
  const sprintId = searchParams.get("sprintId");
  const receiverId = searchParams.get("receiverId");

  const handleRefinement = async () => {
    if (!message.trim()) {
      showAlert("error", "먼저 메시지를 작성해주세요.");
      return;
    }
    setIsLoadingRefinement(true);
    try {
      const res = await axiosWithAuthorization.post("/feedbacks/refinement", {
        originalMessage: message,
      });

      const improvedMessage = res.data.data?.refinedMessage;
      if (improvedMessage) {
        console.log(improvedMessage)
        setGptMessage(improvedMessage);
      } else {
        showAlert("error", "개선된 메시지를 받지 못했습니다.");
      }
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "피드백 개선 요청 실패"
      );
    } finally {
      setIsLoadingRefinement(false);
    }
  };

  // 개선된 메시지 전송(API: /feedbacks/sent) 요청 핸들러
  const handleSendFeedback = async () => {
    if (!gptMessage.trim()) {
      showAlert("error", "먼저 개선된 메시지를 작성해주세요.");
      return;
    }
    try {
      await axiosWithAuthorization.post("/feedbacks/sent", {
        sprintId: Number(sprintId),
        receiverId: Number(receiverId),
        message: gptMessage,
      });
      showAlert("success", "피드백 전송 완료");
      // 전송 후 이전 페이지로 이동하거나 원하는 동작을 수행
      router.back();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "피드백 전송 실패"
      );
    }
  };

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
          <MS.SendButton onClick={handleRefinement}>
            {isLoadingRefinement ? "요청중..." : "작성완료"}
          </MS.SendButton>
        </MS.MessageBox>

        {/* GPT의 응답이 있을 때만 GPTMessageBox를 렌더링 */}
        {gptMessage && (
          <MS.GPTMessageBox>
            <MS.Title style={{ color: "#4438a6" }}>GPT 생성 답변</MS.Title>
            <MS.GPTTextArea
              value={gptMessage}
              onChange={(e) => setGptMessage(e.target.value)}
              maxLength={600}
            />
            <MS.ButtonWrapper>
              <MS.EditButton>수정하기</MS.EditButton>
              <MS.GSendButton onClick={handleSendFeedback}>
                전송하기
              </MS.GSendButton>
            </MS.ButtonWrapper>
          </MS.GPTMessageBox>
        )}
      </MS.Container>
      <Space />
    </ContentContainer>
  );
}
