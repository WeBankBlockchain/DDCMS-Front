import React from 'react'
import {Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './HomeHeader.css';

export default function HomeHeader() {
  return (
    <header>
				<div className='header-content'>
          <div className='logo'
            style={{
              float: 'left',
              color: '#C0C0C0'
            }}
          >
            logo pic
          </div>
          <Space
            style={{
              float: 'right'
            }}
          >
            <Link style={{color: '#C0C0C0'}} to="/login">登录</Link>
            <Divider type="vertical" />
            <Link style={{color: '#C0C0C0'}} to="/register">注册</Link>
          </Space>
        </div>	
			</header>
  )
}
