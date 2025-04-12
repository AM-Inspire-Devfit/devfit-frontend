"use client"

import * as B from "./boarding_s";

import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Boarding() {
    const router = useRouter();

    const handleStart = () => {
        router.push("/login");
    };

    return (
        <>
        <B.GradientContainer>
            <B.LogoWrapper>
                <Image
                    src="/img/devfit-logo.png"
                    alt="Logo"
                    width={400}
                    height={230}
                    priority 
                />
            </B.LogoWrapper>
            <B.StartButton onClick={handleStart}>시작하기</B.StartButton>
        </B.GradientContainer>
        </>
    );

}