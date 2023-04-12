import { Form, Input, Button, Layout, message, Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from "../../request/api";
import { CheckBox } from "react-native-web";

// import "../../assets/CommonStyle.css";
const { Content } = Layout;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let loginRequest = {
      userName: values.userName,
      password: values.password,
    };
    const res = await LoginApi(loginRequest);
      if (res.code === 0) {
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
      backgroundColor: '#ebeff5',
      position: 'fixed',
      top: 0,
      left: 0,
      minWidth:'100vw',
      minHeight: '100vh',
    }}>
      <HomeHeader ></HomeHeader>
      <div className="login-body" style={{
          display: 'flexbox',//采用flex布局，默认
          flexDirection: 'column',
          justifyContent: 'center',//在水平方向居中
          alignItems: 'center',//在垂直方向居中,
          fontWeight: '500',
          position: 'relative',
          top: '5%'
      }}>
            <h1 style={{
              color: 'black',
              textAlign: 'center'
            }}> 用户登陆 </h1>
          <div 
          style={{
            border: '1px solid lightgrey',
            borderRadius: '4px',
            // width: '30%',
            maxWidth: '450px',
            padding: '10px 5px 0px 5px',
            margin: 'auto'
          }}>
            <Form
                name="normal_login"
                initialValue
                
                s={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                  margin: 'auto',//让整个框居中,
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
                >
                  <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
                </Form.Item>
            
                <Form.Item>
                <Button type="primary" htmlType="submit" style={{
                  width: '100%',
                  height: "40PX", 
                  borderRadius: "4PX" 
                }}>
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
                  <a href="register">创建账号</a>
                  </div>
                </Form.Item>

              </Form>
          </div>
        
              
        
        </div>
      </div>
  );
}
