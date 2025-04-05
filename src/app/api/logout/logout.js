import axiosWithAuthorization from "@/context/axiosWithAuthorization";

// 로그아웃
export const logout = async () => {
    const res = await axiosWithAuthorization.post(`/members/logout`);
    return res.data.data;
}