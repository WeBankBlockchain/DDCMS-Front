import React, { useEffect, useState } from "react";
import { QueryProductByIdApi } from "../../request/api";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { message, Layout, Card, Descriptions, Divider, Badge } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";

export default function AdminProductDetail() {
  const location = useLocation();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const request = {
      productId: location.state?.productId,
    };
    QueryProductByIdApi(request).then((res) => {
      if (res.code === 0) {
        setProduct(res.data);
      } else {
        message.error(res.msg);
      }
    });
  }, [location.state?.productId]);

  return (
    <Layout style={{ textAlign: "center" }}>
      <Card title="基本信息">
        <Descriptions bordered>
          <DescriptionsItem label="业务名称" span={4}>
            {product.productName}
          </DescriptionsItem>
          <DescriptionsItem label="业务详情" span={4}>
            {product.productDesc}
          </DescriptionsItem>
          <DescriptionsItem label="所属机构" span={4}>
            {product.companyName}
          </DescriptionsItem>
          <Descriptions.Item label="状态" span={4}>
            {product.status === 0 && (
              <Badge status="processing" text="审核中" />
            )}
            {product.status === 1 && <Badge status="success" text="审核通过" />}
            {product.status === 2 && <Badge status="failed" text="拒绝" />}
          </Descriptions.Item>
          <DescriptionsItem label="创建日期" span={4}>
            {moment(product.createTime).format("YYYY-MM-DD HH:mm:ss")}
          </DescriptionsItem>
          <DescriptionsItem label="审核日期" span={4}>
            {moment(product.reviewTime).format("YYYY-MM-DD HH:mm:ss")}
          </DescriptionsItem>
        </Descriptions>
      </Card>

      <Divider></Divider>
    </Layout>
  );
}
