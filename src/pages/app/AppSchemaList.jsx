import { List, Button, message } from "antd";
import { useEffect, useState } from "react";
import SchemaCard from "../../components/card/SchemaCard";
import { PageQuerySchemaApi } from "../../request/api";
import { useLocation } from "react-router-dom";
import PubSub from "pubsub-js";
import "../../assets/CommonStyle.css";

const pageSize = 10;

export default function Home() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [keyWord, setKeyWord] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [initRefresh, setInitRefresh] = useState(false);

  //保存页面跳转获得的providerId
  const [providerId, setProviderId] = useState(0)
  //保存页面跳转获得的productId
  const [productId, setProductId] = useState(0);
  //保存页面跳转获得的tagId
  const [tagId, setTagId] = useState(0);


  const location = useLocation();

  if(location.state && location.state.providerId && location.state.providerId !== providerId) {
    console.log("providerId:" + location.state.providerId)
    setProviderId(location.state.providerId);
    setProductId(0);
    setTagId(0);
    setKeyWord("");
    setInitRefresh(!initRefresh);
    setPageNo(1);
  }else if(location.state && location.state.productId && location.state.productId !== productId){
    console.log("productId:" + location.state.productId)
    setProviderId(0);
    setProductId(location.state.productId);
    setTagId(0);
    setKeyWord("");
    setInitRefresh(!initRefresh);
    setPageNo(1);
  }else if(location.state && location.state.tagId && location.state.tagId !== productId){
    console.log("productId:" + location.state.tagId)
    setProviderId(0);
    setProductId(0);
    setTagId(location.state.tagId);
    setKeyWord("");
    setInitRefresh(!initRefresh);
    setPageNo(1);
  }else {
    PubSub.subscribe("keyWord", (_, data) => {
      if(keyWord !== data){
        setProviderId(0);
        setProductId(0);
        setTagId(0);
        setKeyWord(data);
        setInitRefresh(!initRefresh);
        setPageNo(1);
      } 
    });
  }

  useEffect(() => {
    const req = {
      keyWord: keyWord,
      providerId: providerId,
      productId: productId,
      tagId: tagId,
      pageNo: pageNo,
      pageSize: pageSize, 
    };

    console.log("req:" + JSON.stringify(req))
    PageQuerySchemaApi(req).then((res) => {
      if (res.code === 0) {
        setInitLoading(false);
        setData(res.data.itemList);
        setList(res.data.itemList);
        setPageNo((pageNo) => pageNo + 1);
        setTotalPage(res.data.pageCount);
      } else {
        message.error(res.msg);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initRefresh]);

  const onLoadMore = () => {
    setLoading(true);
    const req = {
      keyWord: keyWord,
      providerId: providerId,
      productId: productId,
      tagId: tagId,
      pageNo: pageNo,
      pageSize: pageSize,
    };
    PageQuerySchemaApi(req).then((res) => {
      if (res.code === 0) {
        const newData = data.concat(res.data.itemList);
        setData(newData);
        setList(newData);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
        setPageNo((pageNo) => pageNo + 1);
        setTotalPage(res.data.pageCount);
      } else {
        message.error(res.msg);
      }
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          margin: "12px 12px",
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button
          className={pageNo <= totalPage ? "visible-more" : "unvisible-more"}
          onClick={onLoadMore}
        >
          加载更多
        </Button>
        <div className={pageNo > totalPage ? "visible-more" : "unvisible-more"}>
          ————您已经触碰我的底线了————
        </div>
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
          <SchemaCard key={item.schemaId} item={item} />
        </List.Item>
      )}
    />
  );
}
