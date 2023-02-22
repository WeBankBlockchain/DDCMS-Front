import React from 'react'
import {Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';

export default function HomeHeader() {
  return (
    <Header
				style={{
					position: 'sticky',
					top: 0,
					zIndex: 1,
					background: 'rgba(0, 0, 0)',
					height: 80,
					width: '100%'
				}}
			>
				{/* <div
					style={{
						width: 1000
					}}
				></div> */}
				<div
					style={{
						float: 'left',
						width: 800,
						height: 31,
						margin: '16px 24px 16px 0',
						background: 'rgba(255, 255, 255, 0.2)'
					}}
				></div>

				<Space
					style={{
						float: 'right'
					}}
				>
					<Link style={{color: '#C0C0C0'}} to="/login">登录</Link>
					<Divider type="vertical" />
					<Link style={{color: '#C0C0C0'}} to="/register">注册</Link>
				</Space>
			</Header>
  )
}
