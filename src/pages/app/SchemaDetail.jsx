import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useLocation } from "react-router-dom";

import {
  QueryDataSchemaApi,
  QueryDataSchemaAccessInfoApi,
} from "../../request/api";

import { message, Layout, Divider,Col, Row, Card, Descriptions, Tag } from "antd";
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

const cardStyle={
  marginBottom:'20px'
};

const headerStyle={
  fontSize: '20px',
  borderLeft: '4px solid lightgrey',
  borderRadius: 'clear'
}
export default function SchemeDetail() {
  return (
  <div>
    <div className="schema-detail-content">
      <BasicInfo style={cardStyle} />
      <PriceInfo  style={cardStyle} />
      <DetailInfo style={cardStyle} />
      <BusinessInfo style={cardStyle} />
      <CompanyInfo style={cardStyle} />
    </div>
 
  </div>
)
}

// export default function SchemaDetail() {
//   const location = useLocation();
//   const { schemaId } = loadSchemaIdFromLocation(location);
//   const [dataSchema, setDataSchema] = useState({});

//   const [dataSchemaAccessInfo, setDataSchemaAccessInfo] = useState();

//   useEffect(() => {
//     const request = {
//       schemaId: schemaId,
//     };

//     QueryDataSchemaApi(request).then((res) => {
//       if (res.code === 0) {
//         const schemaInfo = res.data;
//         setDataSchema(schemaInfo);

//         const accessInfoRequest = {
//           accessId: schemaInfo.accessId,
//         };
//         QueryDataSchemaAccessInfoApi(accessInfoRequest).then((res) => {
//           if (res.code === 0) {
//             // console.log(JSON.parse(res.data.accessCondition))
//             setDataSchemaAccessInfo(res.data);
//           }
//         });
//       } else {
//         console.log(res.msg);
//         message.error("执行错误:" + res.msg);
//       }
//     });
//   }, []);

//   return (
//     <Layout style={{ textAlign: "center" }}>
//       <Card title="基本信息">
//         <Descriptions bordered>
//           <DescriptionsItem label="机构名称">
//             {dataSchema.providerName}
//           </DescriptionsItem>

//           <DescriptionsItem label="业务名称">
//             {dataSchema.productName}
//           </DescriptionsItem>

//           <DescriptionsItem label="产品名称">
//             {dataSchema.dataSchemaName}
//           </DescriptionsItem>

//           <DescriptionsItem label="版本">{dataSchema.version}</DescriptionsItem>

//           <DescriptionsItem label="公开可见">
//             {dataSchema.visible > 0 ? "是" : "否"}
//           </DescriptionsItem>

//           <DescriptionsItem label="创建时间">
//             {moment(dataSchema.createTime).format("YYYY-MM-DD")}
//           </DescriptionsItem>

//           <DescriptionsItem label="定价">
//             {dataSchema.price?.toFixed(1)} 元/条
//           </DescriptionsItem>

//           <DescriptionsItem label="标签" span={2}>
//             {dataSchema.tagNameList?.map((tag) => (
//               <Tag key={tag} color="blue">
//                 {tag}
//               </Tag>
//             ))}
//           </DescriptionsItem>

//           <DescriptionsItem label="建议使用范围" span={3}>
//             {dataSchema.dataSchemaUsage}
//           </DescriptionsItem>

//           <DescriptionsItem label="详情描述" span={3}>
//             {dataSchema.dataSchemaDesc}
//           </DescriptionsItem>
//         </Descriptions>
//       </Card>

//       <Divider></Divider>

//       {dataSchemaAccessInfo && (
//         <Card title="访问信息">
//           <Descriptions bordered>
//             <DescriptionsItem label="数据格式" span={1}>
//               {dataFormatNames[dataSchemaAccessInfo.dataFormat]}
//             </DescriptionsItem>
//             <DescriptionsItem label="数据传输协议" span={2}>
//               {dataProtocolNames[dataSchemaAccessInfo.dataProtocol]}
//             </DescriptionsItem>
//             <DescriptionsItem label="数据访问链接" span={3}>
//               {dataSchemaAccessInfo.uri}
//             </DescriptionsItem>
//             <DescriptionsItem label="生效时间" span={2}>
//               {moment(dataSchemaAccessInfo.effectTime).format("YYYY-MM-DD")}
//             </DescriptionsItem>
//             <DescriptionsItem label="失效时间" span={1}>
//               {moment(dataSchemaAccessInfo.expireTime).format("YYYY-MM-DD")}
//             </DescriptionsItem>
//             <DescriptionsItem label="返回数据格式" span={3}>
//               {dataSchemaAccessInfo.contentSchema ? (
//                 <ReactJson
//                   style={{
//                   textAlign:'left'
//                   }}
//                   displayDataTypes={false}
//                   src={JSON.parse(dataSchemaAccessInfo.contentSchema)}
//                 />
//               ) : (
//                 "-"
//               )}
//             </DescriptionsItem>
//             <DescriptionsItem label="查询条件" span={3}>
//               {dataSchemaAccessInfo.accessCondition ? (
//                 <ReactJson
//                   displayDataTypes={false}
//                   style={{
//                     textAlign:'left'
//                   }}
//                   src={JSON.parse(dataSchemaAccessInfo.accessCondition)}
//                 />
//               ) : (
//                 "-"
//               )}
//             </DescriptionsItem>
//           </Descriptions>
//         </Card>
//       )}
//     </Layout>
//   );
// }

// function loadSchemaIdFromLocation(location) {
//   const schemaId = location.state?.schemaId;
//   return {
//     schemaId: schemaId,
//   };
// }


function BasicInfo({data, style}) {
  return (
    <Card
    headStyle={headerStyle}
    style={style}
    title="基本信息">
      <LabelValuePair label='产品名称' value='TBD'/>
      <LabelValuePair label='产品类型' value='数据API'/>
      <LabelValuePair label='产品标签' value='TBD'/>
      <LabelValuePair label='归属业务' value='TBD'/>
      <LabelValuePair label='提供机构' value='TBD'/>
      <LabelValuePair label='创建日期' value='TBD'/>
      <LabelValuePair label='详细介绍' value='TBD'/>
  </Card>
  )
}

function PriceInfo({data, style}) {
  return (
    <Card
    headStyle={headerStyle}
    style={style}
    title="价格信息">
      <LabelValuePair label='计费模式' value='TBD'/>
      <LabelValuePair label='详细价格' value='数据API'/>
      <LabelValuePair label='计费说明' value='TBD'/>
  </Card>
  )
}

function DetailInfo({data, style}) {
  return (
    <Card
    headStyle={headerStyle}
    style={style}
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

function BusinessInfo({data, style}) {
  return (
    <Card
    headStyle={headerStyle}
    style={style}
    title="归属业务">
      <LabelValuePair label='业务名称' value='TBD'/>
      <LabelValuePair label='业务说明' value='TBD'/>
  </Card>
  )
}

function CompanyInfo({data, style}) {
  return (
    <Card headStyle={headerStyle}
    style={style}
    title="机构信息">
      <LabelValuePair label='机构名称' value='TBD'/>
      <LabelValuePair label='联系方式' value='TBD'/>
  </Card>
  )
}


function LabelValuePair({label, value}){
  const style={
    fontSize:'18px',
    fontWeight: '400',
    lineHeight: '2'
  };

  return (
    <Row >
      <Col style={style} span={2}>{label}:</Col>
      <Col style={style}>{value}</Col>
    </Row>
  )
}