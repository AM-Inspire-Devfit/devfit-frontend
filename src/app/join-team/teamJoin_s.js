import styled from 'styled-components';

export const TeamJoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 400px;
  margin: 0 auto;
  margin-top: 200px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 40px;
  color: #796AD9;
  text-align: center;
`;

export const Button = styled.button`
  width: 400px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #796AD9;
  background-color:#ffffff;
  border: 1px solid #EAE5FF;
  border-radius: 8px;

  img {
    margin-right: 10px;
  }
`;