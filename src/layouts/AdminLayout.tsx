import { Box } from "@mui/material"
import Topbar from "../components/Topbar"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
        const location = useLocation();
        const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
     <Box display="flex">
      {!hideLayout && <Sidebar role="admin" />}
      <Box flexGrow={1}>
        {!hideLayout && <Topbar />}
      
          <Outlet />
     
      </Box>
    </Box>
  )
}

export default AdminLayout