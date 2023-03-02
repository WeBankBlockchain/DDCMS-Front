import { useEffect, useState } from 'react';
import { List, Avatar, Divider, Space, message} from 'antd';
import './SlideCard.css'
import { GetHotCompaniesApi } from '../../request/api';


const topN = 8;

export default function TopCompany() {

  const [data, setData] = useState([])

  useEffect(() => {
    const req = {
      topN: topN
    }
    GetHotCompaniesApi(req).then((res) => {
      if(res.code === '0'){
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
          <List.Item>
            <Space style={{fontSize: '15px'}}>
              <Avatar src="https://joesch.moe/api/v1/random" />{item.name}
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
