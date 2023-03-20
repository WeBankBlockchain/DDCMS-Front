
import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { PageQuerySchemaApi } from "../request/api";
import {message, Table, Link} from "antd";

import { useNavigate } from "react-router-dom";


export default function AdminAllDataSchema() {
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
    const [tableParams, setTableParams] = useState({
        pageNo: 1,
        pageSize: 2
    })
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    useEffect(()=>{
    
        PageQuerySchemaApi(tableParams).then(res=>{
            if (res.code === 0){
                setDataSchemaList(res.data.itemList);
            } else{
                message.error(res.msg);
            }
        });
    }

    , [tableParams]);


    const handleTableChange = (pagination) => {
        setPagination(pagination);
        setTableParams(t=>{
            return {
                ...t,
                pageNo:pagination.pageNo,
                pageSize: pagination.pageSize
            }
        })
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