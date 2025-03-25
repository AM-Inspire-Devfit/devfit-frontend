"use client";
import { useAlert } from "@/context/AlertContext";
import styled from "styled-components";

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "error" ? "#ff4d4f" : "#52c41a"};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  font-weight: bold;
`;

const AlertBox = () => {
  const { alert } = useAlert();

  if (!alert) return null;

  return <AlertContainer type={alert.type}>{alert.message}</AlertContainer>;
};

export default AlertBox;
