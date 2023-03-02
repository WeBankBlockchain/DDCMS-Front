import { useEffect, useState, message } from 'react';
import './SlideCard.css'
import { Divider, Space, Tag} from 'antd';
import { Link } from 'react-router-dom';
import { GetHotTagsApi } from '../../request/api';

const topCount = 20

export default function TopTags() {

  const [data, setData] = useState([])

  useEffect(() => {
    const req = {
      topN: topCount
    }
    GetHotTagsApi(req).then((res) => {
      if(res.code === '0'){
        console.log(res.data)
        setData(res.data);
      }else{
        message.error(res.msg);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='slide-card'>
      <div className='slide-card-header'>
        热门数据分类
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <Space style={{padding: '12px 0'}} size={[0, 8]} wrap>
        {data.map((item) => (
          <Tag>
            <Link style={{color: '#000000', fontSize: '14px', padding: '10px 5px'}} to="#">{item.name}</Link>
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
