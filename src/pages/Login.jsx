import { Form, Input, Button, Layout } from "antd";
import React from "react";
import CommonFooter from "../components/CommonFooter";
import HomeHeader from "../components/HomeHeader";
import "../assets/common.css";

const { Content } = Layout;

export default function Login() {
  return (
    <Layout className="layout">
      <HomeHeader></HomeHeader>
      <Content
        style={{
          width: "100%",
          padding: 30,
          minHeight: 800,
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="brain-form-page-bg">
          <div className="brain-form-page-title">
            <h1> 用户登录 </h1>
          </div>
          <div className="brain-form-page-main">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "请输入手机号 / 用户名!" },
                  { pattern: "^[^ ]+$", message: "用户名不能有空格" },
                ]}
              >
                <Input placeholder="请输入用户名" bordered={false} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "请输入密码!" },
                  { pattern: "^[^ ]+$", message: "密码不能有空格" },
                ]}
              >
                <Input
                  bordered={false}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <a href="register">创建账号</a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40PX", borderRadius: "12PX" }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
