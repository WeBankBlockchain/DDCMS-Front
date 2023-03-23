import React from "react";
import { useEffect, useState } from "react";
import { PageQueryProductApi,ApproveProductApi } from "../request/api";
import { useNavigate } from "react-router-dom";
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
import util from '../utils/util';
import Error from "./Error";

const {Search} = Input;
const PAGE_SIZE = 10;
const statusNames = {
  1: '审核中',
  2: '已审核',
  3: '已拒绝'
}

export default function AdminAllProductList() {
  
  const navigate = useNavigate();

  const columns = [
      {
        title: '产品id',
        dataIndex: 'productId',
        key: 'productId',
        width: 200
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200
      },
      {
        title: '所属公司',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 200
      },
      {
        title: '注册时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200,
        render: (t) => (
          moment(t).format('YYYY-MM-DD HH:mm:ss')
        )
      },
      {
        title: '审核状态',
        dataIndex: 'status',
        key:'status',
        width: 200,
        render: (t) => (renderStatus(t))
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <a onClick={() => navigate(`/admin/schema/detail`,{
              state: {
                  schemaId: record.schemaId
              }
          })}>查看</a>
      
          ),
      },
    ];
  
  const [productList, setProductList] = useState([]);
  const [tableParams, setTableParams] = useState({
      pageNo: 1,
      pageSize: PAGE_SIZE
  })
  const [pagination,setPagination] = useState({
      current: 1,
      pageSize: PAGE_SIZE
  });

  useEffect(()=>{
    PageQueryProductApi(tableParams).then(res=>{
          if (res.code === 0){
              setProductList(res.data.itemList);
              setPagination((p)=>(
                  {
                      current: tableParams.pageNo,
                      pageSize: PAGE_SIZE, 
                      total: res.data.totalCount
                  }))
          } else{
              message.error(res.msg);
          }
      });
  }

  , [tableParams]);


  const handlePageChange = (pagination) => {
      setTableParams(t=>{
          const newParams = {
              ...t,
              pageNo:pagination.current,
              pageSize: pagination.pageSize
          }
          console.log(newParams)
          return newParams
      })
    };

  const handleOnSearch = (e)=>{
    const query = {
      pageNo:1,
      pageSize: PAGE_SIZE,
      keyword: e
    }
    setTableParams(query)
  }
  const handleOnRadioChange = (e) =>{
    var chosenValue = e.target.value;
    chosenValue = chosenValue !='-1'? chosenValue: undefined;
    const query = {
      pageNo:1,
      pageSize: PAGE_SIZE,
      status: chosenValue
    }
    setTableParams(query)
  }
  return (
      <div style={{
      }}>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between'
          }}>
              <Radio.Group defaultValue="-1" buttonStyle="solid" onChange={handleOnRadioChange}>
                  <Radio.Button value="-1">全部</Radio.Button>
                  <Radio.Button value="1">未审核</Radio.Button>
                  <Radio.Button value="2">已审核</Radio.Button>
                  <Radio.Button value="3">已拒绝</Radio.Button>
              </Radio.Group>
              <Search 
              style={{
                  width: '20%'
              }}
              placeholder='根据名称搜索'
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
  return <span>{statusNames[statusCode]}</span>
}