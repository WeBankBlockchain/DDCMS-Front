import React from "react";
import { Space, Button } from "antd";
import "./HomeHeader.css";
import { Link, useNavigate } from "react-router-dom";
import NotLoginUser from './NotLoginUser';
import LoginUser from './LoginUser';

export default function HomeHeader() {

  
  const userOperation = localStorage.getItem('userName') !== null?<LoginUser/>:<NotLoginUser/>

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
        {userOperation}
      </div>
    </header>
  );
}
