import styled from "styled-components";
import * as m from "../../components/modal_s";
import { IoClose } from "react-icons/io5";  

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    width: 500px;
    height: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #796AD9;
    position: relative; 
`;

export default function MeetingModal({ isOpen, onClose, meetingTitle, setMeetingTitle, meetingDate, setMeetingDate, startTime, setStartTime, endTime, setEndTime, sprintNum, isEditing }) {
    if (!isOpen) return null;

    const formatMeetingData = (meetingDate, startTime, endTime) => {
        if (!meetingDate || !startTime || !endTime) return null;
    
        // 날짜와 시간을 합쳐서 ISO 형식으로 변환
        const meetingStart = `${meetingDate}T${startTime}:00`;
        const meetingEnd = `${meetingDate}T${endTime}:00`;
    
        return { meetingStart, meetingEnd };
    };

    const handleSaveMeeting = () => {
        const formattedMeeting = formatMeetingData(meetingDate, startTime, endTime);
    
        if (!formattedMeeting) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
    
        console.log("저장할 미팅 데이터:", formattedMeeting);
        
        // 여기에 API 관련 코드 추가하면 될듯?
        onClose(); 
    };

    return (
        <m.ModalOverlay>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <m.Title>Sprint {sprintNum} 팀 미팅</m.Title>

                <m.CloseButton onClick={onClose}>
                    <IoClose size={24} />
                </m.CloseButton>
                
                {/* 미팅 제목 입력 */}
                <m.InputWrapper>
                    <m.Label>회의명</m.Label>
                    <m.Input 
                        type="text" 
                        value={meetingTitle} 
                        onChange={(e) => setMeetingTitle(e.target.value)}
                    />
                </m.InputWrapper>
                
                {/* 날짜 입력 */}
                <m.InputWrapper>
                    <m.Label>날짜</m.Label>
                    <m.DateInput 
                        type="date" 
                        value={meetingDate} 
                        onChange={(e) => setMeetingDate(e.target.value)}
                    />
                </m.InputWrapper>

                {/* 시간 입력 */}
                <m.InputWrapper>
                    <m.Label>시간</m.Label>
                    <m.DateInputContainer>
                        <m.DateInput 
                            type="time" 
                            value={startTime} 
                            onChange={(e) => {
                                const selectedTime = e.target.value;
                                const hour = parseInt(selectedTime.split(":")[0], 10);
                                
                                // 오전 12시 ~ 7시를 선택할 경우, 8시로 자동 변경
                                if ((hour >= 1 && hour < 8 ) || hour === 0) {
                                    setStartTime("08:00");
                                } else {
                                    setStartTime(selectedTime);
                                }
                            }}
                        />
                        <span> ~ </span>
                        <m.DateInput 
                            type="time" 
                            value={endTime} 
                            onChange={(e) => {
                                const selectedTime = e.target.value;

                                const [startHour, startMin] = startTime.split(":").map(Number);
                                const [endHour, endMin] = selectedTime.split(":").map(Number);

                                const start = new Date();
                                const end = new Date();

                                start.setHours(startHour, startMin, 0);
                                end.setHours(endHour, endMin, 0);

                                // 만약 마감시간이 시작시간보다 빠르거나 같으면 무시
                                if (end <= start) {
                                    alert("마감 시간은 시작 시간보다 이후여야 합니다.");
                                    return;
                                }

                                // 오전 12시 ~ 7시를 선택할 경우, 8시로 자동 변경
                                if ((endHour >= 1 && endHour < 8) || endHour === 0) {
                                    setEndTime("08:00");
                                } else {
                                    setEndTime(selectedTime);
                                }
                            }}
                        />
                    </m.DateInputContainer>
                </m.InputWrapper>

                <m.ButtonContainer
                    style={{ gap: "10px"}}
                >
                    <m.SubmitButton onClick={handleSaveMeeting}>
                        {isEditing ? "수정 완료" : "미팅 생성"}
                    </m.SubmitButton>

                    {isEditing && (
                    <m.DeleteButton onClick={onClose}>
                        삭제
                    </m.DeleteButton>
                )}
                </m.ButtonContainer>
            </ModalContent>
        </m.ModalOverlay>
    );
}