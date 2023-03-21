import React from "react";
import { Link } from "react-router-dom";
import LoginUser from './LoginUser';

export default function AdminHeader() {


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
          <LoginUser/>
        </div>
      </div>
    </header>
  );
}
