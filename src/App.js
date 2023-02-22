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
