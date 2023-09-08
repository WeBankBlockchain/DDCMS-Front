import { message } from 'antd';
import React from "react";
import { useNavigate } from "react-router-dom";
import { BindThirdPartyApi, LoginWithThirdPartyApi } from '../../request/api';
import HomeHeader from "../../components/header/HomeHeader";

export default function ThirdPatryCallback() {
  const navigate = useNavigate();

  const type = new URLSearchParams(window.location.search).get('type');
  const code = new URLSearchParams(window.location.search).get('code');
  const operate = localStorage.getItem("thirdPartyOperation")
  const request = {
    type: type,
    code: code
  }
  if (operate === "bind") {
    //绑定第三方账号
    BindThirdPartyApi(request).then(res => {
      if (res.code === 0) {
        message.success("绑定成功");
        setTimeout(() => navigate("/admin/user/info"), 1000);
      }else {
        message.error(res.msg);
        setTimeout(() => navigate("/admin/user/info"), 1000);
      }
    });
  } else {
    //使用第三方登录
    LoginWithThirdPartyApi(request).then(res => {
      if (res.code === 0) {
        message.success("登录成功!");
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("accountType", res.data.accountType);
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setTimeout(() => navigate("/login"), 1000);
        message.error(res.msg);
      }
    });
  }


  return (
    <div>
      <HomeHeader ></HomeHeader>
      <div style={{ left: "50%", top: "50%" }}><h1>正在使用第三方账号登录...</h1></div>
    </div>
  );
}