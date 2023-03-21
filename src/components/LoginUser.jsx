import React from "react";
import { Space, Button, message, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function LoginUser() {
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("did");
        localStorage.removeItem("token");
        localStorage.removeItem("accountType");
        message.success("退出成功!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      };

    return (
        <Space
        wrap
        align="baseline"
        style={{
          float: "right",
        }}
      >
        <Link to="/admin/user/info">
          <Avatar icon={<UserOutlined />} />
          <Avatar size={48}>{localStorage.getItem("userName")}</Avatar>
        </Link>

        <Button type="primary" onClick={logout} style={{ color: "white" }}>
          退出
        </Button>
      </Space>
    )
}