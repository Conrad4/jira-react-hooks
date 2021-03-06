import styled from "@emotion/styled";
import { Button, Card, Divider, Typography } from "antd";
import left from "assets/left.svg";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import React, { useState } from "react";
import { LoginScreen } from "unauthenticated-app/login";
import { RegisterScreen } from "unauthenticated-app/register";
import { useDocumentTitle } from "utils";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  // 用来处理登录时，没输入用户名或者输入错误信息 的红色报错提示
  const [error, setError] = useState<Error | null>(null);
  
  // 可以在登录界面，头部标题显示这个信息
  useDocumentTitle("请登录注册以继续");

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        {/* 怎么去实现切换功能，使用setState啊*/}
        <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;