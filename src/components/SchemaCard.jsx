import React from 'react'
import './SchemaCard.css'
import { Space, Button} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import moment from 'moment'

export default function SchemaCard(props) {
  return (
    <div className='schema-card'>
      <div className='schema-header'>
        <div className='schema-title'>
          <EyeOutlined style={{color: '#000'}}/>
          <Button type="link" style={{fontSize: 20, fontWeight: 700, color: '#000'}}>{props.item.schemaId}</Button>
        </div>
        <div className='schema-status'>
          <Space>
            <HeartOutlined style={{fontSize: '20px'}}/>
          </Space>
        </div>
      </div>
      <div className='schema-body'>
        <div className='schema-desc'>
          {props.item.description}
        </div>
      </div>
      <div className='schema-footer'>
        <div className='owner-info'>
          <div className='company-info'>
            企业名称：{props.item.providerName}
          </div>
          <div className='product-info'>产品名称：{props.item.productName}</div>
        </div>
        <div className='publish-time'>
          发布时间: {moment(props.item.updateTime).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>
    </div>
  )
}
