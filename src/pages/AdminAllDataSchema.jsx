
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
        console.log('start query')
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

    const handleOnSearch = (e)=>{
        setPagination({
            current: 1,
            pageSize: PAGE_SIZE
        })
        setTableParams({
            keyWord: e,
            pageNo: 1,
            pageSize: PAGE_SIZE
        })
    }
      
    return (
        <div style={{
            marginLeft: '50px',
            width: "80%"
        }}>
            <Search 
            style={{
                marginBottom: '50px',
                width: '50%'
            }}
            onSearch={handleOnSearch}
            ></Search>
            <div style={{
                
            }}>
                <Table 
                columns={schemaColumns} 
                dataSource={dataSchemaList} 
                pagination={pagination}
                onChange={handleTableChange}
                />
            </div>

        </div>
    );
}