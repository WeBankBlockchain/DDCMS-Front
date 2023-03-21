import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import AdminHeader from "../components/AdminHeader";
import CommonFooter from "../components/CommonFooter";
import AdminSlider from "../components/AdminSlider";
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

          <AdminSlider
          ></AdminSlider>

          <Content
          style={{
            // padding: "0 10% 0 10%",
            minHeight: 1680,
          }}
        >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Content>
      <CommonFooter></CommonFooter>
  </Layout>
  )

}
