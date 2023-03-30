import React from "react";
import { Layout, theme } from "antd";
import AdminHeader from "../../components/header/AdminHeader";
import CommonFooter from "../../components/footer/CommonFooter";
import AdminSlider from "../../components/slide/AdminSlider";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

export default function Admin() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <AdminHeader></AdminHeader>
      <Content>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <AdminSlider></AdminSlider>

          <Content
            style={{
              // padding: "0 10% 0 10%",
              minHeight: 1080,
            }}
          >
            <div style={{ padding: "10px 10% 10px 10%" }}>
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
