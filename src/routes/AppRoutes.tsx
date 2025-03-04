import {Route, Routes } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import Dashboard from "../pages/admin/Dashboard"
import EmployeeManagement from "../pages/admin/EmployeeManagement"
import Attendance from "../pages/user/Attendance"
import Performance from "../pages/admin/Performance"
import Reports from "../pages/admin/Reports"
import UserLayout from "../layouts/UserLayout"
import UserDashboard from "../pages/user/UserDashboard"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import SystemManagement from "../pages/admin/SystemManagement"
import AddEmployee from "../pages/admin/AddEmployee"
import Title from "../pages/Title"
import ProfileSetting from "../pages/user/ProfileSetting"


const Approutes = () => {
  return (
    
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard/>} />
        <Route path="/admin/employee_management" element={<EmployeeManagement />} />
        <Route path="/admin/system_management" element={<SystemManagement />} />

        <Route path="performance" element={<Performance />} />
        <Route path="reports" element={<Reports />} />

        <Route path="/admin/add_employee" element={<AddEmployee />} />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<UserDashboard />} />
        <Route path="/user/profile_setting" element={<ProfileSetting />} />
        <Route path="/user/attendance" element={<Attendance />} />
        <Route path="/user/reports" element={<Reports />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Title Route */}
      <Route path="/" element={<Title />} />
    </Routes>
  )
}

export default Approutes