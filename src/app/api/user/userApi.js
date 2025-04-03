import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 회원 정보 조회
export const fetchUserData = async () => {
    try {
        const res = await axiosWithAuthorization.get(`/members/me`);
        console.log("회원 정보 조회:", res.data);
        return res.data.data;
    } catch (error) {
        const message = error?.response?.data?.data?.message ?? "회원 정보를 조회할 수 없습니다.";
        throw new Error(message);
    }
};