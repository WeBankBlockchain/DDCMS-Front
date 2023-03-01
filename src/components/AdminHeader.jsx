import React from "react";
import { Space } from "antd";
import { Header } from "antd/es/layout/layout";
import UserIcon from "./parts/UserIcon";
export default function AdminHeader() {
  return (
    <Header>
      <div className="header-content">
        <div
          className="logo"
          style={{
            float: "left",
            color: "#FFF",
            fontSize: "35px",
            fontWeight: 800,
          }}
        >
          Data Brain
        </div>
        <Space
          style={{
            float: "right",
          }}
        >
          <UserIcon></UserIcon>
        </Space>
      </div>
    </Header>
  );
}
