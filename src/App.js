import './App.css';
import { Breadcrumb, Layout, theme, Button, Space, Input, Image } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function App() {
	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const onSearch = (value) => console.log(value);

	return (
		<Layout>
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
					<Button type="primary">登录</Button>
					<Button>注册</Button>
				</Space>
			</Header>
			<Content
				className="site-layout"
				style={{
					padding: '0 50px'
				}}
			>
				<Breadcrumb
					style={{
						margin: '16px 0'
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div
					className="content"
					style={{
						padding: 24,
						minHeight: 1680,
						background: colorBgContainer
					}}
				>
					<div className="main">
						<Outlet />
					</div>
					<div className="slide"></div>
				</div>
			</Content>
			<Footer
				style={{
					textAlign: 'center'
				}}
			>
				Ant Design ©2023 Created by Ant UED
			</Footer>
		</Layout>
	);
}

export default App;
