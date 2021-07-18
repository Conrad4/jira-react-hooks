import { Button, Card } from "antd";
import left from "assets/left.svg";
import logo from "assets/logo.svg";
import right from "assets/right.svg";
import { useState } from "react";
import { useDocumentTitle } from "utils";
import { RegisterScreen } from 'unauthenticated-app/register';
import React from "react";
import { LoginScreen } from 'unauthenticated-app/login';

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);


  return <div>
    {
      isRegister ? <RegisterScreen /> : <LoginScreen />
    }
    {/* 怎么去实现切换功能，使用setState啊*/}
    <button onClick={() => { setIsRegister(!isRegister) }}> 切换到{isRegister ? '登录' : '注册'}</button>
  </div>
};

