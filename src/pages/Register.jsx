import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  Layout,
  message,
} from "antd";

import { useState } from "react";
import CommonFooter from "../components/CommonFooter";
import HomeHeader from "../components/HomeHeader";
import "../assets/common.css";

const { Content } = Layout;
const { Option } = Select;


export default function Register() {
  const [form] = Form.useForm();
  const [personalVisible, setPersonalVisible] = useState(true);
  const [companyVisible, setCompanyVisible] = useState(false);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    message.success("提交成功");
  };

  // 表单提交失败的回调函数
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误");
  };

  // 用户类型改变时的回调函数
  const onUserTypeChange = (value) => {
    let ut = value.target.value;
    console.log(ut);
    if (ut === "personal") {
      setPersonalVisible(true);
      setCompanyVisible(false);
    } else {
      setPersonalVisible(false);
      setCompanyVisible(true);
    }
  };
  

  return (
    <Layout className="layout">
      <HomeHeader></HomeHeader>
      <Content
        style={{
          width: "100%",
          padding: 30,
          minHeight: 800,
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div className="brain-form-page-title">
          <h1> 注册Data Brain账号</h1>
        </div>
        <div className="brain-form-page-bg">
          <div className="brain-form-page-main">
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError
            >
              <Form.Item
                name="userType"
                rules={[{ required: true, message: "请选择用户类型" }]}
              >
                <Radio.Group
                  defaultValue="personal"
                  buttonStyle="solid"
                  style={{
                    marginTop: 16,
                  }}
                >
                  <Radio.Button value="personal" onChange={onUserTypeChange}>
                    个人用户注册
                  </Radio.Button>
                  <Radio.Button value="company" onChange={onUserTypeChange}>
                    机构用户注册
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: "请输入登录名！",
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder={"请输入登录名"} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder={"请输入密码"} />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "请确认密码!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("两次输入的密码不相同!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={"请确认密码"} />
              </Form.Item>

              {personalVisible && (
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "请输入姓名!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder={"请输入姓名"} />
                </Form.Item>
              )}

              {companyVisible && (
                <Form.Item
                  name="orgName"
                  rules={[
                    {
                      required: true,
                      message: "请输入机构名称!",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder={"请输入机构名称"} />
                </Form.Item>
              )}

              {personalVisible && (
                <Form.Item
                  name="certType"
                  rules={[
                    {
                      required: true,
                      message: "请选择证件类型",
                    },
                  ]}
                >
                  <Select placeholder="请选择证件类型">
                    <Option value="nationalID">身份证</Option>
                    <Option value="passport">护照</Option>
                    <Option value="other">其他证件</Option>
                  </Select>
                </Form.Item>
              )}

              {companyVisible && (
                <Form.Item
                  name="certType"
                  rules={[
                    {
                      required: true,
                      message: "请选择机构证件类型",
                    },
                  ]}
                >
                  <Select placeholder="请选择机构证件类型">
                    <Option value="busiID">营业执照</Option>
                    <Option value="otherOrgId">其他证件</Option>
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                name="certNo"
                rules={[
                  {
                    required: true,
                    message: "请输入证件号码",
                  },
                ]}
              >
                <Input
                  placeholder="请输入证件号码"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "请输入手机号码",
                  },
                ]}
              >
                <Input
                  placeholder="请输入手机号码"
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              {personalVisible && (
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "非法的E-mail地址!",
                    },
                  ]}
                >
                  <Input placeholder="请输入电子邮箱！" />
                </Form.Item>
              )}

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("需要同意协议")),
                  },
                ]}
              >
                <Checkbox>
                  我已阅读并同意 <a href="">协议</a>
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ height: "40PX", borderRadius: "12PX" }}
                >
                  同意协议并提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
      <CommonFooter></CommonFooter>
    </Layout>
  );
}
