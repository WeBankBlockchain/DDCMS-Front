import { Form, Input, Button, Layout } from "antd";
import React from "react";
import CommonFooter from "../components/CommonFooter";
import HomeHeader from "../components/HomeHeader";
import "./Login.css";

const { Content } = Layout;

export default function Login() {
  return (
    <Layout className="layout">
      <HomeHeader></HomeHeader>
      <Content
        style={{
          padding: 124,
          minHeight: 600,
        }}
      >
        <div className="main">
          <div class="title">
            <span>密码登录</span>
          </div>
          <div class="title-msg">
            <span>请输入登录账户和密码</span>
          </div>
          <div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请输入手机号 / 用户名!" }]}
              >
                <Input placeholder="请输入用户名" bordered={false} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input
                  bordered={false}
                  type="password"
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item>
                <a href="src">创建账号</a>
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
