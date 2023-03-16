import React from "react";
import { Space, Button, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function AdminHeader() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("did");
    localStorage.removeItem("token");
    message.success("退出成功!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <header>
      <div
        className="header-content"
        style={{ width: "100%", padding: "0 30px" }}
      >
        <div
          className="logo"
          style={{
            float: "left",
            color: "#FFF",
          }}
        >
          <Link
            style={{
              fontSize: 35,
              fontWeight: 800,
              color: "#FFF",
            }}
            to="/"
          >
            Data Brain
          </Link>
        </div>
        <div className="space-align-block">
          <Space
            wrap
            align="baseline"
            style={{
              float: "right",
            }}
          >
            <Link to="/userInfo">
              <Avatar icon={<UserOutlined />} />
              <Avatar size={48}>{localStorage.getItem("userName")}</Avatar>
            </Link>

            <Button type="primary" onClick={logout} style={{ color: "white" }}>
              退出
            </Button>
          </Space>
        </div>
      </div>
    </header>
  );
}
