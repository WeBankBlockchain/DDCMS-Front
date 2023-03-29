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
import { useNavigate } from "react-router-dom";
import CommonFooter from "../../components/footer/CommonFooter";
import HomeHeader from "../../components/header/HomeHeader";
import "../../assets/CommonStyle.css";
import { RegisterApi } from "../../request/api.js";
import FileUploader from "../../components/file/FileUploader";

const { Content } = Layout;
const { Option } = Select;

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileName, setFileName] = useState(null);

  const onFinish = (values) => {
    let registRequest, detailJsonStr;

    detailJsonStr = JSON.stringify({
      companyName: values.orgName,
      companyContact: values.phone,
      companyCertType: values.certType,
      companyCertNo: values.certNo,
      companyCertFileUri: fileName,
    });
    registRequest = {
      accountType: values.userType,
      userName: values.userName,
      password: values.password,
      detailJson: detailJsonStr,
    };

    RegisterApi(registRequest)
      .then((res) => {
        if (res.code === 0) {
          console.log("success");
          message.success("注册成功!");
          setTimeout(() => navigate("/result"), 1000);
        } else {
          console.log(res);
          message.error("登录失败!");
          message.error(res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  // 表单提交失败的回调函数
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("表单提交错误");
  };

  // 定义一个函数，用于接收子组件传递过来的数据
  const handleFileChange = (res) => {
    console.log(res);
    // 更新状态变量
    setFileName(res);
  };

  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (value !== password) {
      return Promise.reject("Passwords do not match");
    }
    return Promise.resolve();
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
              initialValues={{ userType: "1" }}
            >
              <Form.Item
                name="userType"
                rules={[{ required: true, message: "请选择用户类型" }]}
              >
                <Radio.Group
                  style={{
                    marginTop: 16,
                  }}
                >
                  <Radio value="1">普通机构</Radio>
                  <Radio value="2">见证方</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="userName"
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
                  {
                    validator: validateConfirmPassword,
                  },
                ]}
              >
                <Input.Password placeholder={"请确认密码"} />
              </Form.Item>

              {
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
              }

              {
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
              }

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

              {
                <Form.Item
                  name="orgCert"
                  rules={[
                    {
                      validator: () =>
                        fileName
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                      message: "请上传机构证件照片",
                    },
                  ]}
                >
                  <FileUploader
                    onFileChange={handleFileChange}
                    label="请上传证件照片"
                  ></FileUploader>
                </Form.Item>
              }

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
                  我已阅读并同意 <Button type="link">协议</Button>
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
