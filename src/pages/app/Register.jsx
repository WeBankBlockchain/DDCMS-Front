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
import { RegisterApi } from "../../request/api.js";
import FileUploader from "../../components/file/FileUploader";

const { Option } = Select;

export default function Register() {

  return (
    <div className="layout" style={{
      backgroundColor:'#ebeff5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems:'center'
    }}>

        <h1 style={{
          display:'block',
          marginTop: '5vh',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>Data-Brain账号注册</h1>
       
        <div
        className='main'
        style={{
          backgroundColor: 'white',
          width: '60%',
          position: 'relative',
          top: '5vh',
          borderRadius: '30px',
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
    
        <RegisterForm />
      </div>

    </div>
  );
}

function RegisterForm(props) {
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
  <Form
    form={form}
    name="register"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    style={{
      fontWeight: '500',
      width:'40%',
      marginLeft:'auto',
      marginRight: 'auto',

    }}
    scrollToFirstError
    initialValues={{ userType: "1" }}
  >
    <Form.Item
      label="注册类型"
      name="userType"
      rules={[{ required: true, message: "请选择用户类型" }]}
      style={{
      }}
    >
      <Radio.Group
        style={{
          position:'relative',
          left: '30%'
        }}
        optionType="button"
        buttonStyle="solid"
      >
        <Radio value="1">普通机构</Radio>
        <Radio value="2">见证方</Radio>
      </Radio.Group>
    </Form.Item>

    <Form.Item
      label="用户名称"
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
      label="输入密码"
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
      label="确认密码"
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
        label="机构名称"
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
        label="证件类型"
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
      label="证件号码"
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
        label="证件上传"
        name="orgCert"
        required
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
      label="手机号码"
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
    style={{
      display:'block',
      paddingLeft:'auto',
      paddingRight:'auto'
    }}
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
      <Checkbox       style={{

      }}>
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
)
}
