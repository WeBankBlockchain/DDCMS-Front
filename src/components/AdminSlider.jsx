import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";

const { Sider } = Layout;

const sliderItems = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "数据目录管理",
    children: [
      {
        key: 11,
        label: "option11",
      },
      {
        key: 12,
        label: "option12",
      },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "产品管理",
    children: [
      {
        key: 21,
        label: "option21",
      },
      {
        key: 22,
        label: "option22",
      },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),

    label: "机构账户管理",
    children: [
      {
        key: 31,
        label: "机构注册审核",
      },
      {
        key: 32,
        label: "option32",
      },
    ],
  },
];

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
        items={sliderItems}
      />
    </Sider>
  );
}
