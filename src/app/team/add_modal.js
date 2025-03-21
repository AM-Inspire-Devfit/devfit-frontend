import * as m from '@/components/modal_s';
import { IoClose } from "react-icons/io5";  // 닫기 아이콘

import { useState, useEffect } from 'react';

export default function AddModal({ onClose }) {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setStartDate(today);
    }, []);

    const isButtonDisabled = 
        projectName.trim() === "" || 
        projectDescription.trim() === "" || 
        startDate === "" || 
        endDate === "";

    const handleSubmit = () => {
        if (!isButtonDisabled) {
            console.log("프로젝트 생성 완료:", { projectName, projectDescription });
            onClose(); // 모달 닫기
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
                    프로젝트 생성
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
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        />
                </m.InputWrapper>

                <m.InputWrapper style={{ alignItems: "flex-start" }}>
                    <m.Label style={{ color: "black", fontWeight: "bold", width: "90px", marginTop: "20px" }}>
                        상세 설명 *
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
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
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
                        value={endDate}
                        min={startDate}
                        onChange={(e) => {
                            if (e.target.value < startDate) {
                                setEndDate(startDate);
                            } else {
                                setEndDate(e.target.value);
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
                        프로젝트 생성</m.SubmitButton>
                </m.ButtonContainer>
            </m.ModalContent>
        </m.ModalOverlay>
    )

}
