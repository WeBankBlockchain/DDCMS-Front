import App from "../App";
import AppSchemaList from "../pages/app/AppSchemaList";
import Error from "../pages/Error";
import Login from "../pages/app/Login";
import Register from "../pages/app/Register";
import AdminUserInfo from "../pages/admin/AdminUserInfo";
import Admin from "../pages/admin/Admin";
import SchemaDetail from "../pages/app/SchemaDetail";
import AdminAllDataSchema from "../pages/admin/AdminAllDataSchema";
import AdminAllProductList from "../pages/admin/AdminAllProductList";
import AdminMyDataSchema from "../pages/admin/AdminMyDataSchema";
import AdminAccountList from "../pages/admin/AdminAccountList";
import AdminMyFavorateDataSchema from "../pages/admin/AdminMyFavorateDataSchema";
import AdminMyProductList from "../pages/admin/AdminMyProductList";
import AdminProductDetail from "../pages/admin/AdminProductDetail";
import AdminNewDataSchema from "../pages/admin/AdminNewDataSchema";
import AdminNewProduct from "../pages/admin/AdminNewProduct";
import RegisterResult from "../pages/app/RegisterResult";
import AdminDefault from "../pages/admin/AdminDefault";

export const routeMap = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AppSchemaList />,
      },
      {
        path: "home",
        element: <AppSchemaList />,
      },
      {
        path: "schema/detail",
        element: <SchemaDetail />,
      },
    ],
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <AdminDefault/>,
      },
      {
        path: "schema/all",
        element: <AdminAllDataSchema />,
      },
      {
        path: "schema/my",
        element: <AdminMyDataSchema />,
      },
      {
        path: "schema/detail",
        element: <SchemaDetail />,
      },
      {
        path: "schema/create",
        element: <AdminNewDataSchema />,
      },
      {
        path: "schema/fav",
        element: <AdminMyFavorateDataSchema />,
      },
      {
        path: "product/all",
        element: <AdminAllProductList />,
      },
      {
        path: "product/my",
        element: <AdminMyProductList />,
      },
      {
        path: "product/create",
        element: <AdminNewProduct />,
      },
      {
        path: "product/detail",
        element: <AdminProductDetail />,
      },
      {
        element: <Error />,
      },

      {
        path: "account/list",
        element: <AdminAccountList />,
      },
      {
        path: "user/info",
        element: <AdminUserInfo />,
      },
    ],
  },
  {
    path: "schema/detail",
    element: <SchemaDetail />,
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
    path: "result",
    element: <RegisterResult />,
  },
  {
    path: "*",
    element: <Error message="非法URL" />,
  },
];
