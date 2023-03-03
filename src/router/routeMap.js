import App from "../App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Test from "../pages/Test";

export const routeMap = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "Admin",
    element: <Admin />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "*",
    element: <Error />,
  },
];
