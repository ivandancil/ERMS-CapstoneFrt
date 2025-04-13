import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import EmployeeManagement from "../pages/admin/Employee/EmployeeManagement";
import Attendance from "../pages/user/Attendance";
import Reports from "../pages/admin/Employee/Reports";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/UserDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SystemManagement from "../pages/admin/SystemManagement";
import Title from "../pages/Title";
import EmployeeProfile from "../pages/user/EmployeeProfile";
import LeaveRequest from "../pages/user/Leave/LeaveRequest";
import Payroll from "../pages/user/Payroll";
import PayrollProcess from "../pages/admin/PayrollProcess";
import AttendanceManagement from "../pages/admin/AttendanceManagement";
import LeaveManagement from "../pages/admin/LeaveManagement";
import DocumentManagement from "../pages/user/DocumentManagement";
import EmployeeTraining from "../pages/user/EmployeeTraining";
import AttendanceLogin from "../pages/admin/AttendanceLogin";
import AttendanceTracking from "../pages/AttendanceTracking";
import TrainingDevelopment from "../pages/admin/Training/TrainingDevelopment";
import AdminRoute from "../components/protectedRoutes/AdminRoute";
import UserRoute from "../components/protectedRoutes/UserRoute";
import PayrollLayout from "../layouts/PayrollLayout";
import PayrollRoute from "../components/protectedRoutes/PayrollRoute";
import PayrollDashboard from "../pages/payroll/PayrollDashboard";
import PayrollUpload from "../pages/payroll/PayrollUpload";
import PayrollView from "../pages/payroll/PayrollView";
import PayrollReport from "../pages/payroll/PayrollReport";
import RecordManagement from "../pages/admin/RecordManagement";
import RecordListTable from "../pages/admin/RecordManagement/RecordListTable";

import UploadDocs from "../pages/admin/Employee/UploadDocs";
import ViewRecord from "../pages/admin/RecordManagement/ViewRecord";
import OCR from "../pages/admin/RecordManagement/OCR";
import AddRecord from "../pages/admin/RecordManagement/AddRecord";
import EditRecord from "../pages/admin/RecordManagement/EditRecord";
import EmployeeList from "../pages/admin/EmployeeRecordManagement/EmployeeList";
import EmployeeRecordTable from "../pages/admin/EmployeeRecordManagement/EmployeeTable";
import EmployeeTable from "../pages/admin/EmployeeRecordManagement/EmployeeTable";
import UploadPDS from "../pages/user/UploadPDS";

// Import the protected routes

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
        <Route path="attendance_management" element={<AttendanceManagement />} />
        <Route path="leave_management" element={<LeaveManagement />} />
        <Route path="payroll" element={<PayrollProcess />} />
        <Route path="training_development" element={<TrainingDevelopment />} />
        <Route path="reports" element={<Reports />} />

        <Route path="record_management" element={<RecordManagement />} />
        <Route path="record_list_table" element={<RecordListTable />} />
        {/* <Route path="add_records" element={<AddRecord />} />
        <Route path="edit_records" element={<EditRecord />} /> */}
        <Route path="view_records" element={<ViewRecord />} />
        <Route path="upload_docs" element={<UploadDocs />} />
        <Route path="ocr" element={<OCR />} />

        <Route path="employee_list" element={<EmployeeList />} />
        <Route path="employee_table" element={<EmployeeTable />} />
        
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
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave_request" element={<LeaveRequest />} />
        <Route path="document_management" element={<DocumentManagement />} />
        <Route path="employee_training" element={<EmployeeTraining />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="upload_pds" element={<UploadPDS />} />
      </Route>

       {/* Payroll Routes (Separate) */}
       <Route
        path="/payroll"
        element={
          <PayrollRoute>
            <PayrollLayout />
          </PayrollRoute>
        }
      >
      <Route index element={<PayrollDashboard />} /> {/* Default payroll page */}
      <Route path="/payroll/upload" element={<PayrollUpload />} />
      <Route path="/payroll/view" element={<PayrollView />} />
      <Route path="/payroll/reports" element={<PayrollReport />} />
      

        </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Title Route */}
      <Route path="/" element={<Title />} />

      <Route path="/attendance-login" element={<AttendanceLogin />} />
      <Route path="/attendance" element={<AttendanceTracking />} />
    </Routes>
  );
};

export default Approutes;
