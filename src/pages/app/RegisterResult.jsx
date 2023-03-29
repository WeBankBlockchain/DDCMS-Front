import { Result, Button, Layout } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";

const { Content } = Layout;

export default function RegisterResult() {
  const navigate = useNavigate();

  const extra = (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/home", {
            state: { homeFlag: 1 },
          });
        }}
      >
        返回首页
      </Button>
      <Button
        onClick={() => {
          navigate("/register");
        }}
      >
        继续注册
      </Button>
    </div>
  );
  return (
    <Layout className="layout">
      <HomeHeader></HomeHeader>
      <Content
        style={{
          width: "100%",
          padding: 100,
          minHeight: 800,
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <Result
          status="success"
          title="注册成功"
          subTitle="您的账号正在审核中，请耐心等待。我们将在1-3个工作日内完成审核，请留意短信或邮件通知。"
          extra={extra}
        ></Result>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
