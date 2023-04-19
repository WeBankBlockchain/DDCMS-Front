import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useLocation } from "react-router-dom";

import {
  QueryDataSchemaApi,
  QueryDataSchemaAccessInfoApi,
} from "../../request/api";

import { message, Layout, Divider,Col, Row, Card, Descriptions, Tag, Tabs } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import moment from "moment";
import "../../assets/SchemaDetail.css";


const dataFormatNames = {
  0: "JSON",
  1: "XML",
};

const dataProtocolNames = {
  0: "HTTP",
  1: "HTTPS",
  2: "SFTP",
};

const fontStyle = {
  fontSize:'var(--schema-detail-font-size)',
  fontWeight: 'var(--schema-detail-font-weight)',
  lineHeight: 'var(--schema-detail-line-height)'
}
const cardStyle={
  marginBottom:'20px'
};

const headerStyle={
  ...fontStyle,
  borderLeft: '4px solid lightgrey',
  borderRadius: 'clear'
}
export default function SchemeDetail() {
  const location = useLocation();
  const [basicData,setBasicData] = useState();
  const [priceData,setPriceData] = useState();
  const [accessInfo, setAccessInfo] = useState();
  const schemaId = location.state?.schemaId;

  useEffect(()=>{
    async function loadDetail(){
      const schemaResp = await QueryDataSchemaApi({
        schemaId: schemaId
      });
      if (schemaResp.code !== 0){
        message.error(schemaResp.msg);
        return;
      }
      var schemaData = schemaResp.data;
      const accessResp = await QueryDataSchemaAccessInfoApi({
        accessId: schemaData.accessId
      });
      if (accessResp.code !== 0){
        message.error(accessResp.msg);
        return;
      }
      const accessData = accessResp.data;
      populateBasicData(schemaData, accessData, setBasicData);
      populatePriceData(schemaData, accessData, setPriceData);
    }

    loadDetail();
  },[]);


  return (
  <div>
    <div id="schema-detail-content">
      <BasicInfo data={basicData}/>
      <PriceInfo data={priceData}/>
      <DetailInfo/>
      <BusinessInfo />
      <CompanyInfo  />
    </div>
 
  </div>
)
}



function BasicInfo({data}) {
  const tabItems = [
    {
      key: '1',
      label: `详细介绍`,
      children: data?.description,
    },
    {
      key: '2',
      label: `使用范围`,
      children: data?.usage
    },
  ]

  return (
    <Card
    headStyle={headerStyle}
    style={cardStyle}
    title="基本信息">
      <LabelValuePair label='产品名称' value={data?.name}/>
      <LabelValuePair label='产品类型' value={data?.type}/>
      <LabelValuePair label='归属业务' value={data?.business}/>
      <LabelValuePair label='提供机构' value={data?.company}/>
      <LabelValuePair label='创建日期' value={moment(data?.createDate).format('YYYY-MM-DD HH:mm:ss')}/>
      <LabelValuePair label='产品标签' value=            
        {data?.tags?.map((tag) => (
               <Tag key={tag} color="blue">
                 {tag}
               </Tag>
          ))}/>
      <Tabs defaultActiveKey="1" items={tabItems} />
  </Card>
  )
}

function PriceInfo({data}) {
  return (
    <Card
    headStyle={headerStyle}
    style={cardStyle}
    title="价格信息">
      <LabelValuePair label='计费模式' value={data?.priceMode}/>
      <LabelValuePair label='详细价格' value={data?.price}/>
      <LabelValuePair label='计费说明' value={data?.priceDescription}/>
  </Card>
  )
}

function DetailInfo({data}) {
  return (
    <Card
    headStyle={headerStyle}
    style={cardStyle}
    title="详情信息">
      <LabelValuePair label='数据格式' value='TBD'/>
      <LabelValuePair label='传输协议' value='TBD'/>
      <LabelValuePair label='数据URL' value='TBD'/>
      <LabelValuePair label='生效时间' value='TBD'/>
      <LabelValuePair label='失效时间' value='TBD'/>
      <LabelValuePair label='请求参数' value='TBD'/>
      <LabelValuePair label='响应参数' value='TBD'/>
  </Card>
  )
}

function BusinessInfo({data}) {
  return (
    <Card
    headStyle={headerStyle}
    style={cardStyle}
    title="归属业务">
      <LabelValuePair label='业务名称' value='TBD'/>
      <LabelValuePair label='业务说明' value='TBD'/>
  </Card>
  )
}

function CompanyInfo({data}) {
  return (
    <Card headStyle={headerStyle}
    style={cardStyle}
    title="机构信息">
      <LabelValuePair label='机构名称' value='TBD'/>
      <LabelValuePair label='联系方式' value='TBD'/>
  </Card>
  )
}


function LabelValuePair({label, value}){

  return (
    <Row >
      <Col style={fontStyle} span={5}>{label}:</Col>
      <Col style={fontStyle}>{value}</Col>
    </Row>
  )
}

async function populateBasicData(schemaData, accessData, setBasicData){
  const basicData = {
    name: schemaData.dataSchemaName,
    type: '数据API',
    tags: schemaData.tagNameList,
    business: schemaData.productName,
    company: schemaData.providerName,
    createDate: schemaData.createTime,
    description: schemaData.dataSchemaDesc,
    usage: schemaData.dataSchemaUsage
  }

  setBasicData(basicData);
}

async function populatePriceData(schemaData, accessData, setPriceData) {
  const priceData = {
    priceMode: '按次计费',
    price: schemaData.price,
    priceDescription: '先用后付,按次计费'
  }
  setPriceData(priceData);
}
// {
//   "schemaId": 3,
//   "dataSchemaName": "蚂蚁花呗数据",
//   "providerId": 6,
//   "providerName": "阿里",
//   "tagNameList": [
//       "科技",
//       "金融",
//       "征信"
//   ],
//   "productId": 3,
//   "productName": "蚂蚁金服",
//   "version": 1,
//   "visible": 1,
//   "dataSchemaDesc": "蚂蚁花呗月度个人数据",
//   "dataSchemaUsage": "仅用于友商",
//   "price": 2,
//   "status": 1,
//   "favTag": null,
//   "reviewTime": 1680599765000,
//   "createTime": 1680599765000,
//   "agreeCount": null,
//   "denyCount": null,
//   "witnessCount": null,
//   "accessId": 3,
//   "dataFormat": null,
//   "dataProtocol": null,
//   "contentSchema": null,
//   "accessCondition": null,
//   "uri": null,
//   "effectTime": null,
//   "expireTime": null
// }