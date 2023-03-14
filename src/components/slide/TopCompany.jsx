import { useEffect, useState } from 'react';
import { List, Avatar, Divider, Space, message, Button} from 'antd';
import './SlideCard.css'
import { GetHotCompaniesApi } from '../../request/api';
import { useNavigate } from 'react-router-dom';


const topCount = 8;

export default function TopCompany() {

  const [data, setData] = useState([])

  const navigate = useNavigate()
  const onClick = (providerId) => {
    navigate('/productlist', {
      state: {providerId: providerId}
    })
  }

  useEffect(() => {
    const req = {
      topCount: topCount
    }
    GetHotCompaniesApi(req).then((res) => {
      if(res.code === 0){
        setData(res.data);
        console.log(res.data)
      }else{
        message.error(res.msg);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='slide-card'>
      <div className='slide-card-header'>
        热门数据公司
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.companyName}>
            <Space style={{fontSize: '15px'}}>
              <Avatar src="https://joesch.moe/api/v1/random" />
              <Button 
                type='link'
                style={{color: '#000000', fontSize: '14px', padding: '0 0'}}
                onClick={() => {onClick(item.accountId)}}
              >
                {item.companyName}
              </Button>
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
