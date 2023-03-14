import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from 'react-router-dom';

import React from "react";

const { Sider } = Layout;

const sliderItems = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "数据目录管理",
    items: [
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
    items: [
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

    label: "账户管理",
    items: [
      {
        key: 31,
        label: "账户注册审核",
        path: "../orgList",
      },
      {
        key: 32,
        label: "用户信息查询",
        path: "../orgInfo",
      },
      {
        key: 33,
        label: "option33",
      },
    ],
  },
];

export default function AdminSlider(props) {
  const { SubMenu } = Menu;

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
      >
        {sliderItems.map((item) => (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.items.map((child) => (
              <Menu.Item key={child.key}>
                <Link to={child.path}>{child.label}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
}
