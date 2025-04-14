"use client";

import * as m from '@/components/modal_s';
import { useAlert } from "@/context/AlertContext";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";

export default function LeaveModal({ selectedProject, onClose }) {
  const { showAlert } = useAlert();

  if (!selectedProject) return null;

  // "예" 버튼을 눌렀을 때 호출하는 함수
  const handleLeaveProject = async () => {
    try {
        console.log(selectedProject);
      await axiosWithAuthorization.delete(`/projects/${selectedProject.projectInfo.projectId}/leave`);
      showAlert("success", "프로젝트 나가기가 완료되었습니다.");
      onClose(); // 모달 닫기 후 추가 작업(예: 페이지 리디렉션) 필요 시 추가
    } catch (error) {
      console.error(error);
      showAlert("error", error.response?.data?.message || "프로젝트 나가기 실패");
    }
  };

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
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "60px",
            justifyContent: "center"
          }}
        >
          {/* "예" 버튼에 API 호출 핸들러 연결 */}
          <m.ModalButton onClick={handleLeaveProject}>예</m.ModalButton>
          <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
        </div>
      </m.ModalContent>
    </m.ModalOverlay>
  );
}
