/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { ApproveAccountApi, SearchCompanyApi } from "../../request/api";
import {
  Table,
  Space,
  Descriptions,
  Popover,
  message,
  Badge,
  Radio,
  Input,
  Image,
} from "antd";
import moment from "moment";
import { DownloadFileApi } from "../../request/api";

export default function AdminAccountList() {
  const [sortedInfo, setSortedInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { Search } = Input;
  const [accountStatus, setAccountStatus] = useState("1");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [tableParams, setTableParams] = useState({
    accountStatus: accountStatus,
    pageNo: 1,
    pageSize: 10,
  });
  const [currentUrl, setCurrentUrl] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);

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
    queryApi(SearchCompanyApi);
  };

  const onSearch = (keyword) => {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams, accountStatus, currentUrl, currentFile]);

  const handleChange = (pagination, _, sorter) => {
    setSortedInfo(sorter);
    setPagination(pagination);
    setTableParams({
      accountStatus: accountStatus,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const approve = (did, agree) => {
    const approveReq = {
      approved: agree,
      did: did,
    };
    ApproveAccountApi(approveReq)
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

  const onAccountStatusChange = (value) => {
    let ut = value.target.value;
    const {
      keyWord: removedKeyword,
      accountStatus: status,
      pageNo: p,
      ...rest
    } = tableParams;
    setPagination({ current: 1, pageSize: 10 });
    setTableParams({ ...rest, accountStatus: ut, pageNo: 1 });
    setAccountStatus(ut);
  };

  const handleDownload = async (filename) => {
    if (filename !== currentFile) {
      const params = { filename: filename };
      console.log(filename);
      const response = await DownloadFileApi(params);
      const blob = await response;
      const url = URL.createObjectURL(blob);
      setCurrentFile(filename);
      setCurrentUrl(url);
    }
  };

  const UsersList = () => (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 0 24px 0",
        }}
      >
        <Radio.Group
          buttonStyle="solid"
          value={accountStatus}
          onChange={onAccountStatusChange}
        >
          <Radio.Button value="1">未审核</Radio.Button>
          <Radio.Button value="2">已审核</Radio.Button>
          <Radio.Button value="3">已拒绝</Radio.Button>
        </Radio.Group>
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
      title: "账户类型",
      dataIndex: "accountType",
      key: "accountType",
      render: (accountType) => {
        if (accountType === "1") {
          return "普通机构";
        } else if (accountType === "2") {
          return "见证方";
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
          <Popover content={OrgProfile(record)}>
            <span
              onMouseEnter={() => handleDownload(record.companyCertFileUri)}
            >
              <a onClick={() => handleDownload(record.companyCertFileUri)}>
                查看详情
              </a>
            </span>
          </Popover>
          {record.status === 1 && (
            <a onClick={() => approve(record.did, true)}>通过</a>
          )}
          {record.status === 1 && (
            <a onClick={() => approve(record.did, false)}>拒绝</a>
          )}
        </Space>
      ),
    },
  ];

  columns.unshift({
    title: "机构名称",
    dataIndex: "companyName",
    key: "companyName",
    sorter: (a, b) => a.companyName.length - b.companyName.length,
    sortOrder: sortedInfo.columnKey === "companyName" ? sortedInfo.order : null,
    ellipsis: true,
  });

  const OrgProfile = (data) => {
    return (
      data && (
        <>
          <Descriptions title="机构用户信息" bordered>
            <Descriptions.Item label="账户类型">机构</Descriptions.Item>
            <Descriptions.Item label="机构名称">
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
            <Descriptions.Item label="证件图像" span={2}>
              {currentUrl && currentFile === data.companyCertFileUri && (
                <Image width={200} src={currentUrl} />
              )}
              {(!currentUrl || currentFile !== data.companyCertFileUri) && (
                <a onClick={() => handleDownload(data.companyCertFileUri)}>
                  下载图片
                </a>
              )}
            </Descriptions.Item>
          </Descriptions>
        </>
      )
    );
  };

  return <UsersList />;
}
