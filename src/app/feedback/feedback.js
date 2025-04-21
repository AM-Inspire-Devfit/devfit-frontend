"use client";

import { useState, useEffect } from "react";
import * as PR from './feedback_s';
import { ContentContainer, Space } from '@/components/common_s';
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

import { fetchSprintIdTitle } from "../api/sprint/sprintApi";

export default function PeerReview({ projectId }) {
  const { showAlert } = useAlert();

  const [sprints, setSprints] = useState([]); // sprintId & title
  const [openFeedback, setOpenFeedback] = useState({}); 
  const [feedbackMap, setFeedbackMap] = useState({});
  const [lastFeedbackIdMap, setLastFeedbackIdMap] = useState({});
  const [hasMoreMap, setHasMoreMap] = useState({});
  const [isFetchingMap, setIsFetchingMap] = useState({});

  useEffect(() => {
    const loadSprints = async () => {
      try {
        const sprintList = await fetchSprintIdTitle(projectId);
        setSprints(sprintList);
      } catch (err) {
        showAlert("error", err.message);
      }
    };
    loadSprints();
  }, [projectId]);

  const toggleFeedback = async (sprintId) => {
    setOpenFeedback(prev => ({
      ...prev,
      [sprintId]: !prev[sprintId]
    }));
  
    if (!feedbackMap[sprintId]) {
      await fetchFeedback(sprintId);
    }
  };
  
  const fetchFeedback = async (sprintId) => {
    if (isFetchingMap[sprintId] || hasMoreMap[sprintId] === false) return;
  
    setIsFetchingMap(prev => ({ ...prev, [sprintId]: true }));
    try {
      const res = await axiosWithAuthorization.get(`/feedbacks/${projectId}`, {
        params: {
          sprintId: sprintId,
          lastFeedbackId: lastFeedbackIdMap[sprintId] || null,
          size: 5,
        },
      });
  
      const newFeedback = res.data.data.content || [];
      const isLastPage = res.data.data.last;
  
      setFeedbackMap(prev => ({
        ...prev,
        [sprintId]: [...(prev[sprintId] || []), ...newFeedback],
      }));
  
      if (newFeedback.length > 0) {
        setLastFeedbackIdMap(prev => ({
          ...prev,
          [sprintId]: newFeedback[newFeedback.length - 1].feedbackId,
        }));
      }
  
      setHasMoreMap(prev => ({ ...prev, [sprintId]: !isLastPage }));
    } catch (err) {
      showAlert("error", err.response?.data?.message || "피드백 조회 실패");
    } finally {
      setIsFetchingMap(prev => ({ ...prev, [sprintId]: false }));
    }
  };

  return (
    <ContentContainer>
        <PR.PageContainer>
            <PR.Header>동료평가</PR.Header>

            {sprints.length === 0 ? (
              <PR.EmptyMessage>받은 동료 평가 메세지가 존재하지 않습니다</PR.EmptyMessage>
            ) : (
              sprints.map(({ sprintId, title }) => (
                    <div key={sprintId}>
                      <PR.SprintTitle onClick={() => toggleFeedback(sprintId)}>
                        <span>{openFeedback[sprintId] ? "▼" : "▶"}</span>
                        Sprint {title}
                      </PR.SprintTitle>                  

                    { openFeedback[sprintId] && (
                    <PR.Table>
                        <PR.TableHead>
                            <tr>
                                <PR.TableHeader
                                    style= {{
                                        width: "70px"
                                    }}>
                                    #
                                </PR.TableHeader>
                                <PR.TableHeader
                                    style= {{
                                        width: "120px",
                                        paddingLeft: "30px"
                                    }}>
                                        날짜
                                </PR.TableHeader>
                                <PR.TableHeader
                                style= {{
                                    paddingLeft: "30px"
                                }}>
                                    내용
                                </PR.TableHeader>
                            </tr>
                        </PR.TableHead>
                        <tbody>
                            {(feedbackMap[sprintId] || []).map((feedback, index) => (
                                <PR.TableRow key={feedback.feedbackId}>
                                    <PR.TableCell
                                        style= {{
                                            width: "20px"
                                        }}>
                                        {index + 1}
                                    </PR.TableCell>
                                    <PR.TableCell
                                        style= {{
                                            width: "120px",
                                            paddingLeft: "15px"
                                        }}>
                                        {feedback.receivedDt}
                                    </PR.TableCell>
                                    <PR.TableCell
                                        style= {{
                                            paddingLeft: "20px"
                                        }}>
                                        {feedback.message}
                                    </PR.TableCell>
                                </PR.TableRow>
                            ))}
                        </tbody>
                    </PR.Table>
                    )}
                </div>
              ))
            )}
        </PR.PageContainer>
        <Space />
    </ContentContainer>
  );
}