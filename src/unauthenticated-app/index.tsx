import styled from '@emotion/styled';
import { Card } from "antd";
import React, { useState } from "react";
import { LoginScreen } from 'unauthenticated-app/login';
import { RegisterScreen } from 'unauthenticated-app/register';
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);


  return(
  <Container style={{ display: "flex", justifyContent: "center" }}>
    <Card>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      {/* 怎么去实现切换功能，使用setState啊*/}
      <button onClick={() => { setIsRegister(!isRegister) }}> 切换到{isRegister ? '登录' : '注册'}</button>
    </Card>
  </Container>
  )
};

const Container = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`