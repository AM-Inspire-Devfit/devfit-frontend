import styled from "styled-components";
import * as m from "../../components/modal_s";

const ModalContent = styled.div`
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    width: 500px;
    height: auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid #796AD9;
`;

export default function MeetingModal({ isOpen, onClose, meetingTitle, setMeetingTitle, meetingDate, setMeetingDate, startTime, setStartTime, endTime, setEndTime, sprintNum, isEditing }) {
    if (!isOpen) return null;

    return (
        <m.ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <m.Title>Sprint {sprintNum} 팀 미팅</m.Title>
                
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
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <span> ~ </span>
                        <m.DateInput 
                            type="time" 
                            value={endTime} 
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </m.DateInputContainer>
                </m.InputWrapper>

                <m.ButtonContainer
                    style={{
                        gap: "10px"
                    }}
                >
                    <m.SubmitButton onClick={onClose}>
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