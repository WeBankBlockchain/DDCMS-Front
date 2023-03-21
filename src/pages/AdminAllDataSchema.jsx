
import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { PageQuerySchemaApi } from "../request/api";
import {message, Table, Link, Input} from "antd";

import { useNavigate } from "react-router-dom";
const {Search} = Input;

const PAGE_SIZE =2 ;

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
        pageSize: PAGE_SIZE
    })
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE
    });

    useEffect(()=>{
    
        PageQuerySchemaApi(tableParams).then(res=>{
            if (res.code === 0){
                setDataSchemaList(res.data.itemList);
                setPagination((p)=>(
                    {
                        current: p.current,
                        pageSize: PAGE_SIZE, 
                        total: res.data.totalCount
                    }))
            } else{
                message.error(res.msg);
            }
        });
    }

    , [tableParams]);


    const handleTableChange = (pagination) => {
        console.log(pagination)
        setPagination(pagination);
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

      
    return (
        <div>
            <Search></Search>
            <Table 
            columns={schemaColumns} 
            dataSource={dataSchemaList} 
            pagination={pagination}
            onChange={handleTableChange}
            />
        </div>
    );
}