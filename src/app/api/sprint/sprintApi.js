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

// 스프린트 기본 정보 조회
export const fetchSprintData = async (sprintId) => {
    try {
        const res = await axiosWithAuthorization.get(`/sprints/${sprintId}`);
        console.log("스프린트 기본 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "스프린트 기본 정보를 조회할 수 없습니다.";
        throw new Error(message);
    }
};

// 스프린트 정보 수정
export const updateSprintData = async (sprintId, updatedData) => {
    try {
        const res = await axiosWithAuthorization.patch(`/sprints/${sprintId}`, updatedData);
        console.log("스프린트 정보 수정 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "스프린트의 정보를 수정할 수 없습니다.";
        throw new Error(message);
    }
}