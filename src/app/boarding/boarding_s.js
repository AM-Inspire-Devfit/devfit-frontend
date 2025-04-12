import styled from "styled-components";

export const GradientContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, #ffffff, #d8d0fc, #a294f9);
`;

export const LogoWrapper = styled.div`
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

export const LogoImage = styled.img`
    width: 380px;
    height: auto;
    display: block;
`;

export const StartButton = styled.button`
    position: absolute;
    top: 400px;
    width: 250px;
    height: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #7c64d5;
    color: #ffffff;
    font-size: 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

