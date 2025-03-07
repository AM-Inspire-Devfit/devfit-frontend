import * as m from '@/components/modal_s';

export default function LeaveModal({ selectedProject, onClose }) {
    if (!selectedProject) return null;

    return (
        <m.ModalOverlay>
            <m.ModalContent>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <p style={{ fontSize: "25px", marginBottom: "5px" }}>
                        <strong>{selectedProject.title}</strong> 프로젝트를
                    </p>
                    <p style={{ fontSize: "25px", fontWeight: "normal" }}>
                        나가시겠습니까?
                    </p>
                </div>
                <div style={{ marginTop: "20px", display: "flex", gap: "60px", justifyContent: "center" }}> 
                    <m.ModalButton onClick={onClose}>예</m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </div>
            </m.ModalContent>
        </m.ModalOverlay>
    );
};
