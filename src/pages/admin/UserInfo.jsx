import React from "react";
import { Badge, Descriptions, message } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { QueryCompanyByUsernameApi } from "../../request/api";

export default function UserInfo() {
  const [data, setData] = useState();
  const username = localStorage.getItem("userName");

  const req = { userName: username };

  const queryApi = (action) => {
    action(req)
      .then((res) => {
        if (res.code === 0) {
          console.log(res.data);
          setData(res.data);
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

  const fetchData = () => {
    queryApi(QueryCompanyByUsernameApi);
  };

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
        <Descriptions.Item label="证件号码">
          {data.companyCertNo}
        </Descriptions.Item>
        <Descriptions.Item label="did" span={2}>
          {data.did}
        </Descriptions.Item>
        <Descriptions.Item label="证件影像文件" span={3}>
          {data.companyCertFileUri}
        </Descriptions.Item>
        <Descriptions.Item label="私钥地址" span={3}>
          {data.privateKey}
        </Descriptions.Item>
        <Descriptions.Item label="开户日期" span={2}>
          {moment(data.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="审核状态">
          {data.status === 0 && <Badge status="default" text="未注册" />}
          {data.status === 1 && <Badge status="processing" text="审核中" />}
          {data.status === 2 && <Badge status="success" text="已审核" />}
          {data.status === 3 && <Badge status="error" text="已拒绝" />}
        </Descriptions.Item>
        <Descriptions.Item label="联系方式">
          {data.companyContact}
        </Descriptions.Item>
      </Descriptions>
    );

  useEffect(() => {
    fetchData();
  }, []);

  return <OrgProfile />;
}
