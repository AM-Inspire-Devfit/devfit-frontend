import styled from 'styled-components';

export const AlertBox = styled.div`
    width: 750px;
    height: 60px;
    background-color: #FFF3CD;
    color: #856404;
    font-weight: bold;
    font-size: 17px;
    border: 1px solid #FEEBC8;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

export const AlertIcon = styled.span`
    margin-right: 10px;
`;

export const BoxContainer = styled.div`
    width: 750px;
    position: relative;
    height: auto;
    background-color: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column; 
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    margin-top: 30px;
    margin-bottom: 50px;
`;

export const StyledInput = styled.input`
    font-size: 16px;
    color: #432CA4;
    border: 1px #432CA4;
    padding: 5px;
    border-radius: 3px;
    outline: none;
    width: 60%;
`;

export const ChartWrapper = styled.div`
    width: 80%;
    height: auto;
    border: 3px solid #9377FF;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    position: relative;
    margin: 40px 0;
`;

export const ChartTitle = styled.div`
    position: absolute;
    top: -18px;
    left: 50%; 
    transform: translateX(-50%); 
    background-color: #b399ff;
    color: white;
    font-weight: bold;
    font-size: 18px;
    padding: 8px 16px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); 
`;

export const ScrollableMemberList = styled.div`
    max-height: 250px;
    overflow-y: auto;
    padding-right: 10px; 
`;

// export const MemberList = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 10px;
//     width: 100%;
// `;

export const ProjectMember = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

export const ProfileContainer = styled.div`
    position: relative;
    width: 60px; 
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfileMain = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: ${({ $profileImage }) => `url(${$profileImage})`};
    background-size: cover; 
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ProfileIcon = styled.div`
    width: 20px; 
    height: 20px;
    border-radius: 50%;
    background-color: ${({ color }) => color || "#888"};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 5px;
    right: 0px;
    border: 2px solid white; 
`;

export const TopBadge = styled.span`
    font-size: 25px;
    margin-left: 5px;
`;

export const MemberInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    width: 100%;  
`;

export const DonutChartContainer = styled.div`
    flex: 1; 
    width: 100%; 
    min-width: 250px; 
    max-width: 400px; 
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
`;

export const ProgressContainer = styled.div`
    width: 80%;  
    height: 20px; 
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-top: 30px; 
    margin-bottom: 20px;
    position: relative; 
    display: flex;
    flex-direction: column; 
    align-items: center;
    overflow: visible;
`;

export const ProgressLabels = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between; 
    position: absolute;
    top: -18px; 
    font-size: 12px;
    color: #4F3DBD;
    padding: 0 5px; 
    z-index: 2;
`;

export const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #e0e0e0; 
    border-radius: 5px;
    overflow: hidden;
`;

export const ProgressBar = styled.div`
    width: ${({ progress }) => progress}%;
    height: 100%;
    background-color: #579149;
    border-radius: 5px;
    transition: width 0.5s ease-in-out;
`;

export const SprintBox = styled.div`
    width: 80%;
    min-height: 70px; 
    height: auto; 
    background-color: #EDEAFF;
    border-radius: 10px;
    display: flex; 
    flex-direction: column;
    align-items: flex-start; 
    justify-content: flex-start; 
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 35px;

    font-size: 14px; 
    font-weight: bold;
    color: #4F3DBD; 

    overflow: hidden; 
    box-sizing: border-box;
`;

export const TaskGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
    margin-top: 10px;
    width: 100%;
`;

export const TaskItem = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: normal;
    white-space: normal; 
    color: #4F3DBD;
`;

export const TaskCheckbox = styled.input.attrs({ type: "checkbox" })`
    width: 16px;
    height: 16px;
    appearance: none; 
    border: 1px solid #4F3DBD;
    border-radius: 4px;
    background-color: white; 
    flex-shrink: 0;

    &:checked {
        background-color: #579149;
        border-color: #579149;
    }
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end; 
    margin-top: 10px;
`;

export const TaskButton = styled.button`
    background-color: #796AD9;
    color: white;
    border: none;
    padding: 8px 16px; 
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background-color: #3b2ea3;
    }
`;

export const MeetingContainer = styled.div`
    display: flex;
    align-items: stretch; 
    width: 100%;
    gap: 30px;
    margin-top: 50px;
    margin-bottom: 100px;
`;

export const MeetingList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-grow: 1;
    align-self: stretch; 
`;

export const MeetingItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    padding: 10px 15px;
    border-radius: 10px;
    width: 200px; 
    font-size: 14px;
    color: #4F3DBD;
    font-weight: bold;
`;

export const MeetingDate = styled.span`
    background-color: #D6C7FF;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    color: #4F3DBD;
`;

export const FeedbackButton = styled.button`
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    background-color: #796AD9;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background-color: #3b2ea3;
    }
`;