"use client"

import * as n from "./Navbar";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation"; 
import { logout } from "@/app/api/logout/logout";

const Navbar_ = () => {

    const router = useRouter();
    
    const handleLogout = async () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (!confirmLogout) return; 
        
        try {
            await logout(); // 로그아웃 요청
            localStorage.removeItem("accessToken"); // 저장된 토큰 제거 
            localStorage.removeItem("storedUser"); // 유저 정보 제거 
            router.push("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <n.NavbarContainer>
            <Link href="/boarding/" passHref>
            <n.LogoContainer>
                <Image 
                    src="/img/devfit-logo.png" 
                    alt="Logo" 
                    width={110} 
                    height={60} />
            </n.LogoContainer>
            </Link>
            <n.NavLinks>
                <n.LogoutButton onClick={handleLogout}>Logout</n.LogoutButton>
            </n.NavLinks>
        </n.NavbarContainer>
    );
}

export default Navbar_;