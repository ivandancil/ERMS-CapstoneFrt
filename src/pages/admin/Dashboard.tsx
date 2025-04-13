import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";


interface User {
  id: number;
  name: string;
  email: string;
  role?: string; // Optional field for roles like "admin", "user", etc.
}


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState<User | null>(null);
  const [employees, setEmployees] = useState([]); // Store employees
  const [leaveRequests, setLeaveRequests] = useState([]); // Store leave requests
  const [users, setUsers] = useState([]); // ✅ Store system users

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ Define error state

  useEffect(() => {
    fetchUser();
    fetchEmployees();
    fetchLeaveRequests();
    fetchUsers(); // ✅ Fetch all users
  }, []);

  // ✅ Fetch logged-in user details
  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      if (!response.ok) throw new Error("Failed to fetch users");
  
      const data = await response.json();
      console.log("Users API Response:", data); // Debugging
  
      // Extract users correctly
      const usersArray = Array.isArray(data) ? data : data.data || [];
  
      setUsers(usersArray);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  

  // ✅ Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/employees", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      if (!response.ok) throw new Error("Failed to fetch employees");
  
      const data = await response.json();
      console.log("Employees API Response:", data); // 🔍 Debugging
  
      // Ensure we extract employees from API response correctly
      const employeesArray = Array.isArray(data) ? data : data.data || [];
  
      setEmployees(employeesArray); // ✅ Store the extracted array
    } catch (err) {
      console.error("Error fetching employees:", (err as Error).message);
    }
  };
  
  // ✅ Fetch leave requests
  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/leave-requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leave requests.");
      }

      const data = await response.json();
      const requestsArray = Array.isArray(data) ? data : data.data || [];

      setLeaveRequests(requestsArray);
    } catch (err) {
      console.error("Error fetching leave requests:", (err as Error).message);
      setError((err as Error).message || "Failed to load leave request data");
    }
  };

  // ✅ Overview Data with fixed structure
  const overviewData = [
    {
      title: loading ? "Loading..." : employees.length.toString(),
      subtitle: "Total Number of Employees",
      icon: <GroupsIcon sx={{ fontSize: 30, color: "#3498db" }} />,
    },
    {
      title: loading ? "Loading..." : users.length.toString(),
      subtitle: "Registered System Users",
      icon: <PersonAddAltIcon sx={{ fontSize: 30, color: "#2ecc71" }} />,
    },
    {
      title: loading ? "Loading..." : leaveRequests.length.toString(),
      subtitle: "Number of Uploaded Documents",
      icon: <InsertDriveFileIcon sx={{ fontSize: 30, color: "#f39c12" }} />,
    },
    {
      title: loading ? "Loading..." : leaveRequests.length.toString(),
      subtitle: "Notifications",
      icon: <NotificationsActiveIcon sx={{ fontSize: 30, color: "red" }} />,
    },
    // {
    //   title: loading ? "Loading..." : leaveRequests.length.toString(),
    //   subtitle: "Pending Leave Requests",
    //   icon: <PendingActionsIcon sx={{ fontSize: 30, color: "#f39c12" }} />,
    // },
  ];

  return (
    <Box m={3}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DASHBOARD"
          subtitle={`Welcome, ${loading ? "Loading..." : user?.name || "Unknown User"}`}
        />
      </Box>

      {/* Overview Section */}
      <Grid container spacing={2} mt={0.5}>
        {overviewData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: grey,
                height: "110px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold" mt={1} fontSize="16px">
                {item.title}
              </Typography>
              <Typography variant="body2" fontSize="12px">
                {item.subtitle}
              </Typography>
            </Paper>
          </Grid>
          
        ))}
       
      </Grid>
      
      {/* Widgets Section */}
      <Grid container spacing={3} mt={1}>
        {/* Attendance Overview Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4,  backgroundColor: colors.primary[400], }}>
            <FactCheckIcon sx={{ fontSize: 30, color: "#9b59b6" }} />
            <Typography variant="h6" mt={2}>Attendance Overview</Typography>
            <Typography>Total Present: 140 Employees</Typography>
            <Typography>Total Absent: 10 Employees</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2, mr: 4}}>
              View Details
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Daily Attendance
            </Button>
          </Paper>
        </Grid> */}

        {/* Payroll Summary Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400], }}>
            <AttachMoneyIcon sx={{ fontSize: 30, color: "#27ae60" }} />
            <Typography variant="h6" mt={2}>Payroll Summary</Typography>
            <Typography>Total Salary: $150,000</Typography>
            <Typography>Next Payroll: March 15</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              View Payroll
            </Button>
          </Paper>
        </Grid> */}

        {/* Announcements Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400]  }}>
            <CampaignIcon sx={{ fontSize: 30, color: "#e67e22" }} />
            <Typography variant="h6" mt={2}>Recent Announcements</Typography>
            <Typography>- Payroll processed for February</Typography>
            <Typography>- Team Meeting on March 10</Typography>
          </Paper>
        </Grid> */}


        {/* Quick Actions Widget */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center",  backgroundColor: colors.primary[400], }}>
            <SettingsApplicationsIcon sx={{ fontSize: 30, color: "#16a085" }} />
            <Typography variant="h6" mt={2}>Quick Actions</Typography>
            <Button variant="contained" color="primary" sx={{ m: 1 }}>
              Add Employee
            </Button>
            <Button variant="contained" color="secondary" sx={{ m: 1 }}>
              Approve Leave
            </Button>
            <Button variant="contained" color="success" sx={{ m: 1 }}>
              Daily Attendance
            </Button>
          </Paper>
        </Grid> */}
      </Grid>

    </Box>
  );
};

export default Dashboard;