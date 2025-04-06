import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 태스크 생성
export const createTask = async (taskData) => {
    try {
        const res = await axiosWithAuthorization.post(`/tasks/create`,taskData);
        console.log("태스크 생성 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "태스크를 생성할 수 없습니다.";
        throw new Error(message);
    }
};

// 스프린트별 태스크 목록 조회 
export const fetchTaskDataBySprint = async (sprintId, lastTaskId = null, size = 6) => {
    try {
        const params = { size };
        if (lastTaskId !== null) {
            params.lastTaskId = lastTaskId;
        }

        const res = await axiosWithAuthorization.get(`/tasks/${sprintId}/sprint`, {
            params,
        });

        console.log("스프린트별 태스크 목록 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "스프린트별 태스크 목록을 조회할 수 없습니다.";
        throw new Error(message);
    }
};

// 태스크 기본 정보 수정
export const updateTask = async (taskId, updatedData) => {
    try {
        const res = await axiosWithAuthorization.patch(`/tasks/${taskId}/basic-info`, updatedData);
        console.log("태스크 기본 정보 수정 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "태스크 기본 정보를 수정할 수 없습니다.";
        throw new Error(message);
    }
};

// 태스크 삭제
export const deleteTask = async (taskId) => {
    try {
        const res = await axiosWithAuthorization.delete(`/tasks/${taskId}`);
        console.log("태스크 삭제 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "태스크를 삭제할 수 없습니다.";
        throw new Error(message);
    }
};