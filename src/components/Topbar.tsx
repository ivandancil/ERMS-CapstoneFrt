import { Box, IconButton, useTheme, InputBase, Menu, MenuItem, Divider, Badge } from "@mui/material";
import { useState, useContext } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";
import { useEffect } from "react";

// Define types for notifications if necessary
interface Notification {
  id: number;
  message: string;
}

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [selected, setSelected] = useState("Dashboard");
  const [employeeData, setEmployeeData] = useState([]);
  const [user, setUser] = useState(null);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // States for menu visibility
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);

  // New state for notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);  // To track the number of notifications

  const navigate = useNavigate();

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const handleNotificationsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNotifications(event.currentTarget);
    setNotificationCount(0);  // Reset notification count when menu is opened
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    handleNotificationsClose();
  };

  const handleProfileNavigate = () => {
    navigate("/user/employee_profile"); // Change this to the correct profile page route
    handleProfileClose(); // Close the menu after navigation
  };

  // Simulate leave request submission and add notifications
  const handleAddLeaveRequest = () => {
    // Simulating a leave request being added
    const newNotification: Notification = {
      id: notifications.length + 1,
      message: `New leave request submitted for Sick Leave by John Doe.`,
    };

    // Update notifications
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    setNotificationCount(notificationCount + 1);  // Increment the notification count
  };

  // Fetch user data on component mount
useEffect(() => {
  const storedUser = localStorage.getItem("user"); // Assuming user data is stored in localStorage
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setName(parsedUser.name || ""); // Update name state
  }
}, []);

  // LOGOUT FUNCTION
  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found, redirecting to login.");
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      sessionStorage.clear();

      // Reset states
      setName("");
      setSelected("Dashboard");
      setUser(null);
      setEmployeeData([]);
      setLoading(true);

      console.log("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    }
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2} alignItems="center">
      {/* Search Bar */}
      <Box
        display="flex"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "5px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          p: "5px 10px",
        }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={handleNotificationsClick}>
          <Badge color="secondary" badgeContent={notificationCount} max={99}>
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
        <Menu
          anchorEl={anchorElNotifications}
          open={Boolean(anchorElNotifications)}
          onClose={handleNotificationsClose}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                {notification.message}
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
          )}

          <Divider />

          {/* Clear All Button */}
          <MenuItem onClick={handleClearAllNotifications}>Clear All</MenuItem>
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorElProfile}
          open={Boolean(anchorElProfile)}
          onClose={handleProfileClose}
        >
          <MenuItem onClick={handleProfileNavigate}>
            <strong>{name}</strong>  {/* Displays the current user's name as a clickable item */}
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
