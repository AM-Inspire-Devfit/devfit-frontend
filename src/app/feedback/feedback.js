"use client";

import { useState } from "react";
import * as PR from './feedback_s';
import { ContentContainer, Space } from '@/components/common_s';

const feedbackData = [
    {
        sprint: [

            { 
                sprint_num : 1,
                feedback: [
                    {
                        id: 1,
                        date: "2025-03-04",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 2,
                        date: "2025-03-05",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 3,
                        date: "2025-03-06",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 4,
                        date: "2025-03-06",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                ],
            },
            { 
                sprint_num : 2,
                feedback: [
                    {
                        id: 1,
                        date: "2025-03-04",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 2,
                        date: "2025-03-05",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 3,
                        date: "2025-03-06",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                ],
            },
            { 
                sprint_num : 3,
                feedback: [
                    {
                        id: 1,
                        date: "2025-03-04",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 2,
                        date: "2025-03-05",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                    {
                        id: 3,
                        date: "2025-03-06",
                        message: "현태님, 이번 프로젝트 동안 커뮤니케이션 부분에서 조금 아쉬운 점이 있었습니다. 중요한 회의에 참석하지 못한 경우가 있었고, 공유된 정보를 확인하는 데에 조금 더 주의를 기울인다면 작업이 더욱 원활하게 진행될 수 있을 것입니다. 맡은 역할을 좀 더 충실히 수행하면 전체 팀의 부담을 줄이는 데 큰 도움이 될 것입니다. 다음 프로젝트에서는 더욱 적극적으로 협업하며 소통을 강화해 주시면 좋겠습니다. 함께 일하는 데 아주 긍정적인 영향을 미칠 것이라 믿습니다!"
                    },
                ],
            },
        ]
    }
]

export default function PeerReview() {

    const [openFeedback, setOpenFeedback] = useState(null);

    const toggleFeedback = (sprintNum) => {
        setOpenFeedback(openFeedback === sprintNum ? null : sprintNum);
    };


    return (
        <ContentContainer>
            <PR.PageContainer>
                <PR.Header>동료평가</PR.Header>

                {feedbackData[0].sprint.map((sprint) => (
                    <div key={sprint.sprint_num}>
                        <PR.SprintTitle onClick={() => toggleFeedback(sprint.sprint_num)}>
                            <span>{openFeedback === sprint.sprint_num ? "▼" : "▶"}</span>
                            Sprint {sprint.sprint_num}
                        </PR.SprintTitle>

                        {openFeedback === sprint.sprint_num && (
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
                                {sprint.feedback.map((feedback) => (
                                    <PR.TableRow key={feedback.id}>
                                        <PR.TableCell
                                            style= {{
                                                width: "20px"
                                            }}>
                                            {feedback.id}
                                        </PR.TableCell>
                                        <PR.TableCell
                                            style= {{
                                                width: "120px",
                                                paddingLeft: "15px"
                                            }}>
                                            {feedback.date}
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
                ))}
            </PR.PageContainer>
            <Space />
        </ContentContainer>
    )
}