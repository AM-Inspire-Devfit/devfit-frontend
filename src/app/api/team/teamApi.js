import axiosWithAuthorization from "@/context/axiosWithAuthorization";

export const fetchTeamData = async (teamId) => {
        const res = await axiosWithAuthorization.get(`/teams/${teamId}`);
        console.log("team API response", res.data);
        return res.data.data; 
};

