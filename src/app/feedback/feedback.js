"use client";

import { useState, useEffect } from "react";
import * as PR from './feedback_s';
import { ContentContainer, Space } from '@/components/common_s';
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

export default function PeerReview({ projectId, sprintId }) {
  const { showAlert } = useAlert();

  // 피드백 관련 상태
  const [feedbackList, setFeedbackList] = useState([]);
  const [lastFeedbackId, setLastFeedbackId] = useState(null);
  const [hasMoreFeedback, setHasMoreFeedback] = useState(true);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);

  // 피드백 조회 함수 (페이지네이션 적용; 예: size=5)
  const fetchFeedback = async () => {
    if (isFetchingFeedback || !hasMoreFeedback) return; // 이미 요청 중이거나 더 불러올 데이터 없음
    setIsFetchingFeedback(true);
    try {
      const res = await axiosWithAuthorization.get(`/feedbacks/${projectId}`, {
        params: {
          sprintId: sprintId,
          lastFeedbackId: lastFeedbackId,  // 첫 페이지일 경우 null
          size: 5,
        },
      });
      console.log("피드백 응답:", res.data);
      // 응답 구조: { data: { content: [...], last: true/false, ... }, ... }
      const newFeedback = res.data.data.content || [];
      const isLastPage = res.data.data.last;

      if (newFeedback.length === 0) {
        setHasMoreFeedback(false);
      } else {
        setFeedbackList((prev) => [...prev, ...newFeedback]);
        const nextLastId = newFeedback[newFeedback.length - 1].feedbackId;
        setLastFeedbackId(nextLastId);
      }
      if (isLastPage) {
        setHasMoreFeedback(false);
      }
    } catch (error) {
      showAlert("error", error.response?.data?.message || "피드백 조회 실패");
      console.log(error.response?.data);
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  // 스프린트가 변경되면 피드백 목록 상태 초기화 후 새로 조회
  useEffect(() => {
    setFeedbackList([]);
    setLastFeedbackId(null);
    setHasMoreFeedback(true);
    fetchFeedback();
  }, [sprintId]);

  return (
    <ContentContainer>
      <PR.PageContainer>
        <PR.Header>동료평가</PR.Header>
        {/* 스프린트 제목 및 피드백 목록 */}
        <PR.SprintTitle>
          <span>▼</span> Sprint {sprintId}
        </PR.SprintTitle>
        <PR.Table>
          <PR.TableHead>
            <tr>
              <PR.TableHeader style={{ width: "70px" }}>#</PR.TableHeader>
              <PR.TableHeader style={{ width: "120px", paddingLeft: "30px" }}>
                날짜
              </PR.TableHeader>
              <PR.TableHeader style={{ paddingLeft: "30px" }}>내용</PR.TableHeader>
            </tr>
          </PR.TableHead>
          <tbody>
            {feedbackList.map((feedback, index) => (
              <PR.TableRow key={feedback.feedbackId}>
                <PR.TableCell style={{ width: "20px" }}>
                  {index + 1}
                </PR.TableCell>
                <PR.TableCell style={{ width: "120px", paddingLeft: "15px" }}>
                  {feedback.receivedDt}
                </PR.TableCell>
                <PR.TableCell style={{ paddingLeft: "20px" }}>
                  {feedback.message}
                </PR.TableCell>
              </PR.TableRow>
            ))}
          </tbody>
        </PR.Table>
        {/* 추가 피드백이 있으면 "더보기" 버튼 */}
        {hasMoreFeedback && (
          <button onClick={fetchFeedback} disabled={isFetchingFeedback}>
            {isFetchingFeedback ? "로딩중..." : "더보기"}
          </button>
        )}
      </PR.PageContainer>
      <Space />
    </ContentContainer>
  );
}
