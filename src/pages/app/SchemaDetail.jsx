import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useLocation } from "react-router-dom";

import {
  QueryDataSchemaApi,
  QueryDataSchemaAccessInfoApi,
  QueryProductByIdApi,
  QueryCompanyByAccountIdApi
} from "../../request/api";

import { message, Layout, Divider,Col, Row, Card, Descriptions, Tag, Tabs } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import moment from "moment";
import "../../assets/SchemaDetail.css";
import {dataFormatNames, dataProtocolNames} from '../../constants/constants';


const fontStyle = {
  fontSize:'var(--schema-detail-font-size)',
  fontWeight: 'var(--schema-detail-font-weight)',
  lineHeight: 'var(--schema-detail-line-height)'
}
const cardStyle={
  marginBottom:'20px'
};

const hidenDefault = "该信息已隐藏";

export default function SchemeDetail() {
  const location = useLocation();
  const [basicData,setBasicData] = useState();
  const [priceData,setPriceData] = useState();
  const [detailData, setDetailData] = useState();
  const [businessData, setBusinessData] = useState();
  const [companyData, setCompanyData] = useState();
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
      console.log(accessData)
      populateBasicData(schemaData, accessData, setBasicData);
      populatePriceData(schemaData, accessData, setPriceData);
      populateDetailData(schemaData, accessData, setDetailData);
      populateBusinessData(schemaData, accessData, setBusinessData);
      populateCompanyData(schemaData, accessData, setCompanyData);
    }

    loadDetail();
  },[]);


  return (
  <div>
    <div id="schema-detail-content">
      <BasicInfo data={basicData}/>
      <PriceInfo data={priceData}/>
      <DetailInfo data={detailData}/>
      <BusinessInfo data={businessData}/>
      <CompanyInfo  data={companyData}/>
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
    style={cardStyle}
    title="基本信息">
      <LabelValuePair label='产品名称' value={data?.name}/>
      <LabelValuePair label='产品类型' value={data?.type}/>
      <LabelValuePair label='归属业务' value={data?.business}/>
      <LabelValuePair label='提供机构' value={data?.company}/>
      <LabelValuePair label='创建日期' value={data?.createDate?moment(data?.createDate).format('YYYY-MM-DD HH:mm:ss'):''}/>
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
    style={cardStyle}
    title="价格信息">
      <LabelValuePair label='计费模式' value={data?.priceMode}/>
      <LabelValuePair label='详细价格' value={data?.price}/>
      <LabelValuePair label='计费说明' value={data?.priceDescription}/>
  </Card>
  )
}

function DetailInfo({data}) {
  const tabItems = [
    {
      key: '1',
      label: `请求参数`,
      children: data?.requestParams,
    },
    {
      key: '2',
      label: `响应参数`,
      children: data?.responseParams
    },
  ]

  return (
    <Card
    style={cardStyle}
    title="详情信息">
      <LabelValuePair label='数据格式' value={data?.dataFormat}/>
      <LabelValuePair label='传输协议' value={data?.transferProtocol}/>
      <LabelValuePair label='数据URL' value={data?.dataURL}/>
      <LabelValuePair label='生效时间' value={data?.startTime}/>
      <LabelValuePair label='失效时间' value={data?.endTime}/>
      <Tabs defaultActiveKey="1" items={tabItems} />
      {/* <LabelValuePair label='请求参数' value={data?.requestParams??hidenDefault}/>
      <LabelValuePair label='响应参数' value={data?.requestParams??hidenDefault}/> */}
  </Card>
  )
}

function BusinessInfo({data}) {

  return (
    <Card
    style={cardStyle}
    title="归属业务">
      <LabelValuePair label='业务名称' value={data?.businessName}/>
      <LabelValuePair label='业务说明' value={data?.businessDescription}/>
  </Card>
  )
}

function CompanyInfo({data}) {
  return (
    <Card
    style={cardStyle}
    title="机构信息">
      <LabelValuePair label='机构名称' value={data?.companyName}/>
      <LabelValuePair label='联系方式' value={data?.companyContact}/>
      <LabelValuePair label='机构说明' value={data?.companyDescription}/>
  </Card>
  )
}


function LabelValuePair({label, value}){

  return (
    <Row gutter={{  md: 40}}>
      <Col style={fontStyle}>{label}:</Col>
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

async function populateDetailData(schemaData, accessData, setDetailData) {
  console.log(accessData);

  const detailData = accessData?
  {
    dataFormat: dataFormatNames[accessData.dataFormat],
    transferProtocol: dataProtocolNames[accessData.dataProtocol],
    dataURL: accessData.uri,
    startTime: accessData.effectTime?moment(accessData.effectTime).format('YYYY-MM-DD HH:mm:ss'):"",
    endTime: accessData.expireTime?moment(accessData.expireTime).format('YYYY-MM-DD HH:mm:ss'):"",
    requestParams :accessData.accessCondition,
    responseParams: accessData.contentSchema
  }
  :  {
    dataFormat: hidenDefault,
    transferProtocol: hidenDefault,
    dataURL: hidenDefault,
    startTime: hidenDefault,
    endTime: hidenDefault,
    requestParams :hidenDefault,
    responseParams: hidenDefault
  };

  setDetailData(detailData);
}


async function populateBusinessData(schemaData, accessData, setBusinessData) {

  const productResp = await QueryProductByIdApi({
    productId: schemaData.productId
  });

  if (productResp.code !== 0){
    message.error(productResp.msg);
    return;
  } 
  const productInfo = productResp.data;
  console.log(productInfo);
  const businessData = {
    businessName: productInfo.productName,
    businessDescription: productInfo.productDesc
  };

  setBusinessData(businessData);
}

async function populateCompanyData(schemaData, accessData, setCompanyData) {
  const resp = await QueryCompanyByAccountIdApi({
    accountId: schemaData.providerId
  });
  if (resp.code !== 0){
    message.error(resp.msg);
    return;
  }
  const companyInfo = resp.data;
  console.log(companyInfo);

  const companyData = {
    companyName: companyInfo.companyName,
    companyContact: companyInfo.companyContact,
    companyDescription: companyInfo.companyDesc
  }
  setCompanyData(companyData);
}