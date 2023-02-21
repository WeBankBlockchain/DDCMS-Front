import App from '../App';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Admin from '../pages/Admin';


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
			}
		]
	}, 
    {
		path: 'Admin',
		element: <Admin />
	},
	{
		path: '*',
		element: <Error />
	}
];
