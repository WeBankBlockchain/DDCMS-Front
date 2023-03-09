import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

const { Sider } = Layout;
["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

export default function AdminSlider(props) {
  return (
    <Sider
      style={{
        background: props.background,
      }}
      width={200}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={props.defaultSelectedKeys}
        defaultOpenKeys={props.defaultOpenKeys}
        style={{
          height: "100%",
        }}
        items={items2}
      />
    </Sider>
  );
}
