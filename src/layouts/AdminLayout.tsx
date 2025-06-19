import { Box, useMediaQuery, useTheme } from "@mui/material"; // Import useMediaQuery and useTheme
import Topbar from "../components/Topbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react"; // Import useEffect

const AdminLayout = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  // Access the theme and media query hook
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Check if screen is desktop or larger

  // State for sidebar collapse, initialized based on screen size
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(!isDesktop); // Auto-collapse if not desktop

  // Effect to update isSidebarCollapsed when screen size changes
  useEffect(() => {
    // If it's desktop, set to false (expanded) unless user manually collapses later
    // If it's not desktop (mobile/tablet), set to true (collapsed)
    setIsSidebarCollapsed(!isDesktop);
  }, [isDesktop]); // Re-run this effect whenever isDesktop changes

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <Box display="flex" height="100vh">
      {!hideLayout && (
        <Sidebar
          role="admin"
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
      )}

      <Box flexGrow={1} sx={{ minHeight: "100vh", overflowY: "auto" }}>
        {!hideLayout && (
          <Topbar
            toggleSidebar={toggleSidebar}
          />
        )}

        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;