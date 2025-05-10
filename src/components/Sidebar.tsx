import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FaUserCircle, FaTachometerAlt, FaUsers, FaUpload, FaEye, FaCog, FaFolderOpen, FaIdCard } from "react-icons/fa";
import { tokens } from "../theme";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
  style?: React.CSSProperties;
}

interface SidebarProps {
  role: "admin" | "user" ;
}

// Reusable Item component
function Item({ title, to, icon, selected, setSelected }: ItemProps) {
  return (
      <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={<span style={{ color: selected === title ? "#1976d2" : "#757575" }}>{icon}</span>} // Add color styling
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
}

function Sidebar({ role }: SidebarProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found.");

        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data.");

        const data = await response.json();
        setName(data.name);
      } catch (err: any) {
        console.error(err.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);
  

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "black !important" },
        "& .pro-menu-item.active": {
          color: `${theme.palette.primary.dark} !important`,
          fontWeight: "bold",
          backgroundColor: "#d0d0d0 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed((prev) => !prev)}
            icon={
              isCollapsed ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img  src="/image/Logo3.png"alt="Logo" style={{ width: 30, height: 30, marginTop: "35px" }} />
                  <span style={{ fontSize: "12px", marginTop: "2px", color: colors.grey[100] }}>
                    DepEd
                  </span>
                </div>
              ) : undefined
            }
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
              {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
              <img
                src="/image/Logo3.png"
                alt="DepEd Logo"
                style={{
                  width: isCollapsed ? "20px" : "45px", 
                  height: "auto",
                  transition: "width 0.3s ease-in-out",  
                }}
              />
            <MenuOutlinedIcon
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                opacity: isCollapsed ? 0 : 1,
                color: "black",
              }}
            />
            </Box>
          )}
            </MenuItem>

          {!isCollapsed && (
            <Box textAlign="center" py={2}>
              <FaUserCircle size={50} />
                <Typography variant="h5" color="black" mt={1} fontWeight="bold">
                    {loading ? "Loading..." : name || "Unknown User"} 
                  </Typography>
                  <Typography variant="body2" color="black">
                    {role === "admin" ? "Admin" : "Employee"}
                  </Typography>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} color={"black"} mt={3}>
            <Item title="Dashboard" to={`/${role}`} icon={<FaTachometerAlt />} selected={selected} setSelected={setSelected}
               />

            {role === "admin" && (
              <>
                <Typography
                    variant="h6"
                    color="black"
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    DATA
              </Typography>

          <Item title="System Management" to="/admin/system_management" icon={<FaUsers />} selected={selected} setSelected={setSelected} />
          <Item title="Employee List" to="/admin/employee_management" icon={<FaUsers />} selected={selected} setSelected={setSelected} />
          <Item title="Uploaded Documents" to="/admin/upload_docs" icon={<FaUpload />} selected={selected} setSelected={setSelected} />
          <Item title="Reports" to="/admin/reports" icon={<FaEye />} selected={selected} setSelected={setSelected} />
           
        </>
            )}

            {role === "user" && (
              <>
                <Typography 
                    variant="h6" 
                    color={colors.grey[300]} 
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    DATA
                </Typography>

          <Item title="My Profile"  to="/user/employee_profile" icon={<FaCog />} selected={selected} setSelected={setSelected} />
          <Item title="Document Management" to="/user/document_management" icon={<FaFolderOpen />} selected={selected} setSelected={setSelected} />
          <Item title="Upload Image" to="/user/upload_pds" icon={<FaEye />} selected={selected} setSelected={setSelected} />
          <Item title="Extract National ID" to="/user/extract_id" icon={<FaIdCard />} selected={selected} setSelected={setSelected} />


              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
