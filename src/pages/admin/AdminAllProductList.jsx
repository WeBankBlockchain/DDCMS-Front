import React from "react";
import { useEffect, useState } from "react";
import { PageQueryProductApi } from "../../request/api";
import { useNavigate } from "react-router-dom";
import { Table, message, Radio, Input, Badge } from "antd";
import moment from "moment";

const { Search } = Input;
const PAGE_SIZE = 10;

export default function AdminAllProductList() {
  const navigate = useNavigate();
  const navigateTo = (productId) => {
    console.log(productId);
    navigate(`/admin/product/detail`, {
      state: {
        productId: productId,
      },
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
      render: (t) => renderStatus(t),
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => navigateTo(record.productId)}>查看</a>
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
    chosenValue = chosenValue != "-1" ? chosenValue : undefined;
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
          <Radio.Button value="0">未审核</Radio.Button>
          <Radio.Button value="1">已审核</Radio.Button>
          <Radio.Button value="2">已拒绝</Radio.Button>
        </Radio.Group>
        <Search
          style={{
            width: "20%",
          }}
          placeholder="根据名称搜索"
          onSearch={handleOnSearch}
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

function renderStatus(statusCode) {
  if (statusCode === 0) {
    return <Badge status="processing" text="审核中" />;
  } else if (statusCode === 1) {
    return <Badge status="success" text="审核通过" />;
  } else if (statusCode === 2) {
    return <Badge status="failed" text="拒绝" />;
  }
}
