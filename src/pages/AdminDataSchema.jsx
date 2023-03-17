
import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { PageQuerySchemaApi } from "../request/api";
import {message, Table, Link} from "antd";

import { useNavigate } from "react-router-dom";


export default function AdminDataSchema() {
    const navigate = useNavigate();

    const schemaColumns = [
        {
          title: '目录名称',
          dataIndex: 'dataSchemaName',
          key: 'dataSchemaName',
          width: 200
        },
        {
          title: '所属产品',
          dataIndex: 'productName',
          key: 'productName',
          width: 200
        },
        {
          title: '所属公司',
          dataIndex: 'providerName',
          key: 'providerName',
          width: 200
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <a onClick={() => navigate(`/schema/detail`,{
                state: {
                    schemaGid: record.schemaGid,
                    schemaId: record.schemaId
                }
            })}>View Details</a> // use the useHistory hook to navigate to the detail page for each product
          

            ),
        },
      ];
    
    const [dataSchemaList, setDataSchemaList] = useState([]);
    const [totalPage, setTotalPage] = useState(1); 
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 2
    });

    useEffect(()=>{
        const request = {
            pageNo: 1,
            pageSize: 10
        };
        PageQuerySchemaApi(request).then(res=>{
            if (res.code === 0){
                setDataSchemaList(res.data.itemList);
                setTotalPage(res.data.pageCount);
            } else{
                message.error(res.msg);
            }
        });
    }

    , [pagination]);

    const productList = (<div>aaa</div>)
    const AdminPage = AdminTemplate(productList);
    const breadcrumb = {
      home: "首页",
      list: "产品管理",
      app: "产品审核",
    };
    const handleTableChange = (pagination) => {
        setPagination(pagination);
      };

      
    return (
        <div>
            <Table 
            columns={schemaColumns} 
            dataSource={dataSchemaList} 
            pagination={pagination}
            onChange={handleTableChange}
            />;
        </div>
    );
}