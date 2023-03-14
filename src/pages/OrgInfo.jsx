import React from "react";
import AdminTemplate from "../components/AdminTemplate";
import { useState } from "react";
import { Badge, Descriptions, Form, Input, Button, message } from "antd";
import { QueryCompanyByUsernameApi } from "../request/api";
import moment from "moment";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 2 },
};

// const Profile = () => (
//   <Descriptions title="用户信息" bordered>
//     <Descriptions.Item label="账户类型">机构</Descriptions.Item>
//     <Descriptions.Item label="账户名称">微众银行</Descriptions.Item>
//     <Descriptions.Item label="证件类型"> 其他证件 </Descriptions.Item>
//     <Descriptions.Item label="证件号码">123456</Descriptions.Item>
//     <Descriptions.Item label="did" span={2}>
//       did123456
//     </Descriptions.Item>
//     <Descriptions.Item label="开户日期" span={2}>
//       2018-04-24 18:00:00
//     </Descriptions.Item>
//     <Descriptions.Item label="审核状态">
//       <Badge status="processing" text="审核中" />
//     </Descriptions.Item>
//     <Descriptions.Item label="联系方式">0755-12345678</Descriptions.Item>
//   </Descriptions>
// );

export default function OrgInfo() {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const myUsername = localStorage.getItem("username");
  console.log(myUsername);

  const UserCondition = () => (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      initialValues={{ username: myUsername }}
    >
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );

  const OrgProfile = () =>
    data && (
      <Descriptions title="用户信息" bordered>
        <Descriptions.Item label="账户类型">机构</Descriptions.Item>
        <Descriptions.Item label="账户名称">
          {data.companyName}
        </Descriptions.Item>
        <Descriptions.Item label="证件类型">
          {data.companyCertType}
        </Descriptions.Item>
        <Descriptions.Item label="证件号码"> </Descriptions.Item>
        <Descriptions.Item label="did" span={2}>
          {data.did}
        </Descriptions.Item>
        <Descriptions.Item label="证件影像文件" span={3}>
          {data.companyCertFileUri}
        </Descriptions.Item>
        <Descriptions.Item label="私钥地址" span={3}>
          {data.keyAddress}
        </Descriptions.Item>
        <Descriptions.Item label="开户日期" span={2}>
          {moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="审核状态">
          {data.status === 1 && <Badge status="processing" text="审核中" />}
          {data.status === 2 && <Badge status="success" text="已审核" />}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {data.companyContact}
        </Descriptions.Item>
      </Descriptions>
    );

  const Content = () => (
    <>
      <UserCondition />
      <OrgProfile />
    </>
  );

  const onFinish = (values) => {
    let req = {
      username: values.username,
    };
    QueryCompanyByUsernameApi(req)
      .then((res) => {
        if (res.code === 0) {
          console.log("queryCompanyByUsername query succ");
          setData(res.data.item);
        } else {
          console.log(res);
          message.error("查询失败!");
          message.error(res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const AdminPage = AdminTemplate(Content);
  const breadcrumb = {
    home: "首页",
    list: "账户管理",
    app: "用户信息查询",
  };
  return (
    <AdminPage
      breadcrumb={breadcrumb}
      defaultSelectedKeys={["32"]}
      defaultOpenKeys={["sub3"]}
    ></AdminPage>
  );
}
