import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import React from "react";

// interface Base {
//   id: number
// }
//
// interface Advance extends Base {
//   name: string
// }
//
// const test = (p: Base) => {
// }
//
// // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a = {id: 1, name: 'jack'}
// test(a)
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (value:{username:string,password:string}) => {
    // how to handle？
    register(value);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="usename"
        rules={[{required: true,message: 'Username is required'}]}>用户名
        <Input placeholder="用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          注册
        </Button>
        </Form.Item>
    </Form>
  );
};