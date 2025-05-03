import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Title from "../pages/Title";
import Dashboard from "../pages/admin/Dashboard";
import SystemManagement from "../pages/admin/SystemManagement";
import EmployeeManagement from "../pages/admin/Employee/EmployeeManagement";
import UploadDocs from "../pages/admin/Employee/UploadDocs";
import Reports from "../pages/admin/Employee/Reports";
import UserDashboard from "../pages/user/UserDashboard";
import EmployeeProfile from "../pages/user/EmployeeProfile";
import DocumentManagement from "../pages/user/DocumentManagement";
import AdminRoute from "../components/protectedRoutes/AdminRoute";
import UserRoute from "../components/protectedRoutes/UserRoute";
import UploadPDS from "../pages/user/UploadPDS";
import ExtractNationalId from "../pages/user/ExtractNationalId";


const Approutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employee_management" element={<EmployeeManagement />} />
        <Route path="system_management" element={<SystemManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="upload_docs" element={<UploadDocs />} />
        <Route path="employee/details/:id" element={<EmployeeProfile />} />

      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <UserRoute>
            <UserLayout />
          </UserRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="employee_profile" element={<EmployeeProfile />} />
        <Route path="document_management" element={<DocumentManagement />} />
        <Route path="upload_pds" element={<UploadPDS />} />
        <Route path="extract_id" element={<ExtractNationalId />} />

      </Route>


      {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      {/* Title Route */}
        <Route path="/" element={<Title />} />

    </Routes>
  );
};

export default Approutes;
