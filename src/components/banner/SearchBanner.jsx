import React, { useState, useEffect } from 'react'
import { Input, Breadcrumb, message } from 'antd';
import '../../assets/SearchBanner.css'
import { useLocation, useNavigate } from 'react-router-dom';

const { Search } = Input;

const breadcrumb = ['最新', '数据目录']

export default function SearchBanner() {

  const location = useLocation()
  const navigate = useNavigate()

  const [data, setData] = useState([])

  useEffect(() => {
    if(location.state){
      setData(location.state.breadcrumb)
    }else{
      setData(breadcrumb)
    }
  }, [location]);

  const onSearch = (value) => {
    if(value.length === 0){
      message.error("搜索关键词不能为空")
    }else{
      navigate('/home', {
        state: {
          keyWord: value,
          breadcrumb: ['搜索 : ' + value, '数据目录']
        }
      })
    }
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
