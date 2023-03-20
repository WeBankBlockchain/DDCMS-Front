import App from '../App';
import AppSchemaList from '../pages/AppSchemaList';
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
import ModifyDataSchema from '../pages/ModifyDataSchema';
import OrgList from '../pages/AdminAccountList';
import NewProduct from '../pages/NewProduct';
import AdminProduct from '../pages/AdminAllProductList';
import AdminAllDataSchema from '../pages/AdminAllDataSchema';
import AdminAccountList from '../pages/AdminAccountList';
import AdminAllProductList from '../pages/AdminAllProductList';

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
				path: 'product',
				element: <ProductList />,
			},
		]
	},
	{
		path: 'admin',
		element: <Admin/>,
		children: [
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
			// 	path: 'allschema',
			// 	element: <AdminAllDataSchema />,
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
