import './App.css';
import { Breadcrumb, Layout, theme, Button, Space, Input, Image } from 'antd';
import { Outlet } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function App() {
	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const onSearch = (value) => console.log(value);

	return (
		<Layout>
			<HomeHeader />
			<Content
				className="site-layout"
				style={{
					width: 1020,
					margin: '0 auto'
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
						minHeight: 1680
					}}
				>
					<div className="main"
						style={{
							width: 700,
							minHeight: 1680,
							margin: '0 20px 0 0',
							float: 'left',
							background: colorBgContainer
						}}
					>
						<Outlet />
					</div>
					<div className="slide"
						style={{
							width:300,
							minHeight: 1680,
							float: 'right',
							background: colorBgContainer
						}}
					>
						slide
					</div>
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
