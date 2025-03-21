"use client";

import { useState } from "react";
import * as PR from './feedback_s';
import { ContentContainer, Space } from '@/components/common_s';


const feedbackData = {
    1: {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "feedbackId": 3,
            "message": "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!",
            "receivedDt": "2025-03-17"
            },
            {
            "feedbackId": 2,
            "message": "이번 프로젝트에서 협업 방식이 좋았습니다!",
            "receivedDt": "2025-03-17"
            },
            {
            "feedbackId": 4,
            "message": "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!",
            "receivedDt": "2025-03-17"
            },
            {
            "feedbackId": 5,
            "message": "이번 프로젝트에서 협업 방식이 좋았습니다!",
            "receivedDt": "2025-03-17"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 2,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": true,
        "last": false,
        "size": 2,
        "number": 0,
        "sort": [],
        "numberOfElements": 2,
        "empty": false
        },
        "timestamp": "2025-03-17T21:32:43.731566"
    },
    2: {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "feedbackId": 3,
            "message": "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!",
            "receivedDt": "2025-03-17"
            },
            {
            "feedbackId": 2,
            "message": "이번 프로젝트에서 협업 방식이 좋았습니다!",
            "receivedDt": "2025-03-17"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 2,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": true,
        "last": false,
        "size": 2,
        "number": 0,
        "sort": [],
        "numberOfElements": 2,
        "empty": false
        },
        "timestamp": "2025-03-17T21:32:43.731566"
    },
    3: {
        "success": true,
        "status": 200,
        "data": {
        "content": [
            {
            "feedbackId": 3,
            "message": "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!",
            "receivedDt": "2025-03-17"
            },
            {
            "feedbackId": 2,
            "message": "이번 프로젝트에서 협업 방식이 좋았습니다!",
            "receivedDt": "2025-03-17"
            }
        ],
        "pageable": {
            "pageNumber": 0,
            "pageSize": 2,
            "sort": [],
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "first": false,
        "last": true,
        "size": 2,
        "number": 0,
        "sort": [],
        "numberOfElements": 2,
        "empty": false
        },
        "timestamp": "2025-03-17T21:32:43.731566"
    },         
}

export default function PeerReview() {

    const [openFeedback, setOpenFeedback] = useState({});

    const toggleFeedback = (sprintNum) => {
        setOpenFeedback(prev => ({
            ...prev,
            [sprintNum]: !prev[sprintNum]
        }));
    };

    return (
        <ContentContainer>
            <PR.PageContainer>
                <PR.Header>동료평가</PR.Header>

                {Object.entries(feedbackData).map(([sprintNum, sprintData]) => {
                    const feedbackList = sprintData.data.content;

                    return (
                        <div key={sprintNum}>
                        <PR.SprintTitle onClick={() => toggleFeedback(sprintNum)}>
                            <span>{openFeedback[sprintNum] ? "▼" : "▶"}</span>
                            Sprint {sprintNum}
                        </PR.SprintTitle>

                        {openFeedback[sprintNum] && (
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
                                {feedbackList.map((feedback, index) => (
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
                    );
                })}
            </PR.PageContainer>
            <Space />
        </ContentContainer>
    )
}