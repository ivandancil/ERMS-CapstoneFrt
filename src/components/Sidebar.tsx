import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {
  FaUserCircle,
  FaTachometerAlt,
  FaUsers,
  FaUserAlt,
  FaUpload,
  FaEye,
  FaClipboardList,
  FaUserClock,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaFolderOpen,
} from "react-icons/fa";
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
  role: "admin" | "user" | "payroll"; // Add "payroll" here
}

// Reusable Item component
function Item({ title, to, icon, selected, setSelected, style }: ItemProps) {
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
}

function Sidebar({ role }: SidebarProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [user, setUser] = useState(null);



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
      localStorage.removeItem("user"); // Any additional
      sessionStorage.clear();
  
      // Reset states
      setName("");
      setSelected("Dashboard");
      setUser(null);
      setEmployeeData([]);
      setLoading(true);
  
      // Clear API cache if using
      // queryClient.clear();
  
      console.log("Logged out successfully");
  
      navigate("/login");
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : error);
    }
  }
  

  return (
    <Box
      sx={{
        height: "100vh",
        "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "white !important" },
        "& .pro-menu-item.active": { color: "white !important" },
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
                width: isCollapsed ? "20px" : "45px", // Smaller size
                height: "auto",
                transition: "width 0.3s ease-in-out",
                
              }}
            />
           <MenuOutlinedIcon
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              opacity: isCollapsed ? 0 : 1, // Hide icon when collapsed
            }}
          />
          </Box>
          
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box textAlign="center" py={2}>
            <FaUserCircle size={50} />
            <Typography variant="h5" color="white" mt={1} fontWeight="bold">
                {loading ? "Loading..." : name || "Unknown User"} {/* ✅ show name */}
              </Typography>
              <Typography variant="body2">
              {role === "admin" ? "Admin" : role === "payroll" ? "Accounting" : "Employee"}
            </Typography>

            
          </Box>
          
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to={`/${role}`} icon={<FaTachometerAlt />} selected={selected} setSelected={setSelected}   />

            {role === "admin" && (
              <>
                <Typography
                    variant="h6"
                    color="grey.300"
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    DATA
              </Typography>

              {/* <Item
                title="Employee List"
                to="/admin/employee_list"
                icon={<FaUserAlt />}
                selected={selected}
                setSelected={setSelected}
              /> */}

  <Item title="Employee List" to="/admin/employee_management" icon={<FaUsers />} selected={selected} setSelected={setSelected} />

        {/* <Item
            title="Add Employee Record"
            to="/admin/add_records"
            icon={<FaFileAlt />}
            selected={selected}
            setSelected={setSelected}
          /> */}

          <Item
            title="Record Table"
            to="/admin/employee_table"
            icon={<FaFileAlt />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Upload Documents"
            to="/admin/upload_docs"
            icon={<FaUpload />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="OCR Extract"
            to="/admin/ocr"
            icon={<FaEye />}
            selected={selected}
            setSelected={setSelected}
          />
                <Item
                  title="Record Management"
                  to="/admin/record_management"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                />

              {/* <Item
                  title="Record List Table"
                  to="/admin/record_list_table"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Item
                  title="Add Records"
                  to="/admin/add_records"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Item
                  title="Edit Records"
                  to="/admin/edit_records"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Item
                  title="View Records"
                  to="/admin/view_records"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                />

              <Item
                  title="Upload Documents"
                  to="/admin/upload_docs"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}

{/* <Item
                  title="OCR"
                  to="/admin/ocr"
                  icon={<FaFolderOpen />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}

                {/* <Item title="System Management" to="/admin/system_management" icon={<FaUsers />} selected={selected} setSelected={setSelected} />
                <Item title="Employee Management" to="/admin/employee_management" icon={<FaUsers />} selected={selected} setSelected={setSelected} />
                <Item title="Leave Management" to="/admin/leave_management" icon={<FaClipboardList />} selected={selected} setSelected={setSelected} />
                <Item title="Training Development" to="/admin/training_development" icon={<FaChalkboardTeacher />} selected={selected} setSelected={setSelected} />

                <SubMenu title="Payroll & Attendance" icon={<FaUserClock />}>
                  <Item title="Payroll " to="/admin/payroll" icon={<FaMoneyCheckAlt />} selected={selected} setSelected={setSelected} />
                  <Item title="Attendance" to="/admin/attendance_management" icon={<FaClipboardList />} selected={selected} setSelected={setSelected} />
                </SubMenu>

               
                <Item title="Reports" to="/admin/reports" icon={<FaFileAlt />} selected={selected} setSelected={setSelected} /> */}
              </>
            )}

            {role === "user" && (
              <>
                <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                  DATA
                </Typography>

                <Item title="My Profile"  to="/user/employee_profile" icon={<FaCog />} selected={selected} setSelected={setSelected} />
                {/* <Item title="Attendance" to="/user/attendance" icon={<FaClipboardList />} selected={selected} setSelected={setSelected} />
                <Item title="Leave Request" to="/user/leave_request" icon={<FaClipboardList />} selected={selected} setSelected={setSelected} /> */}
                <Item title="Manage Document" to="/user/document_management" icon={<FaFolderOpen />} selected={selected} setSelected={setSelected} />
                {/* <Item title="Employee Training" to="/user/employee_training" icon={<FaFolderOpen />} selected={selected} setSelected={setSelected} />
                <Item title="Payroll" to="/user/payroll" icon={<FaMoneyCheckAlt />} selected={selected} setSelected={setSelected} /> */}
              </>
            )}
            {role === "payroll" && (
              <>
                <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
                  DATA
                </Typography>

                <Item title="Upload Payroll" to="/payroll/upload" icon={<FaMoneyCheckAlt />} selected={selected} setSelected={setSelected} />
                {/* <Item title="View Uploaded Payrolls" to="/payroll/view" icon={<FaFileAlt />} selected={selected} setSelected={setSelected} />
                <Item title="Download Reports" to="/payroll/reports" icon={<FaFolderOpen />} selected={selected} setSelected={setSelected} /> */}
              </>
            )}

            <br />

            {/* <MenuItem title="Logout" icon={<FaSignOutAlt />} onClick={handleLogout}>
              Logout
            </MenuItem> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
