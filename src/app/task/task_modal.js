import { useEffect, useState } from "react";
import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from 'react-icons/io5';

import { createTask, updateTask, deleteTask } from "@/app/api/task/taskApi";

import { useAlert } from "@/context/AlertContext";

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

export default function TaskModal({ isOpen, onClose, sprintTitle, sprintId, task, onTaskCreated, role}) {
    const { showAlert } = useAlert();

    const [titleInput, setTitleInput] = useState("");
    const [difficulty, setDifficulty] = useState(""); 

    useEffect(() => {
        if (task) {
            setTitleInput(task.description);
            setDifficulty(task.taskDifficulty);
        } else {
            setTitleInput("");
            setDifficulty("HIGH"); // 생성일 때 디폴트값
        }
    }, [task, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            const taskData = {
                sprintId: sprintId,
                description: titleInput,
                taskDifficulty: difficulty
            };
    
            if (task) { // 수정
                await updateTask(task.taskId, taskData);
                showAlert("success", "태스크 수정 성공");
            } else { // 생성
                await createTask({ ...taskData, sprintId });
                showAlert("success", "태스크 생성 성공");
            }

            if (onTaskCreated) await onTaskCreated();
            onClose(); // 모달 닫기
        } catch (error) {
            const message = error?.response?.data?.data?.message ?? "태스크를 생성에 실패했습니다.";
        throw new Error(message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task.taskId);
            showAlert("success", "태스크 삭제 성공");

            if (onTaskCreated) await onTaskCreated(); 
            onClose();
        } catch (error) {
            const message = error?.message ?? "태스크 삭제에 실패했습니다.";
            showAlert("error", message);
        }
    };


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
                Sprint {sprintTitle}
            </m.Title>

            <InputWrapper>
                    <m.Label>Task</m.Label>
                    <m.Input 
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        placeholder="task를 입력하세요!"
                    />
            </InputWrapper>

            <InputWrapper>
                <m.Label>난이도</m.Label>
                <DifficultyGroup>
                    <DifficultyLabel>
                        <RadioInput 
                            type="radio" 
                            name="difficulty" 
                            checked={difficulty === "HIGH"}
                            onChange={() => setDifficulty("HIGH")}
                        />상
                    </DifficultyLabel>
                    <DifficultyLabel>
                        <RadioInput 
                            type="radio" 
                            name="difficulty"
                            checked={difficulty === "MID"}
                            onChange={() => setDifficulty("MID")}
                        />중
                    </DifficultyLabel>
                    <DifficultyLabel>
                        <RadioInput 
                            type="radio" 
                            name="difficulty" 
                            checked={difficulty === "LOW"}
                            onChange={() => setDifficulty("LOW")}
                        />하
                    </DifficultyLabel>
                </DifficultyGroup>
            </InputWrapper>

            <m.ButtonContainer style={{ marginTop: "-5px", gap: "10px"}}>
                {task && role === "ADMIN" && (
                    <m.DeleteButton onClick={handleDelete}>
                        삭제
                    </m.DeleteButton>
                )}
                <m.SubmitButton onClick={handleSubmit}>
                    {task ? "수정" : "생성"}
                </m.SubmitButton>

            </m.ButtonContainer>

            </m.ModalContent>
        </m.ModalOverlay>
    );

}