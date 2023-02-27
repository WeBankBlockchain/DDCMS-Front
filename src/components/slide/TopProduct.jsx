import React from 'react'
import './SlideCard.css'
import { Divider, Space, Tag} from 'antd';
import { Link } from 'react-router-dom';

const data = [
  '微信',
  '支付宝',
  '人人网',
  '飞书',
  '王者荣耀',
  '脉脉',
  '陌陌',
  '美图秀秀',
  'Keep',
  '抖音',
  'QQ',
  '美团',
  '京东',
  '微信',
  '支付宝',
  '人人网',
  '飞书',
  '王者荣耀',
  '脉脉',
  '陌陌',
];

export default function TopProduct() {
  return (
    <div className='slide-card'>
      <div className='slide-card-header'>
        热门产品
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <Space style={{padding: '12px 0'}} size={[0, 8]} wrap>
        {data.map((item) => (
          <Tag>
            <Link style={{color: '#000000', fontSize: '14px', padding: '10px 5px'}} to="#">{item}</Link>
          </Tag>
        ))}
      </Space>
      <Divider style={{margin: '0 0 12px 0'}}/>
      <div className='slide-card-footer'>
        查看更多 >>
      </div>
    </div>
  )
}
