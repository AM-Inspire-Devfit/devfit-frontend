import * as m from '@/components/modal_s';

import { deleteProject } from "@/app/api/project/projectApi";

import { useAlert } from "@/context/AlertContext";

export default function DeleteModal({ selectedProject, onClose, onProjectDeleted}) {
    const { showAlert } = useAlert();
    
    return (
        <m.ModalOverlay>
            <m.ModalContent
                style={{
                    height: "300px",
                    border: "4px solid #6A50C5",
                }}
            >
                <m.Title style={{ 
                    textAlign: "left", 
                    fontSize: "28px", 
                    marginBottom: "10px", 
                    color: "#6A50C5" }}>
                    프로젝트 삭제
                </m.Title>
                <div 
                    style={{ 
                        backgroundColor: "#E8E3FF", 
                        padding: "15px 20px", 
                        borderRadius: "10px",
                        textAlign: "left",
                        marginBottom: "20px",
                        fontSize: "15px",
                        color: "#333",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    프로젝트를 삭제하면 이전 작업 기록을 포함한 모든 데이터가 삭제되며 
                    소속 팀원들 또한 더 이상 이를 열람할 수 없습니다.
                    <br />
                    <br />
                    <strong>이 작업은 되돌릴 수 없습니다.</strong>
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <p style={{ fontSize: "20px", marginBottom: "5px" }}>
                        <strong>{selectedProject.projectInfo.projectTitle}</strong> 프로젝트를 삭제하시겠습니까?
                    </p>
                </div>
                <div style={{ marginTop: "10px", display: "flex", gap: "60px", justifyContent: "center" }}> 
                    <m.ModalButton 
                        onClick={async () => {
                            try {
                                await deleteProject(selectedProject.projectInfo.projectId);
                                showAlert("success", "프로젝트가 삭제되었습니다."); 
                                onClose(); // 모달 닫기
                                if (onProjectDeleted) onProjectDeleted();
                            } catch (error) {
                                showAlert("error", error.message);
                            }
                        }}
                    >
                        예
                    </m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </div>
            </m.ModalContent>
        </m.ModalOverlay>
    )

}