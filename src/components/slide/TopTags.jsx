import React from 'react'
import './SlideCard.css'
import { Divider, Space, Tag} from 'antd';
import { Link } from 'react-router-dom';

const data = [
  '金融服务',
  '个人消费',
  '征信',
  '企业经营情况',
  '个人运动',
  '交通',
  '高速',
  '税务',
  '黑名单',
  '教育',
  '房产交易',
  '民政数据',
  '理财',
  '消费贷款',
  '汽车消费',
  '企业贷款',
  '同业拆借',
  '个人所得税',
  '社保',
  '公积金',
];

export default function TopTags() {
  return (
    <div className='slide-card'>
      <div className='slide-card-header'>
        目录分类
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
