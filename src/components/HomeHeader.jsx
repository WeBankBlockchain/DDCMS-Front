import React from 'react'
import { Menu, Divider, Dropdown, Space, message} from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function HomeHeader() {
  return (
    <header>
				<div className="logo">
					{/* <img src={logoImg} alt="" /> */}
          LOGO
				</div>

				{/* <div>
					<Link style={{color: '#C0C0C0'}} to="/login">登录</Link>
					<Divider type="vertical" />
					<Link style={{color: '#C0C0C0'}} to="/register">注册</Link>
				</div> */}
			</header>
  )
}
