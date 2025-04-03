import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 팀 정보 조회
export const fetchTeamData = async (teamId) => {
    try {
        const res = await axiosWithAuthorization.get(`/teams/${teamId}`);
        console.log("팀 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "팀 정보를 조회할 수 없습니다.";
        throw new Error(message);
    }
};

// 팀 초대 코드 확인
export const fetchTeamCode = async (teamId) => {
    try {
        const res = await axiosWithAuthorization.get(`/teams/${teamId}/invite-code`);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "초대 코드를 확인할 수 없습니다.";
        throw new Error(message);
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
        const message = error?.response?.data?.data?.message ?? "팀 이모지를 업데이트할 수 없습니다.";
        throw new Error(message);
    }
};


// 팀장 조회
export const fetchTeamAdmin = async (teamId) => {
    try {
    const res = await axiosWithAuthorization.get(`/teams/${teamId}/admin`);
    return res.data.data;
    }
    catch (error) {
        const message = error?.response?.data?.data?.message ?? "팀 Admin 조회를 할 수 없습니다.";
        throw new Error(message);
    }
}

// (팀장 제외, 본인 포함) 팀원 목록 조회
export const fetchRandomTeamMembers = async (teamId) => {
    try {
        const res = await axiosWithAuthorization.get(`/members/${teamId}/list`, {
          params: { size: 3 }, // 3명
        });
        const memberData = res.data.data.content.map((m) => ({
            id: m.memberId,
            name: m.nickname,
            profileImage: m.profileImageUrl,
        }));

        console.log("랜덤 팀원 정보 조회:", memberData);
        return memberData;
    
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "랜덤 팀원 조회를 할 수 없습니다.";
        throw new Error(message);
    }
};

