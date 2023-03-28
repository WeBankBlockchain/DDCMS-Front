/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useEffect, useState } from "react";
import { ApproveProductApi, PageQueryProductApi } from "../../request/api";
import { useNavigate } from "react-router-dom";
import { Table, message, Radio, Input, Space } from "antd";
import moment from "moment";
import renderStatusBadge from "../../utils/statusRender";
import renderVoteProgress from "../../utils/progressRender";

const { Search } = Input;
const PAGE_SIZE = 10;

export default function AdminAllProductList() {
  const navigate = useNavigate();
  const accountType = localStorage.getItem("accountType");
  const [approved, setApproved] = useState(new Map());

  const navigateTo = (productId) => {
    console.log(productId);
    navigate(`/admin/product/detail`, {
      state: {
        productId: productId,
      },
    });
  };

  const approveProduct = (productId, agree) => {
    const approveReq = {
      agree: agree,
      productId: productId,
    };
    ApproveProductApi(approveReq)
      .then((res) => {
        if (res.code === 0) {
          message.success("审批成功!");
          const map = new Map(approved);
          map.set(productId, true);
          setApproved(map);
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

  const columns = [
    {
      title: "产品id",
      dataIndex: "productId",
      key: "productId",
      width: 200,
    },
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
        <Space size="middle">
          <a onClick={() => navigateTo(record.productId)}>查看</a>
          {record.status === 0 &&
            accountType === "2" &&
            approved.has(record.productId) === false && (
              <a onClick={() => approveProduct(record.productId, true)}>通过</a>
            )}
          {record.status === 0 &&
            accountType === "2" &&
            approved.has(record.productId) === false && (
              <a onClick={() => approveProduct(record.productId, false)}>
                拒绝
              </a>
            )}
        </Space>
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
    PageQueryProductApi(tableParams).then((res) => {
      if (res.code === 0) {
        setProductList(
          res.data.itemList.map((item, index) => ({
            ...item,
            key: index,
          }))
        );
        setPagination(() => ({
          current: tableParams.pageNo,
          pageSize: PAGE_SIZE,
          total: res.data.totalCount,
        }));
      } else {
        message.error(res.msg);
      }
    });
  }, [tableParams, approved]);

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
    chosenValue = chosenValue !== "-1" ? chosenValue : undefined;
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
          style={{
            width: "20%",
          }}
          placeholder="根据名称搜索"
          onSearch={handleOnSearch}
          enterButton
        ></Search>
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
