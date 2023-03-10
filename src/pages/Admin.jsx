import React from "react";
import AdminTemplate from "../components/AdminTemplate";


export default function Admin() {
  const AdminPage = AdminTemplate("admin");

  return (
    <AdminPage
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
    > admin </AdminPage>
  );
}
