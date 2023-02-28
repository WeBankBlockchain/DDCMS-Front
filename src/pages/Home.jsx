import { List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
import SchemaCard from '../components/SchemaCard';
import { PageQuerySchemaApi } from '../request/api';
import './Home.css';

const ContainerHeight = 400

export default function Home() {

  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  
  const loadMoreData = () => {
    const req = {
      pageNo: pageNo,
      pageSize: 10
    }

    PageQuerySchemaApi(req).then((res) => {
      if(res.code === '0'){
        setData(data.concat(res.data.data));
        message.success(`${res.data.data.length} more items loaded!`);
        if(res.totalPages > pageNo){
          setPageNo(pageNo => pageNo + 1)
        }else{
          message.error(res.msg)
        }
      }
    })
  }

  useEffect(() => {
    loadMoreData();
  }, []);

  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      loadMoreData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        itemHeight={10}
        itemKey="schemaId"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.schemaId}>
            <SchemaCard key={item.schemaId} item={item}/>
          </List.Item>
        )}
      </VirtualList>
    </List>
  )
}
