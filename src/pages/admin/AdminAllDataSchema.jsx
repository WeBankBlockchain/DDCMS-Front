/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { PageQuerySchemaApi } from "../../request/api";
import { message, Table, Input, Space, Radio } from "antd";
import renderStatusBadge from "../../utils/statusRender";
import renderVoteProgress from "../../utils/progressRender";
import { useNavigate } from "react-router-dom";
import { ApproveDataSchemaApi } from "../../request/api";
import "../../assets/Search.css";

const { Search } = Input;

const PAGE_SIZE = 10;

export default function AdminAllDataSchema() {
  const navigate = useNavigate();
  const accountType = localStorage.getItem("accountType");
  const [approved, setApproved] = useState(new Map());
  const navigateTo = (schemaId) =>
    navigate(`/admin/schema/detail`, {
      state: {
        schemaId: schemaId,
      },
    });

  const schemaColumns = [
    {
      title: "数据目录",
      dataIndex: "dataSchemaName",
      key: "dataSchemaName",
      width: 200,
    },
    {
      title: "归属业务",
      dataIndex: "productName",
      key: "productName",
      width: 200,
    },
    {
      title: "归属机构",
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
          <a onClick={() => navigateTo(record.schemaId)}>查看</a>
          {record.status === 0 &&
            accountType === "2" &&
            approved.has(record.productId) === false && (
              <a onClick={() => approveSchema(record.schemaId, true)}>通过</a>
            )}
          {record.status === 0 &&
            accountType === "2" &&
            approved.has(record.productId) === false && (
              <a onClick={() => approveSchema(record.schemaId, false)}>
                拒绝
              </a>
            )}
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
  }, [tableParams, approved]);

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

  const approveSchema = (schemaId, agree) => {
    const approveReq = {
      agree: agree,
      schemaId: schemaId,
    };
    ApproveDataSchemaApi(approveReq)
      .then((res) => {
        if (res.code === 0) {
          message.success("审批成功!");
          const map = new Map(approved);
          map.set(schemaId, true);
          setApproved(map);
        } else {
          console.log(res);
          message.error("审批失败!"+res.msg);
        }
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <div style={{}}>

        <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: '0px 0px 20px 0px'
        }}>
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
          <Search
          className="admin-search-bar"
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
