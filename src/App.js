import './App.css';
import { Breadcrumb, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HomeHeader from './components/HomeHeader';
import CommonFooter from './components/CommonFooter';
import TopCompany from './components/slide/TopCompany';
import TopProduct from './components/slide/TopProduct';
import TopTags from './components/slide/TopTags';

const { Content } = Layout;

function App() {
	return (
		<Layout>
			<HomeHeader />
			<Content className="site-layout">
				<Breadcrumb
					style={{
						margin: '16px 0'
					}}
				>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className="content">
					<div className="main-content">
						<Outlet />
					</div>
					<div className="slide-content">
						<TopCompany />
						<TopProduct />
						<TopTags />
					</div>
				</div>
			</Content>
			<CommonFooter />
		</Layout>
	);
}

export default App;
