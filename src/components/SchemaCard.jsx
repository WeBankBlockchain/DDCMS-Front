import React from 'react'
import './SchemaCard.css'
import { Space} from 'antd';
import {
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

export default function SchemaCard() {
  return (
    <div className='schema-card'>
      <div className='schema-header'>
        <div className='schema-title'>
          腾讯微信支付个人消费明细
        </div>
        <div className='schema-status'>
          <Space>
            <CheckCircleOutlined style={{color: 'green'}}/> 开放
          </Space>
        </div>
      </div>
      <div className='schema-body'>
        <div className='schema-desc'>
          这个数据目录主要用于金融场景，主要是个人用户在微信钱包中的消费记录数据。
        </div>
      </div>
      <div className='schema-footer'>
        <div className='owner-info'>
          <div className='company-info'>企业名称：深圳腾讯科技信息股份有限公司</div>
          <div className='product-info'>产品名称：微信</div>
        </div>
        <div className='publish-time'>
          发布时间: 2023-02-23
        </div>
      </div>
    </div>
  )
}
