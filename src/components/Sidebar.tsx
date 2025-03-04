import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FaUserCircle, FaTachometerAlt, FaUsers, FaClipboardList, FaChartLine, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { tokens } from "../theme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
}

interface SidebarProps {
  role: "admin" | "user"; 
}

const Item = ({ title, to, icon, selected, setSelected }: ItemProps) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ role }: SidebarProps) => { 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();


  // Logout function //
  async function handleLogout() {
    try {
        const response = await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        console.log("Logged out successfully");

        navigate("/login"); 
    } catch (error: any) {
        console.error("Error:", error.message);
    }
}



  return (
    <Box
      sx={{
        height: "100vh",
        
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h5" fontWeight='bold' fontSize='18px' color={colors.grey[100]}>
                    H R I S
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
          </MenuItem>

          {!isCollapsed && (
            <Box textAlign="center" py={2}>
              <FaUserCircle size={50} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                {role === "admin" ? "Admin" : "Employee"}
              </Typography>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item title="Dashboard" to={`/${role}`} icon={<FaTachometerAlt />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>

            {role === "admin" && (
              <>

            <Item
              title="Employee Management"
              to="/admin/employee_management"
              icon={<FaUsers />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="System Management"
              to="/admin/system_management"
              icon={<FaUsers />}
              selected={selected}
              setSelected={setSelected}
            />
           
          
             <Item
              title="Performance"
              to="/admin/performance"
              icon={<FaChartLine />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Reports"
              to="/admin/reports"
              icon={<FaFileAlt />}
              selected={selected}
              setSelected={setSelected}
            />

            </>
          )}


          {role === "user" && (
            <>
             
              <Item title="Profile Settings" to="/user/profile_setting" icon={<FaCog />} selected={selected} setSelected={setSelected} />
              <Item
              title="Attendance"
              to="/user/attendance"
              icon={<FaClipboardList />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item title="Reports" to="/user/reports" icon={<FaClipboardList />} selected={selected} setSelected={setSelected} />
            </>
          )}
           
           <br />
             
              <MenuItem title="Logout" icon={<FaSignOutAlt />} onClick={handleLogout} >
                            Logout
            </MenuItem>
          
          
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar