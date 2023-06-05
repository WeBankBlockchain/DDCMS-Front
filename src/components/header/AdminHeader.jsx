import React from "react";
import { Link } from "react-router-dom";
import LoginUser from './LoginUser';
import "../../assets/AdminHeader.css";

export default function AdminHeader() {


  return (
    <header>
      <div
        className="admin-header"
      >
        <div
          className="logo"
        >
          <Link
            style={{
              fontSize: 35,
              fontWeight: 800,
              color: "#FFF",
            }}
            to="/"
          >
            DDCMS
          </Link>
        </div>
        <div>
          <LoginUser/>
        </div>
      </div>
    </header>
  );
}
