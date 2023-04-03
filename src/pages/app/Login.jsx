import { Form, Input, Button, Layout, message, Divider } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginApi } from "../../request/api";
import "../../assets/CommonStyle.css";
const { Content } = Layout;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    let loginRequest = {
      userName: values.userName,
      password: values.password,
    };
    console.log(loginRequest)
    // LoginApi(loginRequest)
    //   .then((res) => {
    //     if (res.code === 0) {
    //       message.success("登录成功!");
    //       localStorage.setItem("userName", loginRequest.userName);
    //       localStorage.setItem("did", res.data.did);
    //       localStorage.setItem("token", res.data.token);
    //       localStorage.setItem("accountType", res.data.accountType);
    //       setTimeout(() => navigate("/admin"), 1000);
    //     } else {
    //       console.log(res);
    //       message.error(res.msg);
    //     }
    //   })
    //   .catch((error) => {
    //     message.error(error.response.data.message);
    //   });
    console.log("Received values of form: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误", errorInfo);
  };

  return (
    <div style={{
      backgroundImage: 'url(https://pic.90sheji.com/design/00/83/84/10/5f9cc91b2c66e.jpg)',
      position: 'fixed',//用于让div按照浏览器作为父组件，这样高度宽度自动填充满浏览器
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',//采用flex布局，默认
      justifyContent: 'center',//在水平方向居中
      alignItems: 'center'//在垂直方向居中
    }}>
      <div id='login-window' style={{
        position: 'relative',//在原有位置的基础上，往上微调一点点，使得视觉效果最优
        top: '-10%',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            marginBottom: '30px',
            color: 'white'
          }}> Data-Brain后台管理系统 </h1>
        </div>
        <div 
        style={{
          width: '75%',
          backgroundColor: 'white',
        }}>
          <Form
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                margin: 'auto',//让整个框居中,
                paddingTop: '20px',
                width: '80%',
              }}
          >
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "请输入手机号 / 用户名!" },
                  { pattern: "^[^ ]+$", message: "用户名不能有空格" },
                ]}
              >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
        />
              </Form.Item>
              
              <Form.Item>
              <Button type="primary" htmlType="submit" style={{
                backgroundColor:'orange',
                width: '100%'
              }}>
              登陆
              </Button>

              </Form.Item>
              <a href="register" style={{
                color: 'blue'
              }}>创建账号</a>
            </Form>
        </div>
       
            
      
      </div>
    </div>
  );
}
