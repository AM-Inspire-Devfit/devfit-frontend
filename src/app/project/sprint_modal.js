import styled from "styled-components";
import * as m from '../../components/modal_s';
import { IoClose } from "react-icons/io5";  
import { useEffect, useState} from "react";

import { createSprint, fetchSprintData, updateSprintData, deleteSprintData } from "@/app/api/sprint/sprintApi";

import { useAlert } from "@/context/AlertContext";

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


export default function SprintModal({ 
    isOpen, onClose, sprintId, title, isLastSprint, projectId, onSprintCreated, onSprintEdited, onSprintDeleted, isEdit}) {
    const { showAlert } = useAlert();

    const [sprintGoal, setSprintGoal] = useState("");
    const [sprintStartDate, setSprintStartDate] = useState("");
    const [sprintDueDate, setSprintDueDate] = useState("");

    useEffect(() => {
        const loadSprint = async () => {
            if (isEdit && sprintId) {
                try {
                    const data = await fetchSprintData(sprintId);
                    setSprintGoal(data.goal || "");
                    setSprintStartDate(data.startDt || "");
                    setSprintDueDate(data.dueDt || "");
                } catch (err) {
                    showAlert("error", err.message);
                }
            } else if (!isEdit) {
                const todayKST = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];
                setSprintGoal("");
                setSprintStartDate(todayKST);
                setSprintDueDate("");
            }
        };

        if (isOpen) {
            loadSprint();
        }
    }, [isOpen, isEdit, sprintId]);

    if (!isOpen) return null;

    const handleCreateSprint = async () => {
        if (!sprintGoal || !sprintStartDate || !sprintDueDate) {
            showAlert("error", "모든 항목을 입력해주세요.");
            return;
        }
        try {
            const updatedData = {
                projectId,
                title: String(title), 
                goal: sprintGoal,         
                dueDt: sprintDueDate, 
            };

            await createSprint(updatedData);
            showAlert("success", `Sprint ${title} 생성 완료`);
            onClose();

            if (onSprintCreated)  {
                await onSprintCreated(); // 데이터 최신화
            }
        } catch (err) {
            showAlert("error", err.message);
        }
    };

    const handleEditSprint = async () => {
        if (!sprintGoal || !sprintDueDate) {
            showAlert("error", "모든 항목을 입력해주세요.");
            return;
        }
        try {
            const updatedData = {};
            if (sprintGoal) updatedData.goal = sprintGoal;
            if (sprintDueDate) updatedData.dueDt = sprintDueDate;
            if (title) updatedData.title = String(title);
    
            await updateSprintData(sprintId, updatedData); 
            showAlert("success", `Sprint ${title} 수정 완료`);

            if (onSprintEdited) {
                await onSprintEdited(); 
            }
            
            onClose();
        } catch (err) {
            showAlert("error", err.message);
        }
    };

    const handleDeleteSprint = async () => {
        const confirmed = window.confirm(`Sprint ${title}을(를) 삭제하시겠습니까?`);
        if (!confirmed) return;
    
        try {
            await deleteSprintData(sprintId);
            showAlert("success", `Sprint ${title} 삭제 완료`);
            onClose();
    
            if (onSprintDeleted) {
                await onSprintDeleted(); // 리스트 새로고침
            }
        } catch (err) {
            showAlert("error", err.message);
        }
    };

    return (
        <m.ModalOverlay>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <SprintTitle>Sprint {title}</SprintTitle>

                <m.CloseButton onClick={onClose}>
                    <IoClose size={24} />
                </m.CloseButton>
                
                {/* 중간목표 입력 */}
                <GoalInputWrapper>
                    <m.Label>중간목표</m.Label>
                    <Textarea 
                        value={sprintGoal} 
                        onChange={(e) => setSprintGoal(e.target.value)}
                        placeholder="Sprint의 중간 목표를 설정하세요!"
                    />

                </GoalInputWrapper>
                
                {/* 기한 입력 */}
                <DateInputWrapper>
                    <m.Label>기한</m.Label>
                    <m.DateInputContainer>
                        <m.DateInput 
                            type="date" 
                            value={sprintStartDate}
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
                            value={sprintDueDate}
                            onChange={(e) => setSprintDueDate(e.target.value)}
                            readOnly={!isLastSprint}
                            min={sprintStartDate}
                            style={{
                                flex: 1,
                                backgroundColor: isLastSprint ? "white" : "#f5f5f5",
                                color: isLastSprint ? "#000" : "#555",
                                cursor: isLastSprint ? "text" : "not-allowed"
                            }}
                        />
                    </m.DateInputContainer>
                </DateInputWrapper>

                <m.ButtonContainer
                    style = {{
                        gap: "10px"
                    }}
                >
                    {isEdit && 
                    <m.DeleteButton onClick={handleDeleteSprint}>삭제</m.DeleteButton>}
                    <m.SubmitButton onClick={isEdit ? handleEditSprint : handleCreateSprint}>
                        {isEdit ? "수정" : "생성"}
                    </m.SubmitButton>
                </m.ButtonContainer>
            </ModalContent>
        </m.ModalOverlay>
    );
}
