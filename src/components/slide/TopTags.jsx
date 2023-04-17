import { useEffect, useState, message } from 'react';
import './SlideCard.css'
import { Divider, Space, Button} from 'antd';
import { GetHotTagsApi } from '../../request/api';
import { useNavigate } from 'react-router-dom';

const topCount = 20

export default function TopTags() {

  const [data, setData] = useState([])

  const navigate = useNavigate()
  const onClick = (tagId, tagName) => {
    navigate('/home', {
      state: {
        tagId: tagId,
        breadcrumb: ['标签 : ' + tagName, '数据目录']
      }
    })
  }

  useEffect(() => {
    const req = {
      topCount: topCount
    }
    GetHotTagsApi(req).then((res) => {
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
        热门数据分类
      </div>
      <Divider style={{margin: '12px 0 0 0'}}/>
      <Space style={{padding: '12px 0'}} size={[0, 8]} wrap>
        {data.map((item) => (
          <Button key={item.pkId}
            style={{color: '#000000', fontSize: '14px'}}
            onClick={() => {onClick(item.pkId, item.tagName)}}
          >
            {item.tagName}
          </Button>
        ))}
      </Space>
      {/* <Divider style={{margin: '0 0 12px 0'}}/>
      <div className='slide-card-footer'>
        查看更多 >>
      </div> */}
    </div>
  )
}
