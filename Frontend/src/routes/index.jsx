import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminHome from "../pages/admin/Dashboard.tsx";
import UserPage from "../pages/admin/UserTable";
import LayoutAdmin from "../layout/LayoutAdmin";
import Error404 from "../components/errors/NotFoundPage";
import LayoutClient from "@/layout/LayoutClient";
import HomePageClient from "@/pages/client/HomePageClient";
import RolePage from "@/pages/admin/RoleTable";

import PermissionPage from "@/pages/admin/PermissionTable";
import LayoutApp from "@/components/share/LayoutApp";
import ProtectedRoute from "@/components/share/protected/RouteProtect";
import PatientTable from "@/pages/admin/PatientTable";
import AppointmentTable from "@/pages/admin/AppointmentTable";
import MedicalRecordSummary from "@/pages/admin/MedicalRecordSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp><LayoutClient /></LayoutApp>,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <HomePageClient />
      },

    ]
  },
  {
    path: "/admin",
    element: <LayoutApp><LayoutAdmin /></LayoutApp>,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element:
          <ProtectedRoute>
            <AdminHome />
          </ProtectedRoute>

      },
      {
        path: "table-patients",
        element:
          <ProtectedRoute><PatientTable /></ProtectedRoute>

      },
      {
        path: "table-appointment",
        element:
          <ProtectedRoute>
            <AppointmentTable />
          </ProtectedRoute>

      },
      {
        path: "table-summary",
        element:
          <ProtectedRoute>
            <MedicalRecordSummary />
          </ProtectedRoute>

      },
      {
        path: "table-users",
        element:
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>

      },
      {
        path: "table-role",
        element:
          <ProtectedRoute>
            <RolePage />
          </ProtectedRoute>

      },
      {
        path: "table-permission",
        element:
          <ProtectedRoute>
            <PermissionPage />
          </ProtectedRoute>

      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
]);
export default router