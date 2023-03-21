import React from 'react'
import './SchemaCard.css'
import { Space, Button, message} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import moment from 'moment'
import PubSub from 'pubsub-js'
import { AddSchemaFavoriteApi } from '../request/api';
export default function SchemaCard(props) {

  const navigate = useNavigate()

  const breadcrumbArr = []

  const schemaOnClick = (schemaId) => {
    navigate('/schema/detail', {
      state: {schemaId: schemaId}
    })
  }

  const providerOnClick = (providerId) => {
    navigate('/productlist', {
      state: {providerId: providerId}
    })
  }

  const productOnClick = (productId) => {
    breadcrumbArr.push()
    PubSub.publish('breadcrumb', breadcrumbArr);
    navigate('/home', {
      state: {productId: productId}
    })
  }

  const onFavorate = (schemaId)=>{
    AddSchemaFavoriteApi({
      schemaId: schemaId
    }).then(res=>{
      if (res.code !== 0){
        message.error(res.msg);
      }
    });
  }

  return (
    <div className='schema-card'>
      <div className='schema-header'>
        <div className='schema-title'>
          <EyeOutlined className = {props.item.visible ? 'visible-icon': 'unvisible-icon'}/>
          <EyeInvisibleOutlined className = {props.item.visible ? 'unvisible-icon': 'visible-icon'}/>
          <Button 
            type="link" 
            style={{fontSize: 18, fontWeight: 500, color: '#000'}}
            onClick={()=>{schemaOnClick(props.item.schemaId)}}
          >
            {props.item.dataSchemaName}
          </Button>
        </div>
        <div className='schema-star'>
          <Space>
            <HeartOutlined  onClick={onFavorate(props.item.schemaId)} style={{fontSize: '20px'}}/>
          </Space>
        </div>
      </div>
      <div className='schema-body'>
        <div className='schema-desc'>
          {props.item.dataSchemaDesc}
        </div>
      </div>
      <div className='schema-footer'>
        <div className='owner-info'>
          <div className='company-info'>
            企业名称：
            <Button 
              type='link'
              style={{fontSize: 14, padding: '0 0', color: 'rgb(134, 132, 132)'}}
              onClick={() => providerOnClick(props.item.providerId)}
            >
              {props.item.providerName}
            </Button>
          </div>
          <div className='product-info'>
            产品名称：
            <Button 
              type='link' 
              style={{fontSize: 14, padding: '0 0', color: 'rgb(134, 132, 132)'}}
              onClick={() => productOnClick(props.item.productId)}
            >
              {props.item.productName}
            </Button>
          </div>
        </div>
        <div className='publish-time'>
          发布时间: {moment(props.item.createTime).format('YYYY-MM-DD')}
        </div>
      </div>
    </div>
  )
}
