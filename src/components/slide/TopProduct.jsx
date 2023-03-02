import { useEffect, useState } from 'react';
import './SlideCard.css'
import { Divider, Space, Tag, message} from 'antd';
import { Link } from 'react-router-dom';
import { GetHotProductsApi } from '../../request/api';

const topN = 20

export default function TopProduct() {

  const [data, setData] = useState([])

  useEffect(() => {
    const req = {
      topN: topN
    }
    GetHotProductsApi(req).then((res) => {
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
        热门数据产品
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <Space style={{padding: '12px 0'}} size={[0, 8]} wrap>
        {data.map((item) => (
          <Tag>
            <Link style={{color: '#000000', fontSize: '14px', padding: '10px 5px'}} to="#">{item.productName}</Link>
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
