import React from "react";
import { useEffect, useState } from "react";
import { PageQuerySchemaApi } from "../../request/api";
import { message, Table, Input } from "antd";
import renderStatusBadge from "../../utils/statusRender";
import renderVoteProgress from "../../utils/progressRender";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const PAGE_SIZE = 10;

export default function AdminAllDataSchema() {
  const navigate = useNavigate();
  const navigateTo = (schemaId) =>
    navigate(`/admin/schema/detail`, {
      state: {
        schemaId: schemaId,
      },
    });

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
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => navigateTo(record.schemaId)}>查看</a>
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
    PageQuerySchemaApi(tableParams).then((res) => {
      if (res.code === 0) {
        setDataSchemaList(
          res.data.itemList.map((item, index) => ({ ...item, key: index }))
        );
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
          justifyContent: "flex-end",
        }}
      >
        <Search
          style={{
            width: "20%",
          }}
          placeholder="根据名称搜索"
          onSearch={handleOnSearch}
        ></Search>
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
