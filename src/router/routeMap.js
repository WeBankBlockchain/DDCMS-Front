import App from '../App';
import Home from '../pages/Home';
import Error from '../pages/Error';
import OrgInfo from '../pages/OrgInfo';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Test from '../pages/Test';
import Admin from '../pages/Admin';
import ProductList from '../pages/ProductList';
import SchemaDetail from '../pages/SchemaDetail';
import ProductDetail from '../pages/ProductDetail';
import OrgList from '../pages/OrgList';

export const routeMap = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />
			},
			{
				path: 'home',
				element: <Home />
			},
			{
				path: 'productlist',
				element: <ProductList />
			},
			{
				path: 'schema/detail',
				element: <SchemaDetail />
			},
			{
				path: 'product/detail',
				element: <ProductDetail />
			}
		]
	},
	{
		path: 'admin',
		element: <Admin />
	},
	{
		path: 'orgInfo',
		element: <OrgInfo />
	},
	{
		path: 'login',
		element: <Login />
	},
	{
		path: 'register',
		element: <Register />
	},
	{
		path: 'orgList',
		element: <OrgList />
	},
	{
		path: 'test',
		element: <Test />
	},
	{
		path: '*',
		element: <Error />
	}
];
