import React, { useEffect, useState } from "react";
import { QueryProductByIdApi } from "../../request/api";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { message, Card, Row,Col, Badge, Tabs } from "antd";
import "../../assets/AdminProductDetail.css";

const fontStyle = {
  fontSize:'var(--product-detail-font-size)',
  fontWeight: 'var(--product-detail-font-weight)',
  lineHeight: 'var(--product-detail-line-height)'
}


export default function AdminProductDetail() {
  const location = useLocation();

  const [product, setProduct] = useState({});
  const [tabItems, setTabItems] = useState([

  ])

  useEffect(() => {
    const request = {
      productId: location.state?.productId,
    };
    QueryProductByIdApi(request).then((res) => {
      if (res.code === 0) {
        setProduct(res.data);
        setTabItems([
          {
            key: '1',
            label: `业务说明`,
            children: res.data.productDesc,
          },
        ]);
      } else {
        message.error(res.msg);
      }
    });
  }, [location.state?.productId]);

  const mock = [
    {
      key: '1',
      label: `业务说明`,
      children: 'aaa'
    },
  ]
  return (
    <div style={{ textAlign: "center" }} id="product-detail-content">
      <Card title="基本信息">
        <LabelValuePair label='业务名称' value={product.productName}/>

        <LabelValuePair label='所属机构' value={product.companyName}/>
        <LabelValuePair label='审核状态' value= {
          (<div>
              {product.status === 0 && (
              <Badge status="processing" text="审核中" />
              )}
              {product.status === 1 && <Badge status="success" text="审核通过" />}
              {product.status === 2 && <Badge status="failed" text="拒绝" />}
          </div>)
        }/>
        <LabelValuePair label='创建日期' value={moment(product.createTime).format("YYYY-MM-DD HH:mm:ss")}/>
        <LabelValuePair label='审核日期' value= {moment(product.reviewTime).format("YYYY-MM-DD HH:mm:ss")}/>
        <Tabs  defaultActiveKey="1" items={tabItems} />
      </Card>
    </div>
  );
}

function LabelValuePair({label, value}){

  return (
    <Row gutter={{  md: 40}}>
      <Col style={fontStyle}>{label}:</Col>
      <Col style={fontStyle}>{value}</Col>
    </Row>
  )
}