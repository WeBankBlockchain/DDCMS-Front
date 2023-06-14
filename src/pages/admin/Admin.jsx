import React from "react";
import { Layout, theme } from "antd";
import AdminHeader from "../../components/header/AdminHeader";
import CommonFooter from "../../components/footer/CommonFooter";
import AdminSlider from "../../components/slide/AdminSlider";
import { Outlet } from "react-router-dom";
import LoginUser from "../../components/header/LoginUser";
import "../../assets/Admin.css"

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
          <div className="admin-content"
          >
            <div style={{ padding: "30px 2%" }}>
              <Outlet></Outlet>
            </div>
          </div>
        </Layout>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
