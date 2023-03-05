import React, { useState } from 'react'
import { Input, Breadcrumb } from 'antd';
import PubSub from 'pubsub-js'
import './SearchBanner.css'

const { Search } = Input;

export default function SearchBanner() {

  const [data, setData] = useState(['最新', '数据目录列表'])

  const onSearch = (value) => {
    PubSub.publish('keyWord', value);
  };
 
  return (
    <div className='search-banner'>
      <div className='sort-tab'>
        <Breadcrumb style={{fontSize: 20, fontWeight: 700}}>
          {data.map((item) => (
            <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className='search-area'>
        <Search 
          placeholder="请输入公司/产品/数据目录名称" 
          style={{width: 350}}
          onSearch={onSearch} 
          enterButton 
        />
      </div>
    </div>
  )
}
