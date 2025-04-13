import React, { useState } from "react";
import styled from "styled-components";
import * as m from "../../components/modal_s";
import { IoClose } from "react-icons/io5";
import axiosWithAuthorization from "@/context/axiosWithAuthorization";
import { useAlert } from "@/context/AlertContext";

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 500px;
  height: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #796ad9;
  position: relative;
`;

export default function MeetingModal({
  isOpen,
  onClose,
  meetingId,          
  meetingTitle,
  setMeetingTitle,
  meetingDate,
  setMeetingDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  sprintId,            
  isEditing,
  onMeetingSaved,      
  onMeetingDeleted     
}) {
  const { showAlert } = useAlert();
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const [isDateChanged, setIsDateChanged] = useState(false);

  if (!isOpen) return null;

  // meetingDate/시간-> "2025-04-14T09:00:00"
  const formatMeetingData = (date, start, end) => {
    if (!date || !start || !end) return null;
    return {
      meetingStart: `${date}T${start}:00`,
      meetingEnd: `${date}T${end}:00`,
    };
  };

  const handleSaveMeeting = async () => {
    try {
      if (isEditing && meetingId) {
        // 편집 모드라면 변경된 항목만 각각 업데이트 진행
        if (isTitleChanged) {
          // 미팅 제목 업데이트 API 호출 (/meetings/{meetingId}/title)
          await axiosWithAuthorization.post(`/meetings/${meetingId}/title`, {
            title: meetingTitle,
          });
          showAlert("success", "미팅 제목 수정 완료");
        }
        if (isDateChanged) {
          // 날짜/시간 값이 변경되었으면, 필수 값이 모두 있는지 체크
          const formattedMeeting = formatMeetingData(meetingDate, startTime, endTime);
          if (!formattedMeeting) {
            showAlert("error","날짜 및 시간을 모두 입력해주세요.");
            return;
          }
          // 미팅 일시 업데이트 API 호출 (/meetings/{meetingId}/date)
          await axiosWithAuthorization.post(`/meetings/${meetingId}/date`, formattedMeeting);
          showAlert("success", "미팅 일시 수정 완료");
        }
        // 아무 값도 변경되지 않았다면 별도로 알리거나 그대로 진행
        if (!isTitleChanged && !isDateChanged) {
          showAlert("info", "변경된 사항이 없습니다.");
        }
      } else {
        // 새 미팅 생성 모드이면 모두 함께 생성
        const formattedMeeting = formatMeetingData(meetingDate, startTime, endTime);
        if (!meetingTitle || !formattedMeeting) {
          showAlert("error","모든 필드를 입력해주세요.");
          return;
        }
        await axiosWithAuthorization.post(`/meetings/create`, {
          sprintId: sprintId,
          title: meetingTitle,
          ...formattedMeeting,
        });
        showAlert("success", "미팅 생성 완료");
      }
      if (onMeetingSaved) onMeetingSaved();
      onClose();
    } catch (error) {
      showAlert("error", error.response?.data?.message || "오류 발생");
    }
  };

  const handleDeleteMeeting = async () => {
    if (!meetingId) {
      showAlert("error","삭제할 미팅 정보가 없습니다.");
      return;
    }
    const confirmed = window.confirm("미팅을 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      await axiosWithAuthorization.delete(`/meetings/${meetingId}`);
      showAlert("success", "미팅 삭제 완료");
      if (onMeetingDeleted) onMeetingDeleted();
      onClose();
    } catch (error) {
      showAlert("error", error.response?.data?.message || "삭제 오류");
    }
  };

  return (
    <m.ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <m.Title>Sprint {sprintId} 팀 미팅</m.Title>
        <m.CloseButton onClick={onClose}>
          <IoClose size={24} />
        </m.CloseButton>
        {/* 미팅 제목 입력 */}
        <m.InputWrapper>
          <m.Label>회의명</m.Label>
          <m.Input
            type="text"
            value={meetingTitle}
            onChange={(e) => {
              setMeetingTitle(e.target.value);
              setIsTitleChanged(true);
            }}
          />
        </m.InputWrapper>
        {/* 날짜 입력 */}
        <m.InputWrapper>
          <m.Label>날짜</m.Label>
          <m.DateInput
            type="date"
            value={meetingDate}
            onChange={(e) => {
              setMeetingDate(e.target.value);
              setIsDateChanged(true);
            }}
          />
        </m.InputWrapper>
        {/* 시간 입력 */}
        <m.InputWrapper>
          <m.Label>시간</m.Label>
          <m.DateInputContainer>
            <m.DateInput
              type="time"
              value={startTime}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const hour = parseInt(selectedTime.split(":")[0], 10);
                // 오전 12시~7시 선택 시 자동 "08:00"
                if ((hour >= 1 && hour < 8) || hour === 0) {
                  setStartTime("08:00");
                } else {
                  setStartTime(selectedTime);
                }
                setIsDateChanged(true);
              }}
            />
            <span> ~ </span>
            <m.DateInput
              type="time"
              value={endTime}
              onChange={(e) => {
                const selectedTime = e.target.value;
                const [startHour, startMin] = startTime.split(":").map(Number);
                const [endHour, endMin] = selectedTime.split(":").map(Number);
                const startDateObj = new Date();
                const endDateObj = new Date();
                startDateObj.setHours(startHour, startMin, 0);
                endDateObj.setHours(endHour, endMin, 0);
                if (endDateObj <= startDateObj) {
                   showAlert("error","마감 시간은 시작 시간보다 이후여야 합니다.");
                    return;
                }
                if ((endHour >= 1 && endHour < 8) || endHour === 0) {
                  setEndTime("08:00");
                } else {
                  setEndTime(selectedTime);
                }
                setIsDateChanged(true);
              }}
            />
          </m.DateInputContainer>
        </m.InputWrapper>
        <m.ButtonContainer style={{ gap: "10px" }}>
          <m.SubmitButton onClick={handleSaveMeeting}>
            {isEditing ? "수정 완료" : "미팅 생성"}
          </m.SubmitButton>
          {isEditing && (
            <m.DeleteButton onClick={handleDeleteMeeting}>삭제</m.DeleteButton>
          )}
        </m.ButtonContainer>
      </ModalContent>
    </m.ModalOverlay>
  );
}
