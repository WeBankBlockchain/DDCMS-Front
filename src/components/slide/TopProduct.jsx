import { useEffect, useState } from 'react';
import './SlideCard.css'
import { Divider, Space, message, Button} from 'antd';
import { GetHotProductsApi } from '../../request/api';
import { useNavigate } from 'react-router-dom';

const topCount = 20

export default function TopProduct() {

  const [data, setData] = useState([])

  const navigate = useNavigate()
  const onClick = (productId) => {
    navigate('/product/detail', {
      state: {productId: productId}
    })
  }

  useEffect(() => {
    const req = {
      topCount: topCount
    }
    GetHotProductsApi(req).then((res) => {
      if(res.code === 0){
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
          <Button key={item.productId}
            style={{color: '#000000', fontSize: '14px', margin: '0 4px'}}
            onClick={() => {onClick(item.productId)}}
          >
            {item.productName}
          </Button>
        ))}
      </Space>
      <Divider style={{margin: '0 0 12px 0'}}/>
      <div className='slide-card-footer'>
        查看更多 >>
      </div>
    </div>
  )
}
