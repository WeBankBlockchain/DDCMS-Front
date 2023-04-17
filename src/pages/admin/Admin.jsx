import React from "react";
import { Layout, theme } from "antd";
import AdminHeader from "../../components/header/AdminHeader";
import CommonFooter from "../../components/footer/CommonFooter";
import AdminSlider from "../../components/slide/AdminSlider";
import { Outlet } from "react-router-dom";
import HomeHeader from "../../components/header/HomeHeader";
import LoginUser from "../../components/header/LoginUser";
const { Content } = Layout;

export default function Admin() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const loginUser = <LoginUser></LoginUser>
  return (
    <Layout>
      <AdminHeader/>
      <Content>
        <Layout
          style={{
            background: colorBgContainer,
          }}
        >
          <AdminSlider></AdminSlider>

          <Content
            style={{
              minHeight: window.innerHeight - 171,
            }}
          >
            <div style={{ padding: "30px 2%" }}>
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
