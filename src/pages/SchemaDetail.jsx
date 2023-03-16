import React, { useEffect, useState } from 'react'
import ReactJson from 'react-json-view';
import { useLocation } from 'react-router-dom'

import {QueryDataSchemaApi, QueryDataSchemaAccessInfoApi} from '../request/api';

import {message, Layout, Divider, Card, Descriptions, Tag} from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item';
import moment from 'moment';

const dataFormatNames = {
  0: 'JSON',
  1: 'XML'
}

const dataProtocolNames = {
  0: 'HTTP',
  1: 'HTTPS',
  2: 'SFTP'
}
export default function SchemaDetail() {

  const location = useLocation();
  const {schemaId, schemaGid} = loadSchemaIdFromLocation(location);
  const [dataSchema, setDataSchema] = useState({});

  const [dataSchemaAccessInfo, setDataSchemaAccessInfo] = useState({});
  
  
  useEffect(()=>{
    const request = {
      schemaGid: schemaGid
    };
    
    QueryDataSchemaApi(request).then(res=>{
      if (res.code === 0){
        const schemaInfo = res.data;
        setDataSchema(schemaInfo);
        if (schemaInfo.visible) {
          const accessInfoRequest = {
            accessId: schemaInfo.accessId
          };
          QueryDataSchemaAccessInfoApi(accessInfoRequest).then(res=>{
            if (res.code === 0){
              // console.log(JSON.parse(res.data.accessCondition))
              setDataSchemaAccessInfo(res.data);
            } else{
              console.log(res.msg);
              message.error('执行错误:'+res.msg);
            }
          });
        }
        
      } else{
        console.log(res.msg);
        message.error('执行错误:'+res.msg);
      }
    });

  },
  []);


  return (
    
    <Layout style={{textAlign:'center'}}>
      <Card title="基本信息">
        <Descriptions bordered>
        <DescriptionsItem label='目录Id' span={3}>
            {dataSchema.dataSchemaGid}
          </DescriptionsItem>
          <DescriptionsItem label='公司名称' >
            {dataSchema.providerName}
          </DescriptionsItem>
          
          <DescriptionsItem label='产品名称'>
            {dataSchema.productName}
          </DescriptionsItem>
          
          <DescriptionsItem label='目录名称'>
            {dataSchema.dataSchemaName}
          </DescriptionsItem>
                    
          <DescriptionsItem label='版本'>
            {dataSchema.version}
          </DescriptionsItem>
          
          <DescriptionsItem label='公开可见'>
            {dataSchema.visible > 0?'是':'否'}
          </DescriptionsItem>

          <DescriptionsItem label='创建时间'>
            {moment(dataSchema.createTime).format('YYYY-MM-DD')}
          </DescriptionsItem>

          <DescriptionsItem label='定价' >
          {dataSchema.price?.toFixed(2) } 元/条
          </DescriptionsItem>

          <DescriptionsItem label='标签' span={2}>
            {dataSchema.tagNameList?.map((tag)=>(
              <Tag key={tag} color='blue'>{tag}</Tag>
            ))}
          </DescriptionsItem>
          
          <DescriptionsItem label='建议使用范围' span={3}>
            {dataSchema.dataSchemaUsage}
          </DescriptionsItem>
          
          <DescriptionsItem label='详情描述' span={3}>
            {dataSchema.dataSchemaDesc}
          </DescriptionsItem>
        </Descriptions>
      </Card>

      <Divider></Divider>

      {dataSchema.visible && (
        <Card title="访问信息" >
        <Descriptions bordered>
          <DescriptionsItem label='数据格式'  span={2} >
              {dataFormatNames[dataSchemaAccessInfo.dataFormat]}
          </DescriptionsItem>
          <DescriptionsItem label='数据传输协议'  span={2}>
              {dataProtocolNames[dataSchemaAccessInfo.dataProtocol]}
          </DescriptionsItem>
          <DescriptionsItem label='数据访问链接'  span={3}>
              {dataSchemaAccessInfo.uri}
          </DescriptionsItem>
          <DescriptionsItem label='生效时间' span={2} >
              {moment(dataSchemaAccessInfo.effect_time).format('YYYY-MM-DD')}
          </DescriptionsItem>
          <DescriptionsItem label='失效时间'  span={2}>
            {moment(dataSchemaAccessInfo.expire_time).format('YYYY-MM-DD')}
          </DescriptionsItem>
          <DescriptionsItem label='返回数据格式' span={3} >

            { 
                dataSchemaAccessInfo && dataSchemaAccessInfo.contentSchema ?
                <ReactJson displayDataTypes={false} src={JSON.parse(dataSchemaAccessInfo.contentSchema)} />
                :'-'
              }
          </DescriptionsItem>
          <DescriptionsItem label='查询条件' span={3} >
            { 
              dataSchemaAccessInfo && dataSchemaAccessInfo.accessCondition ?
              <ReactJson displayDataTypes={false} src={JSON.parse(dataSchemaAccessInfo.accessCondition)} />
              :'-'
            }
            {/* <ReactJson displayDataTypes={false} src={JSON.parse(dataSchemaAccessInfo.contentSchema)} /> */}
          </DescriptionsItem>
        </Descriptions>
      </Card>
      )}

    
    </Layout>
    
    
    
  )
}


function loadSchemaIdFromLocation(location) {
    // const schemaId = location.state?.dataSchemaId;
  return {
    schemaId: 1,
    schemaGid: 'AAAQGayMdnmwj5IbY/O5ZaN/wdCoB8BcEbeT2CwCpHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd=='
  }
}
