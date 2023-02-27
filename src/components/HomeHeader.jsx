import React from 'react'
import {Space, Divider, Button } from 'antd';
import './HomeHeader.css';

export default function HomeHeader() {
  return (
    <header>
				<div className='header-content'>
          <div className='logo'
            style={{
              float: 'left',
              color: '#FFF',
              fontSize: '35px',
              fontWeight: 800
            }}
          >
            Data Brain
          </div>
          <Space wrap
            style={{
              float: 'right'
            }}
          >
            <Button type="primary">登录</Button>
            <Button>注册</Button>
          </Space>
        </div>	
			</header>
  )
}
