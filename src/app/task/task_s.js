import styled from "styled-components";

export const TaskContainerWrapper = styled.div`
    width: 720px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-top: 30px;
`;

export const AddTaskButton = styled.button`
    width: 90px;
    height: 35px;
    font-size: 15px;
    font-weight: bold;
    color: #796AD9;
    background-color: white;
    border: 2px solid #796AD9;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: white;
        background-color: #5a46c6;
        border: 2px solid #5a46c6;
    }
`;

export const TaskContainer = styled.div`
    width: 720px;
    height: 482px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    padding-top: 20px; 
    margin-bottom: 70px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.45);

    overflow-y: auto; 
    scroll-behavior: smooth;
`;

export const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    margin: 5px 0;
`;

export const TaskBox = styled.div`
    width: 530px;
    height: auto;
    min-height: 70px;
    background-color: ${({ $isCompleted, $isSOS }) => 
        $isCompleted ? "#EDEAFF" : 
        $isSOS ? "#FFE5E5" : "#ffffff"}; 
    border-radius: 8px;
    display: flex;
    align-items: center; 
    justify-content: space-between; 
    padding: 10px 15px;
    margin: 5px 0;
    border: 1px solid #796AD9;
`;

export const TaskLeft = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    gap: 3px;
`;

export const TaskCheckbox = styled.input.attrs({ type: "checkbox" })`
    width: 18px;
    height: 18px;
    appearance: none;
    border: 2px solid #4F3DBD;
    border-radius: 4px;
    background-color: white;
    flex-shrink: 0;
    
    &:checked {
        background-color: #579149;
        border-color: #579149;
    }
`;

export const TaskTitle = styled.span`
    font-size: 17px;
    width: 310px;
    font-weight: bold;
    color: #4F3DBD;
`;

export const TaskDate = styled.span`
    font-size: 12px;
    font-weight: normal;
    color: #6A5ACD;
    margin-left: 40px; 
`;

export const TaskRight = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    width: 180px;
`;

export const AssigneeProfile = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #796AD9;
    background-size: cover;
    background-position: center;
    background-image: ${({ $profileImage }) => `url(${$profileImage})`};
`;

export const AssigneeName = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: #333;
    margin-right: 20px;
`;

export const TaskStatusContainer = styled.div`
    width: auto;  
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`;

export const TaskCompleteDateContainer = styled.div`
    width: 120px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    color: #4F3DBD;
`;

export const TaskStatusButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: #A194F2; 
    background-color: #ffffff; 
    border: 3px solid #A194F2; 
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 25px;

    &:hover {
        color: white; 
        background-color: #A194F2; 
        border: 3px solid #A194F2; 
    }
`;

export const MyTaskButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: white; 
    background-color: #5a46c6; 
    border: 3px solid #5a46c6; 
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 25px;
`;

export const SOSButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: white; 
    background: #D9534F;
    border: 2px solid #D9534F;
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 25px;
    
    &:hover {
        background: #C9302C;
        border: 2px solid #C9302C;
    }
`;

export const NCButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: #B4B3B9; 
    background: #ffffff; 
    border: 2px solid #B4B3B9; 
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    margin-left: 25px;

    &:hover {
        color: #ffffff;
        background: #8F8D97; 
        border: 2px solid #8F8D97;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;  
    align-items: flex-end; 
    gap: 5px;  
    width: 100px;
    margin-left: 25px;
`;

export const CButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: #A194F2; 
    background: #ffffff; 
    border: 2px solid #A194F2; 
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        color: #ffffff; 
        background: #5a46c6; 
        border: 2px solid #5a46c6; 
    }
`;

export const SButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px; 
    height: 30px;
    font-size: 15px;
    font-weight: bold;
    color: ${({ $isSOS }) => ($isSOS ? "white" : "#C9302C")};  
    background: ${({ $isSOS }) => ($isSOS ? "#C9302C" : "#ffffff")};  
    border: 2px solid ${({ $isSOS }) => ($isSOS ? "#C9302C" : "#C9302C")}; 
    border-radius: 25px; 
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        color: white;
        background: #C9302C;
        border: 2px solid #C9302C;
    }
`;

export const CompletedDate = styled.p`
    font-size: 15px;
    font-weight: bold;
    color: #5a46c6; 
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px 0
`;



