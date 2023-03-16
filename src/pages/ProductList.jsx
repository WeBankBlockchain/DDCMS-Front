import { List, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { pageQueryProductApi } from '../request/api';
import { useLocation } from 'react-router-dom'
import PubSub from 'pubsub-js';
import './Home.css';

const pageSize = 10;

export default function ProjectList() {

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [keyWord, setKeyWord] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [initRefresh, setInitRefresh] = useState(false);
  const [providerId, setProviderId] = useState("")

  //获取路由带过来的providerId
  const location = useLocation()
  if(location.state !== null && location.state.providerId !== providerId){
    setProviderId(location.state.providerId)
    setInitRefresh(!initRefresh)
   }


  PubSub.subscribe('keyWord', (_, data) => {
    setKeyWord(data)
    setInitRefresh(!initRefresh)
    setPageNo(1)
  })

  useEffect(() => {

    const req = {
      keyWord: keyWord,
      providerId: providerId,
      pageNo: pageNo,
      pageSize: pageSize
    }
    pageQueryProductApi(req).then((res) => {
      if(res.code === 0){
        setInitLoading(false);
        setData(res.data.itemList);
        setList(res.data.itemList);
        setPageNo(pageNo => pageNo + 1);
        setTotalPage(res.data.pageCount);
      }else{
        message.error(res.msg);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRefresh]);

  const onLoadMore = () => {
    setLoading(true);
    const req = {
      keyWord: keyWord,
      pageNo: pageNo,
      pageSize: pageSize
    }
    pageQueryProductApi(req).then((res) => {
      if(res.code === 0){
        const newData = data.concat(res.data.itemList);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event('resize'));
        setPageNo(pageNo => pageNo + 1);
        setTotalPage(res.data.pageCount);
      }else{
        message.error(res.msg);
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
        <List.Item key={item.productId}>
          <ProductCard key={item.productId} item={item}/>
        </List.Item>
      )}
    />
  )
}
