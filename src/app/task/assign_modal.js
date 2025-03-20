import styled from "styled-components";
import * as m from '../../components/modal_s';

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #6a50c5;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        opacity: 0.9;
    }
`;


export default function AssignModal({ isOpen, onClose, taskTitle }) {
    if (!isOpen) return null;

    return (
        <m.ModalOverlay onClick={onClose}>
            <m.ModalContent 
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: "400px",
                    height: "180px"
                }}
            >
                <div style={{ fontSize: '20px', marginBottom: '10px', lineHeight: '1.5' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <strong>'{taskTitle}'</strong> 을
                    </div>
                    할당 받으시겠습니까?
                </div>
                <ButtonGroup>
                    <m.ModalButton onClick={onClose}>예</m.ModalButton>
                    <m.ModalButton onClick={onClose}>아니오</m.ModalButton>
                </ButtonGroup>
            </m.ModalContent>
        </m.ModalOverlay>
    );
}