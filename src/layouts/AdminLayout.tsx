import { Box } from "@mui/material";
import Topbar from "../components/Topbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box display="flex" height="100vh">
      {!hideLayout && <Sidebar role="admin" />}

      <Box flexGrow={1} sx={{ minHeight: "100vh", overflowY: "auto" }}>
        {!hideLayout && <Topbar />}
        
        <Box p={3}> 
          
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
