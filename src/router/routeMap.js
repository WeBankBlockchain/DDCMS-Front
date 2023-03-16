import App from '../App';
import Home from '../pages/Home';
import Error from '../pages/Error';
import OrgInfo from '../pages/OrgInfo';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserInfo from '../pages/UserInfo';
import Test from '../pages/Test';
import Admin from '../pages/Admin';
import ProductList from '../pages/ProductList';
import SchemaDetail from '../pages/SchemaDetail';
import ProductDetail from '../pages/ProductDetail';
import NewDataSchema from '../pages/NewDataSchema';
import OrgList from '../pages/OrgList';
import NewProduct from '../pages/NewProduct';
import AdminProduct from '../pages/AdminProduct';


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
				path: 'schema/create',
				element: <NewDataSchema />
			},
			{
				path: 'schema/detail',
				element: <SchemaDetail />
			},
			{
				path: 'product/detail',
				element: <ProductDetail />
			},
			{
				path: 'product/create',
				element: <NewProduct />
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
		path: 'adminProduct',
		element: <AdminProduct />
	},
	{
		path: 'userInfo',
		element: <UserInfo />
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
