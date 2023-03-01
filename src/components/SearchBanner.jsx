import React from 'react'
import { Radio, Input } from 'antd';
import './SearchBanner.css'

const { Search } = Input;

export default function SearchBanner() {

  const onSearch = (value) => console.log(value);

  return (
    <div className='search-banner'>
      <div className='sort-tab'>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">最新发布</Radio.Button>
        <Radio.Button value="b" disabled>综合排序</Radio.Button>
        <Radio.Button value="c" disabled>收藏数</Radio.Button>
      </Radio.Group>
      </div>
      <div className='search-area'>
        <Search 
          placeholder="请输入公司/产品/数据目录名称" 
          style={{width: 350}}
          onSearch={onSearch}
          // size="large" 
          enterButton 
        />
      </div>
    </div>
  )
}
