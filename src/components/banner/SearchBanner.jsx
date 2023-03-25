import React, { useState } from 'react'
import { Input, Breadcrumb } from 'antd';
import PubSub from 'pubsub-js'
import '../../assets/SearchBanner.css'
import { APP_BREAD_CRUMB } from '../../constants/KeyConstants';

const { Search } = Input;

export default function SearchBanner() {

  const [data, setData] = useState(['最新', '数据目录'])

  PubSub.subscribe(APP_BREAD_CRUMB, (_, data) => {
    setData(data) 
  });

  const onSearch = (value) => {
    PubSub.publish(APP_BREAD_CRUMB, ['搜索 : ' + value, '数据目录']);
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
