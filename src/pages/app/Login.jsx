import { Form, Input, Button, Layout, message, Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from "../../request/api";

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
      position: 'fixed',//用于让div按照浏览器作为父组件，这样高度宽度自动填充满浏览器
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',//采用flex布局，默认
      justifyContent: 'center',//在水平方向居中
      alignItems: 'center',//在垂直方向居中,
      fontWeight: '500'
    }}>
      <div id='login-window' style={{
        position: 'relative',//在原有位置的基础上，往上微调一点点，使得视觉效果最优
        top: '-10%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}>
        <div>
          <h1 style={{
            marginBottom: '30px',
            color: 'black'
          }}> 欢迎使用Data-Brain </h1>
        </div>
        <div 
        style={{
          width: '75%',
          backgroundColor: 'white',
          borderRadius: '10px'
        }}>
          <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                margin: 'auto',//让整个框居中,
                paddingTop: '30px',
                width: '80%',
                paddingBottom:'20px'
              }}
          >
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "请输入手机号 / 用户名!" },
                  { pattern: "^[^ ]+$", message: "用户名不能有空格" },
                ]}
              >
                  <Input  size="large" prefix={<UserOutlined className="site-form-item-icon" />} 
                     placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "请输入密码!" },
                  { pattern: "^[^ ]+$", message: "密码不能有空格" },
                ]}
              >
                <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
              </Form.Item>
              
              <Form.Item>
              <Button type="primary" htmlType="submit" style={{
                width: '100%',
                height: "40PX", 
                borderRadius: "12PX" 
              }}>
              登陆
              </Button>

              </Form.Item>
              没有账号？点此
              <a href="register" style={{
                color: 'blue'
              }}
              
              >创建账号</a>
            </Form>
        </div>
       
            
      
      </div>
    </div>
  );
}
