import './App.css';
import HomeHeader from './components/HomeHeader';
import { Breadcrumb, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Footer } = Layout;

function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <HomeHeader />
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className='content'
          style={{
            padding: 24,
            minHeight: 680,
            background: colorBgContainer,
          }}
        >
          <div className='main'>
            <Outlet />
          </div>
          <div className='slide'>

          </div>
        </div>
        {/* <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          Content
        </div> */}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
