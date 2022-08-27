import React from "react";
import styles from "./index.module.scss";
import { Button, Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Login = () => {
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
    axios
      .post("https://freddy.codesubmit.io/login", values)
      .then(function (response) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.PageLogin}>
      <div className={styles.formHeader}>
        <p>Freddy's artisanal halloween candy shop</p>
        <img src="./Freddys_Logo.svg" alt="logo" />
      </div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          placeholder="User Name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          placeholder="PassWord"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn_submit}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
