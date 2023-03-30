import React, { useState, useEffect } from "react";
import "../../assets/SchemaCard.css";
import { Space, Button, message } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AddSchemaFavoriteApi, DelSchemaFavoriteApi } from "../../request/api";
import util from "../../utils/util";

export default function SchemaCard(props) {
  const navigate = useNavigate();
  const [starInfo, setStarInfo] = useState(props.item.favTag);

  let breadcrumb = [];

  useEffect(() => {}, [starInfo]);

  const schemaOnClick = (schemaId, schemaName) => {
    breadcrumb = ["数据目录", schemaName];
    navigate("/schema/detail", {
      state: {
        schemaId: schemaId,
        breadcrumb: breadcrumb,
      },
    });
  };

  const providerOnClick = (providerId, providerName) => {
    breadcrumb = ["公司 : " + providerName, "数据目录"];
    navigate("/home", {
      state: {
        providerId: providerId,
        breadcrumb: breadcrumb,
      },
    });
  };

  const productOnClick = (productId, productName) => {
    breadcrumb = ["产品 : " + productName, "数据目录"];
    window.history.pushState({ breadcrumb }, null, null);
    navigate("/home", {
      state: {
        productId: productId,
        breadcrumb: breadcrumb,
      },
    });
  };

  const schemaStarComponent = (props) => {
    const { exist } = util.currentAccount();

    const onFavorate = (schemaId) => {
      console.log(starInfo);
      AddSchemaFavoriteApi({
        schemaId: schemaId,
      }).then((res) => {
        if (res.code !== 0) {
          message.error(res.msg);
        } else {
          message.success("收藏成功");
          setStarInfo(1);
        }
      });
    };

    const delFavorate = (schemaId) => {
      console.log(starInfo);
      DelSchemaFavoriteApi({
        schemaId: schemaId,
      }).then((res) => {
        if (res.code !== 0) {
          message.error(res.msg);
        } else {
          message.success("取消收藏成功");
          setStarInfo(0);
        }
      });
    };

    if (exist) {
      return (
        <div className="schema-star">
          {starInfo === 0 ? (
            <Space>
              <HeartOutlined
                onClick={() => {
                  onFavorate(props.item.schemaId);
                }}
                style={{ fontSize: "20px", color: "#08c" }}
              />
            </Space>
          ) : (
            <Space>
              <HeartFilled
                onClick={() => {
                  delFavorate(props.item.schemaId);
                }}
                style={{ fontSize: "20px", color: "#08c" }}
              />
            </Space>
          )}
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="schema-card">
      <div className="schema-header">
        <div className="schema-title">
          <EyeOutlined
            className={props.item.visible ? "visible-icon" : "unvisible-icon"}
          />
          <EyeInvisibleOutlined
            className={props.item.visible ? "unvisible-icon" : "visible-icon"}
          />
          <Button
            type="link"
            style={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            onClick={() => {
              schemaOnClick(props.item.schemaId, props.item.dataSchemaName);
            }}
          >
            {props.item.dataSchemaName}
          </Button>
        </div>
        {schemaStarComponent(props)}
      </div>
      <div className="schema-body">
        <div className="schema-desc">{props.item.dataSchemaDesc}</div>
      </div>
      <div className="schema-footer">
        <div className="owner-info">
          <div className="company-info">
            企业名称：
            <Button
              type="link"
              style={{
                fontSize: 14,
                padding: "0 0",
                color: "rgb(134, 132, 132)",
              }}
              onClick={() =>
                providerOnClick(props.item.providerId, props.item.providerName)
              }
            >
              {props.item.providerName}
            </Button>
          </div>
          <div className="product-info">
            产品名称：
            <Button
              type="link"
              style={{
                fontSize: 14,
                padding: "0 0",
                color: "rgb(134, 132, 132)",
              }}
              onClick={() =>
                productOnClick(props.item.productId, props.item.productName)
              }
            >
              {props.item.productName}
            </Button>
          </div>
        </div>
        <div className="publish-time">
          发布时间: {moment(props.item.createTime).format("YYYY-MM-DD")}
        </div>
      </div>
    </div>
  );
}
