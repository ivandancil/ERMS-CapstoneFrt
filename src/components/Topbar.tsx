import { Box, IconButton, useTheme, InputBase, Menu, MenuItem, Divider, Badge } from "@mui/material";
import { useState, useContext, useEffect, MouseEvent } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "./NotificationContext";
import { useSearch } from "./SearchContext";
import { grey } from "@mui/material/colors";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const { notifications } = useNotificationContext();
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setName(parsedUser.name || "");
    }
    if (role) {
      setUserRole(role);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term
  };

  const handleSearch = () => {
    console.log("Searching for:", searchTerm); // This is where you'd trigger a search, e.g., filtering data
  };

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleClearAllNotifications = () => {
    localStorage.removeItem("notifications");
    handleNotificationsClose();
  };

  const handleProfileNavigate = () => {
    navigate("/user/employee_profile");
    handleProfileClose();
  };

  const userNotifications = notifications.filter((notification) => notification.role === userRole);

  // ✅ IMPROVED LOGOUT FUNCTION
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.warn("No token found, redirecting to login.");
        clearSessionAndRedirect();
        return;
      }
  
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        console.log("Logout successful");
      } else {
        console.warn("Logout failed, proceeding with local cleanup.");
      }
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    } finally {
      clearSessionAndRedirect();
    }
  };
  
  const clearSessionAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    sessionStorage.clear();
  
    setUserRole(null);
    setName("");
  
    navigate("/login");
  };
  

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      {/* Search Bar */}
      <Box
        display="flex"
        sx={{
          backgroundColor: "#f5f5f5", // or use theme.palette.grey[200] if using MUI theme
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          padding: "8px 16px", // easier to read than shorthand with px
        }}
        
      >
         <InputBase
        sx={{ ml: 2, flex: 1 }}
        placeholder="Search..."
        value={searchTerm} // Bind value to searchTerm from context
        onChange={handleInputChange} // Update search term on input change
      />
      <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        {/* Notifications */}
        <IconButton onClick={handleNotificationsClick}>
          <Badge color="error" badgeContent={userNotifications.length}>
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleProfileClick}>
          <PersonOutlinedIcon />
        </IconButton>

        {/* Notifications Menu */}
        <Menu anchorEl={anchorElNotifications} open={Boolean(anchorElNotifications)} onClose={handleNotificationsClose}>
          {userNotifications.length > 0 ? (
            userNotifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                {notification.message}
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleClearAllNotifications}>Clear All</MenuItem>
        </Menu>

        {/* Profile Menu */}
        <Menu anchorEl={anchorElProfile} open={Boolean(anchorElProfile)} onClose={handleProfileClose}>
          <MenuItem onClick={handleProfileNavigate}>
            <strong>{name}</strong>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
