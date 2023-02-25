import React from "react";
import {Space } from 'antd';
import { Header } from "antd/es/layout/layout";
import UserIcon from "./parts/UserIcon";
export default function AdminHeader() {
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        background: "rgba(0, 0, 0)",
        height: 80,
        width: "100%",
      }}
    >
      <div
        style={{
          float: "left",
          width: 800,
          height: 31,
          margin: "16px 24px 16px 0",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      ></div>
      <Space
        style={{
          float: "right",
        }}
      >
        <UserIcon></UserIcon>
      </Space>
    </Header>
  );
}
