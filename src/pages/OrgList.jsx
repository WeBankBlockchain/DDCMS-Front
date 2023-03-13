import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { ApproveAccount, SearchCompany } from "../request/api";
import {
  Table,
  Space,
  Button,
  Descriptions,
  Popover,
  message,
  Badge,
} from "antd";
import moment from "moment";

// const mockData = [
//   {
//     key: "1",
//     companyName: "腾讯",
//     createTime: 32,
//   },
//   {
//     key: "2",
//     companyName: "百度",
//     createTime: 42,
//   },
//   {
//     key: "3",
//     companyName: "阿里巴巴",
//     createTime: 33,
//   },
//   {
//     key: "4",
//     companyName: "字节跳动",
//     createTime: 19,
//   },
// ];

export default function OrgList() {
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    condition: {
      accountStatus: "Registered",
    },
    pageNo: 1,
    pageSize: 10,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const fetchData = () => {
    setLoading(true);
    SearchCompany(tableParams)
      .then((res) => {
        if (res.code === 0) {
          console.log(res.data.result);
          const r = res.data.result.items;
          setData(
            r.map((item, index) => ({
              ...item,
              key: index,
            }))
          );
          setLoading(false);
          setTableParams({
            ...tableParams,
            condition: {
              accountStatus: "Registered",
            },
            pagination: {
              ...tableParams.pagination,
              // TODO
              total: 20,
            },
          });
        } else {
          console.log(res);
          message.error("查询失败!");
          message.error(res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
    message.success("提交成功");
  };

  const handleChange = (pagination, _, sorter) => {
    console.log("Various parameters", pagination, sorter);
    setSortedInfo(sorter);
    setTableParams({
      condition: {
        accountStatus: "Registered",
      },
      pagination,
      ...sorter,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const reset = () => {
    setSortedInfo({});
  };

  const approve = (did) => {
    const approveReq = {
      approved: true,
      did: did,
    };
    ApproveAccount(approveReq)
      .then((res) => {
        if (res.code === 0) {
          message.success("审批成功!");
          setTimeout(fetchData(), 1000);
        } else {
          console.log(res);
          message.error("审批失败!");
          message.error(res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const usersList = () => (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={reset}>重置</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={tableParams.pagination}
        onChange={handleChange}
      />
    </>
  );

  const columns = [
    {
      title: "机构名称",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.length - b.companyName.length,
      sortOrder:
        sortedInfo.columnKey === "companyName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
      sorter: (a, b) => a.createTime - b.createTime,
      sortOrder:
        sortedInfo.columnKey === "createTime" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popover content={OrgProfile(record)} >
            <a>查看详情</a>
          </Popover>
          <a onClick={() => approve(record.did)}>审核</a>
        </Space>
      ),
    },
  ];

  const OrgProfile = (data) =>
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

  const AdminPage = AdminTemplate(usersList);
  const breadcrumb = {
    home: "首页",
    list: "账户管理",
    app: "机构注册审核",
  };

  return (
    <AdminPage
      breadcrumb={breadcrumb}
      defaultSelectedKeys={["31"]}
      defaultOpenKeys={["sub3"]}
    ></AdminPage>
  );
}
