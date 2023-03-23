import { Form, Input, Button, Layout, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import "../../assets/CommonStyle.css";
import { LoginApi } from "../../request/api";

const { Content } = Layout;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    let loginRequest = {
      userName: values.userName,
      password: values.password,
    };
    LoginApi(loginRequest)
      .then((res) => {
        if (res.code === 0) {
          console.log("succ");
          message.success("登录成功!");
          localStorage.setItem("userName", loginRequest.userName);
          localStorage.setItem("did", res.data.did);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("accountType", res.data.accountType);
          setTimeout(() => navigate("/admin"), 1000);
        } else {
          console.log(res);
          message.error("登录失败!");
          message.error(res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
    console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误", errorInfo);
  };

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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item
                name="userName"
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
