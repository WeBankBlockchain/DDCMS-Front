/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { PageQueryMyProductApi } from "../../request/api";
import { useNavigate } from "react-router-dom";
import { Table, message, Radio, Input, Button } from "antd";
import moment from "moment";
import renderStatusBadge from "../../utils/statusRender";
import renderVoteProgress from "../../utils/progressRender";

const { Search } = Input;
const PAGE_SIZE = 10;

export default function AdminMyProductList() {
  const navigate = useNavigate();

  const columns = [
    {
      title: "产品名称",
      dataIndex: "productName",
      key: "productName",
      width: 200,
    },
    {
      title: "所属公司",
      dataIndex: "companyName",
      key: "companyName",
      width: 200,
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 200,
      render: (t) => moment(t).format("YYYY-MM-DD HH:mm:ss"),
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
        <span
          style={{
            dislay: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <a
            onClick={() =>
              navigate(`/admin/product/detail`, {
                state: {
                  productId: record.productId,
                },
              })
            }
          >
            查看
          </a>
        </span>
      ),
    },
  ];

  const [productList, setProductList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pageNo: 1,
    pageSize: PAGE_SIZE,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    PageQueryMyProductApi(tableParams).then((res) => {
      if (res.code === 0) {
        setProductList(res.data.itemList);
        setPagination((p) => ({
          current: tableParams.pageNo,
          pageSize: PAGE_SIZE,
          total: res.data.totalCount,
        }));
      } else {
        message.error(res.msg);
      }
    });
  }, [tableParams]);

  const handlePageChange = (pagination) => {
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
    const query = {
      pageNo: 1,
      pageSize: PAGE_SIZE,
      keyWord: e,
    };
    setTableParams(query);
  };
  const handleOnRadioChange = (e) => {
    var chosenValue = e.target.value;
    const query = {
      pageNo: 1,
      pageSize: PAGE_SIZE,
      status: chosenValue,
    };
    setTableParams(query);
  };
  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
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
            type="primary"
            style={{
              marginLeft: "20px",
            }}
            onClick={() => {
              navigate("/admin/product/create");
            }}
          >
            创建产品
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={productList}
        pagination={pagination}
        onChange={handlePageChange}
      />
    </div>
  );
}
