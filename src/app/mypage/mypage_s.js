import styled from "styled-components";

export const Container = styled.div`
    width: 750px;
    margin: 0 auto;
`;


export const ProfileSection = styled.section`
    display: flex;
    align-items: center;
    gap: 20px; 
    width: 100%;
`;

export const ProfileImage = styled.div`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 2px solid #796AD9;
    background-size: cover;
    background-position: center;
    margin-left: 40px;

    ${({ $profileImage }) =>
        $profileImage
            ? `background-image: url(${$profileImage});`
            : `background-image: url('/img/default-profile.png');`}
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    gap: 5px; 
    margin-left: 70px; 
`;

export const Username = styled.h2`
    font-size: 28px;
    font-weight: bold;
`;

export const EvaluationButton = styled.button`
    width: 70px;
    height: 35px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #6C757D;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #5a6268;
    }
`;


export const SprintBox = styled.div`
    width: 750px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #9377FF;
    border-radius: 15px;
    padding: 30px;
    margin-top: 50px;
    margin-bottom: 50px;
`;

export const BoxDivider = styled.div`
    width: 1px;
    background-color: #9377FF;
    opacity: 0.5;
    flex-grow: 1; 
    align-self: stretch;
    margin: 0 10px;
`;

export const SprintInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33%;
    text-align: center;
`;

export const SprintTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #5A46C6;
    margin-bottom: 8px;
`;

export const SprintDescription = styled.p`
    font-size: 14px;
    color: #4F3DBD;
    margin-top: 5px;
    width: 150px;
`;

export const ContributionWrapper = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

export const ContributionTitle = styled.p`
    margin-top: 0px;
    font-size: 16px;
    font-weight: bold;
    color: #5A46C6;
    margin-bottom: 10px; 
`;

export const RoleWrapper = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

export const RoleTitle = styled.p`
    margin-top: 0px;
    font-size: 16px;
    font-weight: bold;
    color: #5A46C6;
    margin-bottom: 40px;
`;

export const RoleText = styled.h2`
    font-size: 28px;
    font-weight: bold;
    color: #5A46C6;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 30px;
`;

export const TaskHeader = styled.h2`
    font-size: 30px;
    font-weight: bold;
    color: #2E1A86;
    margin-bottom: 5px;
    margin-left: 40px;
    text-align: left;
    width: 100%;
`;
