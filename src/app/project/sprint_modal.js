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

const Label = styled.label`
    font-size: 16px;
    font-weight: bold;
    color: #6a50c5;
    width: 80px;  /* 고정 너비 설정 */
    text-align: left;
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

const DateInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; /* 간격 줄이기 */
`;

const DateInput = styled.input`
    border: 2px solid #796ad9;
    border-radius: 8px;
    padding: 8px;
    font-size: 14px;
    width: 155px;
    text-align: center;
    outline: none;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    margin-top: 5px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #6a50c5;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        background: #5A3DAC;
    }
`;

export default function SprintModal({ isOpen, onClose, sprint, goal, setGoal, startDate, setStartDate, endDate, setEndDate }) {
    if (!isOpen) return null;

    return (
        <m.ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <SprintTitle>Sprint {sprint}</SprintTitle>
                
                {/* 중간목표 입력 */}
                <GoalInputWrapper>
                    <Label>중간목표</Label>
                    <Textarea 
                        value={goal} 
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </GoalInputWrapper>
                
                {/* 기한 입력 */}
                <DateInputWrapper>
                    <Label>기한</Label>
                    <DateInputContainer>
                        <DateInput 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span> ~ </span>
                        <DateInput 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </DateInputContainer>
                </DateInputWrapper>

                <ButtonContainer>
                    <SubmitButton onClick={onClose}>완료</SubmitButton>
                </ButtonContainer>
            </ModalContent>
        </m.ModalOverlay>
    );
}
