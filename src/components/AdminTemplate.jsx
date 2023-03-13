import { Breadcrumb, Layout, theme } from "antd";
import React from "react";
import AdminHeader from "./AdminHeader";
import CommonFooter from "./CommonFooter";
import AdminSlider from "./AdminSlider";

const { Content } = Layout;

const AdminTemplate = (WrappedComponent) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (props) => {
    const { breadcrumb, defaultSelectedKeys, defaultOpenKeys, ...restProps } = props;

    return (
      <Layout>
        <AdminHeader></AdminHeader>
        <Content
          style={{
            width: "100%",
            padding: 30,
            minHeight: 800,
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{breadcrumb.home}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumb.list}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadcrumb.app}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
            }}
          >
            <AdminSlider
              background={colorBgContainer}
              defaultSelectedKeys={props.defaultSelectedKeys}
              defaultOpenKeys={props.defaultOpenKeys}
            ></AdminSlider>

            <Content
              style={{
                padding: "0 24px",
                minHeight: 1680,
              }}
            >
              <WrappedComponent {...restProps}></WrappedComponent>
            </Content>
          </Layout>
        </Content>
        <CommonFooter></CommonFooter>
      </Layout>
    );
  };
};
export default AdminTemplate;
