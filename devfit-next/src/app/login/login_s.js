import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  margin: 0 auto;
  margin-top: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #796AD9;
  text-align: center;
`;

export const OauthButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props) => props.bgColor || "white"};
  color: ${(props) => props.textColor || "#696969"};
  font-size: 16px;
  font-weight: bold;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.$hoverBgColor || props.$bgColor};
    color: ${(props) => props.$hoverTextColor || props.$textColor};
  }

  img {
    margin-right: 10px;
  }
`;

export const Input = styled.input`
    padding: 10px;
    marginTop: 5px;
    border: 1px solid #ccc;
    borderRadius: 4px;
`;