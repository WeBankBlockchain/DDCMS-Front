import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { pageQueryProductApi,approveProductApi } from "../request/api";
import {
  Table,
  Space,
  Descriptions,
  Popover,
  message,
  Badge,
  Radio,
  Input,
} from "antd";
import moment from "moment";


export default function AdminProduct() {
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { Search } = Input;
  const [userType, setUserType] = useState("0");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [tableParams, setTableParams] = useState({
    pageNo: 1,
    pageSize: 10,
  });

  const queryApi = (action) => {
    action(tableParams)
      .then((res) => {
        if (res.code === 0) {
          const r = res.data.itemList;
          setData(
            r.map((item, index) => ({
              ...item,
              key: index,
            }))
          );
          setLoading(false);
          setPagination({
            ...pagination,
            total: res.data.totalCount,
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
  };

  const fetchData = () => {
    setLoading(true);
    if (userType === "1") {
      queryApi(pageQueryProductApi);
    }
  };

  const onSearch = (keyword) => {
    console.log(keyword);
    if (keyword === "") {
      const { keyWord: removedKeyword, ...rest } = tableParams;
      setTableParams(rest);
    } else {
      setTableParams({
        ...tableParams,
        keyWord: keyword,
      });
    }
  };

  useEffect(() => {
    setUserType("1");
    fetchData();
  }, [JSON.stringify(tableParams), userType]);

  const handleChange = (pagination, _, sorter) => {
    console.log("Various parameters", pagination, sorter);
    setSortedInfo(sorter);
    setTableParams({
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

  const approve = (record) => {
    const approveReq = {
        agree: true,
        productGId: record.productGid,
        did: record.did
    };
    console.log("approveReq parameters", approveReq);
    approveProductApi(approveReq)
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

  const productList = () => (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 0 24px 0",
        }}
      >
        <Search
          placeholder="请输入姓名/公司名称"
          style={{ width: 350 }}
          onSearch={onSearch}
          enterButton
        />
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleChange}
      />
    </>
  );

  const columns = [
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
      title: "注册状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === 0) {
          return <Badge status="default" text="审核中" />;
        } else if (status === 1) {
          return <Badge status="processing" text="已审核" />;
        } else if (status === 3) {
          return <Badge status="error" text="已拒绝" />;
        }
      },
      sorter: (a, b) => a.status - b.status,
      sortOrder: sortedInfo.columnKey === "status" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popover
            content={
                 OrgProfile(record)
            }
          >
            <a>查看详情</a>
          </Popover>
          {record.status === 0 && (
            <a onClick={() => approve(record)}>审核</a>
          )}
        </Space>
      ),
    },
  ];

  if (userType === "1") {
    columns.unshift({
      title: "机构名称",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.length - b.companyName.length,
      sortOrder:
        sortedInfo.columnKey === "companyName" ? sortedInfo.order : null,
      ellipsis: true,
    });
  }

  const OrgProfile = (data) =>
    data && (
      <Descriptions title="产品名称" bordered>
        <Descriptions.Item label="账户类型">机构</Descriptions.Item>
        <Descriptions.Item label="产品名称">
          {data.productName}
        </Descriptions.Item>
        <Descriptions.Item label="公司名称">
          {data.companyName}
        </Descriptions.Item>
        <Descriptions.Item label="did" span={2}>
          {data.did}
        </Descriptions.Item>
        <Descriptions.Item label="产品描述" span={3}>
          {data.productDesc}
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
      </Descriptions>
    );

  const AdminPage = AdminTemplate(productList);
  const breadcrumb = {
    home: "首页",
    list: "产品管理",
    app: "产品审核",
  };

  return (
    <AdminPage
      breadcrumb={breadcrumb}
      defaultSelectedKeys={["31"]}
      defaultOpenKeys={["sub3"]}
    ></AdminPage>
  );
}
