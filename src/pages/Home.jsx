import { List, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import SchemaCard from '../components/SchemaCard';
import { PageQuerySchemaApi } from '../request/api';
import './Home.css';


export default function Home() {

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const req = {
      pageNo: pageNo,
      pageSize: 10
    }
    PageQuerySchemaApi(req).then((res) => {
      if(res.code === '0'){
        setInitLoading(false);
        setData(res.data.data);
        setList(res.data.data);
        setPageNo(pageNo => pageNo + 1);
        setTotalPage(res.data.totalPages);
      }else{
        message.error(res.msg);
      }
    })
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    const req = {
      pageNo: pageNo,
      pageSize: 10
    }
    PageQuerySchemaApi(req).then((res) => {
      if(res.code === '0'){
        const newData = data.concat(res.data.data);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
        setPageNo(pageNo => pageNo + 1);
        setTotalPage(res.data.totalPages);
      }
    })
  }

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          margin: '12px 12px',
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button className={pageNo <= totalPage ? 'visible-more' : 'unvisible-more'} onClick={onLoadMore}>加载更多</Button>
        <div className={pageNo > totalPage ? 'visible-more' : 'unvisible-more'}>————您已经触碰我的底线了————</div>
      </div>
    ) : null;

  return (
    <List
      className="schema-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item key={item.schemaId}>
          <SchemaCard key={item.schemaId} item={item}/>
        </List.Item>
      )}
    />
  )
}
