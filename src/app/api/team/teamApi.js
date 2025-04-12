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

// 팀 이름 & 설명 & 이모지 수정
export const updateTeamData = async (teamId, teamName, teamDescription, teamEmoji) => {
    try {
        const res = await axiosWithAuthorization.patch(`/teams/${teamId}`, {
            teamName,
            teamDescription,
            teamEmoji,
        });
        console.log("팀 정보 수정 성공:", res.data);
        return res.data.data;
    }
    catch (error) {
        const message = error?.response?.data?.data?.message ?? "팀 정보를 업데이트할 수 없습니다.";
        throw new Error(message);
    }
}


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
export const fetchTeamMembers = async (teamId, lastMemberId = null) => {
    try {
        const res = await axiosWithAuthorization.get(`/members/${teamId}/list`, {
        params: {
            size: 3, 
            lastMemberId: lastMemberId,
        },
        });

        console.log("팀원 데이터:", res.data);

        const memberData = res.data.data.content.map((m) => ({
            id: m.memberId,
            name: m.nickname,
            profileImage: m.profileImageUrl,
        }));

        const isLastPage = res.data.data.last;
        return { 
            members: memberData, 
            isLastPage 
        };

    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "팀원 조회를 할 수 없습니다.";
        throw new Error(message);
    }
};

