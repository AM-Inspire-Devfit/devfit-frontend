import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 스프린트 생성
export const createSprint = async (sprintData) => {
    try {
        const res = await axiosWithAuthorization.post(`/sprints/create`,sprintData);
        console.log("스프린트 생성 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "스프린트를 생성할 수 없습니다.";
        throw new Error(message);
    }
};

// 프로젝트별 스프린트 & 태스크 목록 조회
export const fetchSprintTaskData = async (projectId) => {
    try {
        const res = await axiosWithAuthorization.get(`/sprints/${projectId}/project`);
        console.log("프로젝트별 스프린트 & 태스크 목록 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "프로젝트별 스프린트 & 태스크 목록을 조회할 수 없습니다.";
        throw new Error(message);
    }
};