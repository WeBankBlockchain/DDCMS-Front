import React from "react";
import AdminTemplate from "../components/AdminTemplate";

export default function Admin() {
  const AdminPage = AdminTemplate("admin");
  const breadcrumb = {
    home: "Home",
    list: "List",
    app: "App",
  };

  return (
    <AdminPage
      breadcrumb={breadcrumb}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
    >
      {" "}
      admin{" "}
    </AdminPage>
  );
}
