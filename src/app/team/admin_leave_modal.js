import * as m from '@/components/modal_s';
import { IoClose } from 'react-icons/io5';

export default function AdminLModal({ onClose }) {
    return (
        <m.ModalOverlay>
            <m.ModalContent
                style = {{
                    position: "relative",
                    height: "190px"
                }}
            >
                <m.CloseButton onClick={onClose}>
                    <IoClose size={24} />
                </m.CloseButton>
                <div 
                    style={{
                        fontSize: "40px",
                        color: "#6A50C5",
                        fontWeight: "bold",
                        marginBottom: "17px"
                    }}
                >
                    !
                </div>
                <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>
                    프로젝트 팀장은 프로젝트를 나갈 수 없습니다.
                </p>
                <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.5" }}>
                    마이페이지에서 팀장 양도 후 [나가기]를 진행해주세요.
                </p>
            </m.ModalContent>
        </m.ModalOverlay>
    )

}