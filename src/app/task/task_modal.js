import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';

const InputWrapper = styled(m.InputWrapper)`
    margin-bottom: 20px;
    padding-top: 5px;
    padding-left: 20px;
`;

const DifficultyGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const DifficultyLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #6a50c5;
    cursor: pointer;
    gap: 5px;
`;

const RadioInput = styled.input`
    accent-color: #796ad9;
    width: 16px;
    height: 16px;
`;

export default function TaskModal({ isOpen, onClose, sprintNum,}) {
    if (!isOpen) return null;

    return (
        <m.ModalOverlay>
            <m.ModalContent 
                onClick={(e) => e.stopPropagation()}
                style={{
                    textAlign: "left",
                    height: "250px",
                    position: "relative"
                }}
            >
            <m.CloseButton onClick={onClose}>
                <IoClose size={24} />
            </m.CloseButton>

            <m.Title
                style={{marginLeft: "10px"}}
            >
                Sprint {sprintNum}
            </m.Title>

            <InputWrapper>
                    <m.Label>Task</m.Label>
                    <m.Input />
            </InputWrapper>

            <InputWrapper>
                <m.Label>난이도</m.Label>
                <DifficultyGroup>
                    <DifficultyLabel>
                        <RadioInput type="radio" name="difficulty" defaultChecked />상
                    </DifficultyLabel>
                    <DifficultyLabel>
                        <RadioInput type="radio" name="difficulty" />중
                    </DifficultyLabel>
                    <DifficultyLabel>
                        <RadioInput type="radio" name="difficulty" />하
                    </DifficultyLabel>
                </DifficultyGroup>
            </InputWrapper>

            <m.ButtonContainer style={{ marginTop: "-5px"}}>
                <m.SubmitButton>생성</m.SubmitButton>
            </m.ButtonContainer>

            </m.ModalContent>
        </m.ModalOverlay>
    );

}