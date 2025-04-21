import * as m from '@/components/modal_s';
import { IoClose } from "react-icons/io5";  

import { useState, useEffect } from 'react';

import { createProject, updateProjectData} from "@/app/api/project/projectApi";
import { useAlert } from "@/context/AlertContext";

export default function ProjectModal({ 
        onClose, 
        isEditing = false, 
        currentTitle = "", 
        currentDescription = "", 
        currentStartDate = "", 
        currentDueDate = "",
        teamId,
        projectId, // 프로젝트 수정
        onProjectCreated, 
    }) {

    const { showAlert } = useAlert();
    const [projectName, setProjectName] = useState(currentTitle);
    const [projectDescription, setProjectDescription] = useState(currentDescription ?? "");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState(currentDueDate); 

    useEffect(() => {
        if (isEditing && currentStartDate) {
            setStartDate(currentStartDate); // 프로젝트 수정이면 기존 날짜 유지
        } else {
            const today = new Date().toISOString().split("T")[0];  // 프로젝트 생성이면 오늘 날짜
            setStartDate(today);
            setDueDate(""); 
        }
    }, [isEditing, currentStartDate, currentDueDate]);

    const isButtonDisabled = 
        projectName.trim() === "" || 
        dueDate === "";

    const handleSubmit = async () => {
        if (isButtonDisabled) return;

        try {
            if (isEditing) {
                const trimmedTitle = projectName.trim();
                const trimmedDesc = projectDescription.trim(); 

                const updatedData = {
                    title: trimmedTitle,
                    description: trimmedDesc,
                    dueDt: dueDate,
                };

                const res = await updateProjectData(projectId, updatedData);
                console.log("updateProjectData 응답값:", res);
                console.log("프로젝트 수정 완료");
                showAlert("success", "프로젝트 정보가 수정되었습니다.");
            } else {
                // 프로젝트 생성
                const projectData = {
                    teamId,
                    projectTitle: projectName.trim(),
                    dueDt: dueDate,
                    projectDescription: projectDescription.trim() || null,
                };
                const res = await createProject(projectData);
                console.log("createProject 응답값:", res);
                console.log("프로젝트 생성 완료");
                showAlert("success", "프로젝트가 생성되었습니다.");
            }
    
            onProjectCreated?.();
            onClose(); // 모달 닫기
        } catch (error) {
            console.log(`${isEditing ? "프로젝트 수정 실패" : "프로젝트 생성 실패"}:`, error.message);
            showAlert("error", `${isEditing ? "프로젝트 수정 실패" : "프로젝트 생성 실패"}:`);
        }
    };

    return(

        <m.ModalOverlay>
            <m.ModalContent
                style = {{
                    width: "600px",
                    height: "450px",
                    position: "relative",
                    border: "4px solid #6A50C5",
                }}
            >

                <m.Title style={{ textAlign: "left", fontSize: "28px", marginBottom: "10px", color: "#6A50C5" }}>
                    {isEditing ? "프로젝트 수정" : "프로젝트 생성"}
                </m.Title>
                <p style={{ textAlign: "left", fontSize: "14px", color: "#706767", marginBottom: "20px" }}>
                    * 표시 항목은 필수 항목입니다.
                </p>

                <m.CloseButton onClick={onClose}>
                    <IoClose size={24} />
                </m.CloseButton>

                <m.InputWrapper>
                    <m.Label style={{ color: "black", fontWeight: "bold", width: "90px" }}>프로젝트 명 *</m.Label>
                    <m.Input 
                        style={{ flex: 1, marginTop: "10px" }}
                        placeholder="프로젝트 이름을 입력하세요 (15자 이내)"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        maxLength={15}
                        />
                </m.InputWrapper>

                <m.InputWrapper style={{ alignItems: "flex-start" }}>
                    <m.Label style={{ color: "black", fontWeight: "bold", width: "90px", marginTop: "20px" }}>
                        상세 설명 
                    </m.Label>
                    <textarea
                        style={{
                            flex: 1,
                            height: "60px",
                            padding: "10px",
                            border: "2px solid #796AD9",
                            borderRadius: "8px",
                            fontSize: "14px",
                            outline: "none",
                            resize: "none",
                            marginTop: "15px"
                        }}
                        placeholder="프로젝트에 대한 설명을 입력하세요 (100자 이내)"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        maxLength={100}
                    />
                </m.InputWrapper>

                <m.InputWrapper style={{ marginTop: "20px" }}>
                    <m.Label style={{ color: "black", fontWeight: "bold", width: "90px" }}>
                        시작 날짜
                    </m.Label>
                    <m.Input
                        type="date"
                        value={startDate}
                        readOnly
                        style={{ flex: 1, backgroundColor: "#f5f5f5", color: "#555" }}
                    />
                </m.InputWrapper>

                <m.InputWrapper style={{ marginTop: "10px" }}>
                    <m.Label style={{ color: "black", fontWeight: "bold", width: "90px" }}>
                        마감 날짜 *
                    </m.Label>
                    <m.Input
                        type="date"
                        value={dueDate}
                        min={startDate}
                        onChange={(e) => {
                            if (e.target.value < startDate) {
                                setDueDate(startDate);
                            } else {
                                setDueDate(e.target.value);
                            }
                        }}
                        style={{ flex: 1 }}
                    />
                </m.InputWrapper>

                <m.ButtonContainer>
                    <m.SubmitButton
                        onClick={handleSubmit}
                        disabled={isButtonDisabled}
                        style={{
                            backgroundColor: isButtonDisabled ? "#ccc" : "#6A50C5", // 비활성화 시 색상 변경
                            cursor: isButtonDisabled ? "not-allowed" : "pointer"
                        }}
                    >
                        {isEditing ? "프로젝트 수정" : "프로젝트 생성"}
                    </m.SubmitButton>
                </m.ButtonContainer>
            </m.ModalContent>
        </m.ModalOverlay>
    )

}
