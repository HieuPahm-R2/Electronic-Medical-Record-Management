import { createBrowserRouter } from "react-router-dom";
import App from "../../App";

import SingInPage from "../../pages/auth/login.page";
import RegisterPage from "../../pages/auth/register.page";
import AdminHome from "../../pages/admin/admin.dashboard";
import UserManage from "../../pages/admin/user.table";
import ProductManage from "../../pages/admin/product.table";
import MadContent from "../layout/admin/layout.admin";
import "../../assets/styles/mainClient.scss"
import Error404 from "../errors/404-page";

import RolePage from "@/pages/admin/role.table";

import PermissionPage from "@/pages/admin/permission.table";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <MadContent />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element:
          <AdminHome />
      },
      {
        path: "table-users",
        element:
          <UserManage />
      },
      {
        path: "table-role",
        element:
          <RolePage />
      },
      {
        path: "table-permission",
        element:
          <PermissionPage />
      },
      {
        path: "table-patients",
        element:
          <ProductManage />

      },
    ]
  },
  {
    path: "/login",
    element: <SingInPage />,
  },
]);
export default router