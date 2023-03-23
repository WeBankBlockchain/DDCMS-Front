import { List, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { PageQueryProductApi } from '../../request/api';
import { useLocation } from "react-router-dom";
import PubSub from 'pubsub-js';
import '../../components/Common.css';

const pageSize = 10;

export default function ProductList() {

  const [initLoading, setInitLoading] = useState(true);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [initRefresh, setInitRefresh] = useState(false);
  const location = useLocation();

  const providerId = location.state?.providerId;

  useEffect(() => {
    loadPageData({ providerId, pageNo });
  }, [initRefresh]);

  const loadPageData = ({ providerId, pageNo }) => {
    setInitLoading(true);
    PageQueryProductApi({ providerId, pageNo, pageSize }).then((res) => {
      if(res.code === 0){
        setData(data.concat(res.data.itemList));
        setList(data.concat(res.data.itemList));
        setPageNo(pageNo => pageNo + 1);
        setTotalPage(res.data.pageCount);
      }else{
        message.error(res.msg);
      }
      setInitLoading(false);
    })
  }

  const onLoadMore = () => {
    setInitLoading(true);
    loadPageData({ providerId, pageNo }).then(() => {
      setInitLoading(false);
      window.dispatchEvent(new Event('resize'));
    });
  }

  const isMoreVisible = pageNo <= totalPage;

  const renderLoadMore = () => {
    if(!isMoreVisible){
        return (
            <div style={{ textAlign: 'center', margin: '12px 12px', height: 32, lineHeight: '32px' }}>
              <div className="visible-more">————您已经触碰我的底线了————</div>
            </div>  
          );
    }
    return (
      <div style={{ textAlign: 'center', margin: '12px 12px', height: 32, lineHeight: '32px' }}>
        <Button className="visible-more" onClick={onLoadMore}>加载更多</Button>
      </div>
    );
  }

  const renderItem = (item) => (
    <List.Item key={item?.productId}>
      <ProductCard item={item}/>
    </List.Item>
  );

  return (
    <List
      className="schema-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={renderLoadMore()}
      dataSource={list}
      renderItem={renderItem}
    />
  )
}