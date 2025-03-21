import styled from "styled-components";
import * as m from '../../components/modal_s';

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

const SprintTitle = styled.h2`
    color: #6A4BBF;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 30px;
`;

const GoalInputWrapper = styled.div`
    display: flex;
    align-items: center; /* 높이 정렬 */
    gap: 15px;
    width: 100%;
    margin-bottom: 15px;
`;

const Textarea = styled.textarea`
    flex: 1;
    height: 60px;
    padding: 10px;
    border: 2px solid #796ad9;
    border-radius: 8px;
    resize: none;
    font-size: 14px;
    outline: none;
`;

const DateInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    width: 100%;
`;


export default function SprintModal({ isOpen, onClose, sprint, goal, setGoal, startDate, setStartDate, dueDate, setDueDate, isLastSprint  }) {
    if (!isOpen) return null;

    return (
        <m.ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <SprintTitle>Sprint {sprint}</SprintTitle>
                
                {/* 중간목표 입력 */}
                <GoalInputWrapper>
                    <m.Label>중간목표</m.Label>
                    <Textarea 
                        value={goal} 
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </GoalInputWrapper>
                
                {/* 기한 입력 */}
                <DateInputWrapper>
                    <m.Label>기한</m.Label>
                    <m.DateInputContainer>
                        <m.DateInput 
                            type="date" 
                            value={startDate} 
                            readOnly
                            style={{ 
                                flex: 1, 
                                backgroundColor: "#f5f5f5", 
                                color: "#555", 
                                cursor: "not-allowed" 
                            }}
                        />
                        <span> ~ </span>
                        <m.DateInput 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)}
                            readOnly={!isLastSprint}
                            min={startDate}
                            style={{
                                flex: 1,
                                backgroundColor: isLastSprint ? "white" : "#f5f5f5",
                                color: isLastSprint ? "#000" : "#555",
                                cursor: isLastSprint ? "text" : "not-allowed"
                            }}
                        />
                    </m.DateInputContainer>
                </DateInputWrapper>

                <m.ButtonContainer>
                    <m.SubmitButton onClick={onClose}>완료</m.SubmitButton>
                </m.ButtonContainer>
            </ModalContent>
        </m.ModalOverlay>
    );
}
