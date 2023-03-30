/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { PageQueryMySchemaApi } from "../../request/api";
import { message, Table, Input, Button, Space,Radio } from "antd";
import renderStatusBadge from "../../utils/statusRender";
import renderVoteProgress from "../../utils/progressRender";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const PAGE_SIZE = 10;

export default function AdminMyDataSchema() {
  const navigate = useNavigate();

  const schemaColumns = [
    {
      title: "目录名称",
      dataIndex: "dataSchemaName",
      key: "dataSchemaName",
      width: 200,
    },
    {
      title: "所属产品",
      dataIndex: "productName",
      key: "productName",
      width: 200,
    },
    {
      title: "所属公司",
      dataIndex: "providerName",
      key: "providerName",
      width: 200,
    },
    {
      title: "审核状态",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (t) => renderStatusBadge(t),
    },
    {
      title: "审核进度",
      key: "reviewProgress",
      width: 200,
      render: (text, record) => {
        return renderVoteProgress(record);
      },
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(`/admin/schema/detail`, {
                state: {
                  schemaId: record.schemaId,
                },
              })
            }
          >
            查看
          </a>

        </Space>
      ),
    },
  ];

  const [dataSchemaList, setDataSchemaList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pageNo: 1,
    pageSize: PAGE_SIZE,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    console.log("start query");
    PageQueryMySchemaApi(tableParams).then((res) => {
      if (res.code === 0) {
        setDataSchemaList(res.data.itemList);
        setPagination((p) => ({
          current: p.current,
          pageSize: PAGE_SIZE,
          total: res.data.totalCount,
        }));
      } else {
        message.error(res.msg);
      }
    });
  }, [tableParams]);

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setPagination(pagination);
    setTableParams((t) => {
      const newParams = {
        ...t,
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      };
      console.log(newParams);
      return newParams;
    });
  };

  const handleOnRadioChange = (e) => {
    var chosenValue = e.target.value;
    chosenValue = chosenValue !== "-1" ? chosenValue : undefined;
    const query = {
      pageNo: 1,
      pageSize: PAGE_SIZE,
      status: chosenValue,
      keyWord: tableParams.keyWord
    };
    setTableParams(query);
  };
  
  const handleOnSearch = (e) => {
    setPagination({
      current: 1,
      pageSize: PAGE_SIZE,
    });
    setTableParams({
      keyWord: e,
      pageNo: 1,
      pageSize: PAGE_SIZE,
    });
  };

  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: '0px 0px 20px 0px'
        }}
      >
        <Radio.Group
          defaultValue="-1"
          buttonStyle="solid"
          onChange={handleOnRadioChange}
        >
          <Radio.Button value="-1">全部</Radio.Button>
          <Radio.Button value="0">审核中</Radio.Button>
          <Radio.Button value="1">已审核</Radio.Button>
          <Radio.Button value="2">已拒绝</Radio.Button>
        </Radio.Group>
        <div>
          <Search
            style={{
              width: "500px",
            }}
            placeholder="根据名称搜索"
            onSearch={handleOnSearch}
          ></Search>
          <Button
            style={{
              marginLeft: "20px",
            }}
            type="primary"
            onClick={() => {
              navigate("/admin/schema/create");
            }}
          >
            创建数据目录
          </Button>
        </div>

      </div>

      <Table
        columns={schemaColumns}
        dataSource={dataSchemaList}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
