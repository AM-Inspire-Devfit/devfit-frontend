import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 프로젝트 생성
export const createProject = async (projectData) => {
    try {
        const res = await axiosWithAuthorization.post(`/projects/create`, projectData);
        console.log("프로젝트 생성 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "프로젝트를 생성할 수 없습니다.";
        throw new Error(message);
    }
};

// 프로젝트 개별 정보 조회
export const fetchProjectData = async (projectId) => {
    try {
        const res = await axiosWithAuthorization.get(`/projects/${projectId}`);
        console.log("프로젝트 개별 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "해당 프로젝트의 개별 정보를 조회할 수 없습니다.";
        throw new Error(message);
    }
};

// 팀에 존재하는 프로젝트 목록 조회
export const fetchProjectListData = async (teamId, isParticipant, lastProjectId, pageSize = 10) => {
    try {
        const res = await axiosWithAuthorization.get(`/projects/${teamId}/list`, {
            params: {
                isParticipant,
                lastProjectId,
                pageSize,
            },
        });
        console.log("팀 프로젝트 목록 조회 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "팀에 존재하는 프로젝트 목록을 조회할 수 없습니다.";
        throw new Error(message);
    }
};

// 프로젝트 삭제
export const deleteProject = async (projectId) => {
    try {
        const res = await axiosWithAuthorization.delete(`/projects/${projectId}`);
        console.log("프로젝트 삭제 성공:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "프로젝트를 삭제할 수 없습니다.";
        throw new Error(message);
    }
};

