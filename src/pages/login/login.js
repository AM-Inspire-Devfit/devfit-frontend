// login.js
import React, { useState } from 'react';
import {
  LoginContainer,
  Title,
  FormGroup,
  Button
} from './login_s';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 처리
    console.log('로그인 요청:', { email, password });
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            style={{
              padding: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="password">Password</label>
          {/* 인라인 스타일을 적용한 예시 */}
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            style={{
              padding: '10px',
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit">로그인</Button>
      </form>
    </LoginContainer>
  );
}

