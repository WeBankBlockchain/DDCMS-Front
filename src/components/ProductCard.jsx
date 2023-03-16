import React from 'react'
import './ProductCard.css'
import { Space, Button} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  HeartOutlined,
} from '@ant-design/icons';

import moment from 'moment'
import { useNavigate } from 'react-router-dom';

export default function ProductCard(props) {

    const navigate = useNavigate()

    const productOnClick = (productId) => {
        navigate('/product/detail', {
          state: {productId: productId}
        })
      }

    return (
    <div className='product-card'>
      <div className='product-header'>
        <div className='product-title'>
        <Button 
            type="link" 
            style={{fontSize: 18, fontWeight: 500, color: '#000'}}
            onClick={()=>{productOnClick(props.item.productGid)}}
          >
            {props.item.productName}
          </Button>
        </div>
        <div className='product-star'>
          <Space>
            <HeartOutlined style={{fontSize: '20px'}}/>
          </Space>
        </div>
      </div>
      <div className='product-body'>
        <div className='product-desc'>
          {props.item.productDesc}
        </div>
      </div>
      <div className='product-footer'>
        <div className='owner-info'>
          <div className='company-info'>
            企业名称：{props.item.companyName}
          </div>
          <div className='product-info'>产品名称：{props.item.productName}</div>
        </div>
        <div className='publish-time'>
          发布时间: {moment(props.item.createTime).format('YYYY-MM-DD')}
        </div>
      </div>
    </div>
  )
}
