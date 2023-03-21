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
import AccountList from '../pages/admin/AccountList';

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
			// {
			{
				indexed: true,
				element: <Error />,
			},
			{
				path: 'schema/detail',
				element: <SchemaDetail />,
			},
			{
				path: 'user/info',
				element: <UserInfo />,
			},
			// {
			// 	indexed: true,
			// 	element: <AdminAllProductList/>
			// },
			// {
			// 	path: 'company',
			// 	element: <AdminAccountList/>
			// },
			// {
			// 	path: 'allproduct',
			// 	element: <AdminAllProductList />,
			// },


			// {
			// 	path: 'allproduct',
			// 	element: <AdminMyProductList />,
			// }
				// children: [
				// 	{
				// 		path: 'detail',
				// 		element: <AdminProductDetail/>
				// 	},
				// 	{
				// 		path: 'kyc',
				// 		element: <AdminProductKyc/>
				// 	},
				// 	{
				// 		path: 'create',
				// 		element: <AdminProductCreate/>
				// 	},
				// 	{
				// 		path: 'modify',
				// 		element: <AdminProductModify/>
				// 	},
				// ]
			

		]
		// children: [
		// 	{
		// 		path:'user',
		// 		element: <AdminUserList/>,
		// 		children: [
		// 			{
		// 				path: 'detail',
		// 				element: <AdminUserDetail/>
		// 			},
		// 			{
		// 				path: 'kyc',
		// 				element: <AdminUserKyc/>
		// 			},
		// 		]
		// 	},
		// 	{
		// 		path:'product',
		// 		element: <AdminProductList/>,
		// 		children: [
		// 			{
		// 				path: 'detail',
		// 				element: <AdminProductDetail/>
		// 			},
		// 			{
		// 				path: 'kyc',
		// 				element: <AdminProductKyc/>
		// 			},
		// 			{
		// 				path: 'create',
		// 				element: <AdminProductCreate/>
		// 			},
		// 			{
		// 				path: 'modify',
		// 				element: <AdminProductModify/>
		// 			},
		// 		]
		// 	},
		// 	{
		// 		path:'schema',
		// 		element: <AdminSchemaList/>,
		// 		children: [
		// 			{
		// 				path: 'detail',
		// 				element: <AdminSchemaDetail/>
		// 			},					
		// 			{
		// 				path: 'create',
		// 				element: <AdminSchemaCreate/>
		// 			},
		// 			{
		// 				path: 'modify',
		// 				element: <AdminSchemaModify/>
		// 			},
		// 		]
		// 	}
		// ]
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
		path: 'userInfo',
		element: <AccountList />
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
