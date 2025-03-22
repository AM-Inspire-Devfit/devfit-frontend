import styled from "styled-components";

export const StyledContributionCircle = styled.svg`
    width: 100px;
    height: 100px;
`;

export const ContributionText = styled.text`
    font-size: 20px;
    font-weight: bold;
    fill: #2E1A86;
    text-anchor: middle;
    dominant-baseline: middle;
`;


export const ContributionCircle = ({ percentage }) => {
    const radius = 40; 
    const circumference = 2 * Math.PI * radius; 
    const offset = circumference * (1 - percentage / 100);

    return (
        <StyledContributionCircle viewBox="0 0 100 100">
            <circle cx="50" cy="50" r={radius} stroke="#E5DAFF" strokeWidth="10" fill="none"/>
            <circle
                cx="50" cy="50"
                r={radius}
                stroke="#796AD9"
                strokeWidth="10"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
            />
            <ContributionText x="50" y="55">{percentage}%</ContributionText>
        </StyledContributionCircle>
    );
};