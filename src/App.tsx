import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/admin/Dashboard";
import EmployeeManagement from "./scenes/admin/EmployeeManagement";
import Attendance from "./scenes/admin/Attendance";
import Payroll from "./scenes/admin/Payroll";
import Performance from "./scenes/admin/Performance";
import Reports from "./scenes/admin/Reports";
import Settings from "./scenes/admin/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  const { theme, colorMode } = useMode();
  const location = useLocation();

  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideLayout && <Sidebar />}
          <main className="content">
            {!hideLayout && <Topbar />}
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/employee_management" element={<EmployeeManagement />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
