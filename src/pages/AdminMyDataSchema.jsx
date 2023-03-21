
import React from "react";
import { useEffect, useState } from "react";
import AdminTemplate from "../components/AdminTemplate";
import { PageQueryMySchemaApi } from "../request/api";
import {message, Table, Link, Input, Button} from "antd";

import { useNavigate } from "react-router-dom";
const {Search} = Input;

const PAGE_SIZE =10 ;

export default function AdminMyDataSchema() {
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
            <span>
                <a onClick={() => navigate(`/admin/schema/detail`,{
                state: {
                    schemaId: record.schemaId
                }
            })}>  查看  </a>

                <a onClick={() => navigate(`/admin/schema/modify`,{
                state: {
                    schemaId: record.schemaId
                }
            })}>  修改  </a>

                <a>  删除  </a>
            </span>

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
        PageQueryMySchemaApi(tableParams).then(res=>{
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
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                
                <Search 
                style={{
                    width: '20%',
                }}
                placeholder='根据名称搜索'
                onSearch={handleOnSearch}
                ></Search>
                <Button
                    style={{
                        marginLeft: '20px'
                    }}
                    type='primary'
                    onClick={()=>{
                        navigate('/admin/schema/create')
                    }}
                >创建数据目录</Button>
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