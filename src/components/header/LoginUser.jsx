import React from "react";
import { Space, Button, message, Avatar } from "antd";
import { useNavigate} from "react-router-dom";
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
          window.location.href = '/home';
        }, 1000);
      };

    return (
        <Space
        wrap
        align="baseline"
        style={{
          // float: "right",
        }}
      >
        <Link to="/admin/">
        <Avatar size={48} style={{
          cursor:'pointer'
        }}>管理</Avatar>
        </Link>
        <Link to="/admin/user/info">
          <Avatar size={48}>{localStorage.getItem("userName")}</Avatar>
        </Link>
        <Avatar size={48} onClick={logout} style={{
          cursor:'pointer'
        }}>退出</Avatar>

      </Space>
    )
}