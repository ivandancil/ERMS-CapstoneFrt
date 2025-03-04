import { Box } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"


const UserLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box display="flex">
    {!hideLayout && <Sidebar role="user" />}
    <Box flexGrow={1}>
      {!hideLayout && <Topbar />}
    
        <Outlet /> {/* Renders the child route content */}
   
    </Box>
  </Box>
  )
}

export default UserLayout