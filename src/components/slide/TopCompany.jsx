import { useEffect, useState } from 'react';
import { List, Divider, Space, message, Button} from 'antd';
import './SlideCard.css'
import { GetHotCompaniesApi } from '../../request/api';
import { useNavigate } from 'react-router-dom';



const topCount = 10;

export default function TopCompany() {

  const [data, setData] = useState([])

  const navigate = useNavigate()
  const onClick = (providerId, companyName) => {
    navigate('/home', {
      state: {
        providerId: providerId,
        breadcrumb: ['公司 : ' + companyName, '数据目录']
      }
    })
  }

  useEffect(() => {
    const req = {
      topCount: topCount
    }
    GetHotCompaniesApi(req).then((res) => {
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
        热门数据公司
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.companyName}>
            <Space style={{fontSize: '15px'}}>
              {/* <Avatar src="https://joesch.moe/api/v1/random" /> */}
              <Button 
                type='link'
                style={{color: '#000000', fontSize: '14px', padding: '0 0'}}
                onClick={() => {onClick(item.accountId, item.companyName)}}
              >
                {item.companyName}
              </Button>
            </Space>
          </List.Item>
        )}
      />
      {/* <Divider style={{margin: '0 0 12px 0'}}/>
      <div className='slide-card-footer'>
        查看更多 >>
      </div> */}
    </div>
  )
}
