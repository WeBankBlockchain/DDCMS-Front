import { Form, Checkbox, Input, Button, Layout, message, Divider } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from "../../request/api";
import "../../assets/CommonStyle.css";

// import "../../assets/CommonStyle.css";
const { Content } = Layout;

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const onFinish = async (values) => {
    let loginRequest = {
      userName: values.userName,
      password: values.password,
    };
    const res = await LoginApi(loginRequest);
      if (res.code === 0) {
        setIsLogin(true);
        message.success("登录成功!");
        localStorage.setItem("userName", loginRequest.userName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("accountType", res.data.accountType);
        setTimeout(() => navigate("/admin"), 1000);
      } else {
          message.error(res.msg);
      }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误", errorInfo);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      minWidth:'100vw',
      minHeight: '100vh',
    }}>
      <HomeHeader ></HomeHeader>
      <div className="login-body">
        <div className=" main-form">
           <h1 style={{
              color: 'black',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '10px'
            }}> 用户登陆 </h1>
          <div 
          style={{
            margin: 'auto'
          }}>
            <Form
                name="normal_login"
                initialValue
                
                s={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                  margin: '0 auto 0 auto',//让整个框居中,
                }}
                size="large"
                
            >
                <Form.Item
                  name="userName"
                  label="登陆账号"
                  rules={[
                    { required: true, message: "请输入手机号 / 用户名!" },
                    { pattern: "^[^ ]+$", message: "用户名不能有空格" },
                  ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                      placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="登陆密码"
                  rules={[
                    { required: true, message: "请输入密码!" },
                    { pattern: "^[^ ]+$", message: "密码不能有空格" },
                  ]}
                  style={{
                    marginBottom:'10px'
                  }}
                >
                  <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
                </Form.Item>
                <Checkbox style={{
                  marginBottom:'10px'
                }}>记住凭据</Checkbox>
            
                <Form.Item style={{
                    marginBottom: '10px',
                }}>
                <Button type="primary" htmlType="submit" style={{
                  width: '100%',
                  height: "40PX", 
                  borderRadius: "4PX" 
                }}
                  disabled={isLogin}
                >
                登陆
                </Button>
                </Form.Item>
 
                <Form.Item style={{
      
                  marginBottom:'0px' //覆盖原有的
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',

                  }}>
                  <a >忘记密码</a>
                  <a href="register">新用户注册</a>
                  </div>
                </Form.Item>

              </Form>
          </div>
        </div>
 
      </div>
    </div>
  );
}
