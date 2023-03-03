import React from "react";
import { Space, Button } from "antd";
import "./HomeHeader.css";
import { Link, useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-content">
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
        <Space
          wrap
          style={{
            float: "right",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            登录
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            注册
          </Button>
        </Space>
      </div>
    </header>
  );
}
