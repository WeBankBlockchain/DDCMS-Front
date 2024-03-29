/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import {
  PageQueryMyFavSchemaApi,
  DelSchemaFavoriteApi,
} from "../../request/api";
import { message, Table, Radio, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "../../assets/Search.css";

const { Search } = Input;

const PAGE_SIZE = 10;

export default function AdminMyFavorateDataSchema() {
  const navigate = useNavigate();

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

          <a onClick={() => handleDelFav(record)}> 删除 </a>
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
    PageQueryMyFavSchemaApi(tableParams).then((res) => {
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

  const handleDelFav = async (record) => {
    const request = {
      schemaId: record.schemaId,
    };
    const resp = await DelSchemaFavoriteApi(request);
    if (resp.code === 0) {
      message.info("删除成功");
      setTableParams({
        pageNo: 1,
        pageSize: PAGE_SIZE,
      });
    } else {
      message.error(resp.msg);
    }
  };
  const handleOnRadioChange = (e) => {
    var chosenValue = e.target.value;
    chosenValue = chosenValue !== "-1" ? chosenValue : undefined;
    const query = {
      pageNo: 1,
      pageSize: PAGE_SIZE,
      status: chosenValue,
      keyWord: tableParams.keyWord,
    };
    setTableParams(query);
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
