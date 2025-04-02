import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 팀 정보 조회
export const fetchTeamData = async (teamId) => {
    try {
        const res = await axiosWithAuthorization.get(`/teams/${teamId}`);
        console.log("팀 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data?.data;

        if (status === 404 && data?.reasonMessage?.code === "TEAM_PARTICIPANT_NOT_FOUND") {
            throw new Error("팀 참여자가 아닙니다.");
        }
        else if (status === 404 && data?.reasonMessage?.code === "TEAM_NOT_FOUND") {
            throw new Error("요청한 팀을 찾을 수 없습니다.");
        }

        throw new Error("팀 정보를 불러올 수 없습니다.");
    }
};

// 팀 초대 코드 확인
export const fetchTeamCode = async (teamId) => {
    try {
        const res = await axiosWithAuthorization.get(`/teams/${teamId}/invite-code`);
        return res.data.data;
    } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data?.data;

        if (status === 404 && data?.reasonMessage?.code === "TEAM_PARTICIPANT_NOT_FOUND") {
            throw new Error("팀 참여자가 아닙니다.");
        }
        else if (status === 404 && data?.reasonMessage?.code === "TEAM_NOT_FOUND") {
            throw new Error("요청한 팀을 찾을 수 없습니다.");
        }

        throw new Error("팀 정보를 불러올 수 없습니다.");
    }
}

// 팀 이모지 수정
export const updateTeamEmoji = async (teamId, emoji) => {
    try {
        const res = await axiosWithAuthorization.patch(`/teams/${teamId}/emoji`, {
            teamEmoji: emoji,
        });
        console.log("팀 이모지 수정:", res.data);
        return res.data.data;
    } catch (error) {
        const status = error?.response?.status;
        const data = error?.response?.data?.data;

        if (status === 404 && data?.reasonMessage?.code === "TEAM_NOT_FOUND") {
            throw new Error("요청한 팀을 찾을 수 없습니다.");
        } else if (status === 400 && data?.errorClassName === "MethodArgumentNotValidException") {
            throw new Error("팀 이모지는 필수 사항입니다.");
        } else {
            throw new Error("알 수 없는 오류가 발생했습니다.");
        }
    }
};


// 팀장 조회
export const fetchTeamAdmin = async (teamId) => {
    const res = await axiosWithAuthorization.get(`/teams/${teamId}/admin`);
    return res.data.data;
}

