import App from '../App';
import AppSchemaList from '../pages/AppSchemaList';
import Error from '../pages/Error';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserInfo from '../pages/admin/UserInfo';
import Test from '../pages/Test';
import Admin from '../pages/Admin';
import ProductList from '../pages/ProductList';
import SchemaDetail from '../pages/SchemaDetail';
import AdminAllDataSchema from '../pages/AdminAllDataSchema';

import AdminAllProductList from '../pages/AdminAllProductList';
import AdminMyDataSchema from '../pages/AdminMyDataSchema';

import AccountList from '../pages/admin/AccountList';
import NewDataSchema from '../pages/NewDataSchema';
import ModifyDataSchema from '../pages/ModifyDataSchema';
import AdminMyFavorateDataSchema from '../pages/AdminMyFavorateDataSchema';
import AdminMyProductList from '../pages/AdminMyProductList';
import NewProduct from '../pages/NewProduct';

export const routeMap = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <AppSchemaList />
			},
			{
				path: 'home',
				element: <AppSchemaList />
			},
			{
				path: 'schema/detail',
				element: <SchemaDetail />,
			},
			{
				path: 'product',
				element: <ProductList />,
			},
		]
	},
	{
		path: 'admin',
		element: <Admin/>,
		children: [
			{
				path: 'schema/all',
				element: <AdminAllDataSchema />,
			},
			{
				path: 'schema/my',
				element: <AdminMyDataSchema />,
			},
			{
				path: 'schema/detail',
				element: <SchemaDetail />,
			},
			{

				path: 'schema/create',
				element: <NewDataSchema />,
			},
			{
				path: 'schema/modify',
				element: <ModifyDataSchema />,
			},
			{
				path: 'schema/fav',
				element: <AdminMyFavorateDataSchema/>
			},
			{
				path: 'product/all',
				element: <AdminAllProductList />,
			},
			{
				path: 'product/my',
				element: <AdminMyProductList />,
			},
			{
				path: 'product/create',
				element: <NewProduct />,
			},
			{
				indexed: true,
				element: <Error />,
			},

			{
				path: 'account/list',
				element: <AccountList />,
			},
			{
				path: 'user/info',
				element: <UserInfo />,
			},
		]
	},
	{
		path: 'schema/detail',
		element: <SchemaDetail />
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
		path: 'test',
		element: <Test />
	},
	{
		path: '*',
		element: <Error message='非法URL'/>
	}
];
