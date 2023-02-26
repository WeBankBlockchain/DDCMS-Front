import React from 'react'
import { List, Avatar, Divider, Space} from 'antd';
import './SlideCard.css'

const data = [
  '深圳腾讯科技股份有限公司',
  '深圳前海微众银行股份有限公司',
  '平安科技股份有限公司',
  '杭州蚂蚁金融科技股份有限公司',
  '我的家在东北股份有限公司',
  '深圳腾讯科技股份有限公司',
  '深圳前海微众银行股份有限公司',
  '平安科技股份有限公司',
  '杭州蚂蚁金融科技股份有限公司',
  '我的家在东北股份有限公司',
];

export default function TopCompany() {
  return (
    <div className='slide-card'>
      <div className='slide-card-header'>
        热门公司
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Space>
              <Avatar src="https://joesch.moe/api/v1/random" />{item}
            </Space>
          </List.Item>
        )}
      />
      <Divider style={{margin: '0 0 12px 0'}}/>
      <div className='slide-card-footer'>
        查看更多 >>
      </div>
    </div>
  )
}
