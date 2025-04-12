import { Box, Grid, Paper, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { blue, grey } from "@mui/material/colors";

// Define Employee Type
interface Employee {
  id: number;
  jobPosition: string;
  lastname: string;
  firstname: string;
}

interface User {
  name: string;
  email?: string; // Add other fields if needed
}

function UserDashboard() {
   const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    

      const [employee, setEmployee] = useState<Employee | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
        const [user, setUser] = useState<User | null>(null);

    
      useEffect(() => {
        const token = localStorage.getItem("token"); // Get token from storage
    
        fetch("http://127.0.0.1:8000/api/employee", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Send token in headers
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch employee data");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Fetched Employee Data:", data); // Debugging
            setEmployee(data.employee); // ✅ Access the 'employee' key
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }, []);
      

  return (
    <Box m="20px">
      {/* Dashboard Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle={`Welcome, ${employee?.firstname || ""} ${employee?.lastname || ""}`} />

      </Box>

      {/* Overview Panel */}
      <Grid container spacing={3} mt={.5}>
        {/* <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center",  backgroundColor: colors.primary[600],   height: "110px", }}>
            <AccountCircleIcon sx={{ fontSize: 40, mr: 2, color: "blue" }} />
            <Box>
            <Typography
                variant="h5"
              >
                {employee?.firstname || ""} {employee?.lastname || ""}
              </Typography>
              <Typography variant="body1" color="gray">
                {employee?.jobPosition || ""}
              </Typography>
            </Box>
          </Paper>
        </Grid> */}

        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center",  backgroundColor: grey,   height: "110px",  }}>
            <EventAvailableIcon sx={{ fontSize: 40, mr: 2, color: "green" }} />
            <Box>
              <Typography variant="h6">22/30 Days</Typography>
              <Typography variant="body2">Attendance This Month</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center",  backgroundColor: grey,   height: "110px",  }}>
            <PaidIcon sx={{ fontSize: 40, mr: 2, color: "goldenrod" }} />
            <Box>
              <Typography variant="h6">$2,500</Typography>
              <Typography variant="body2">Last Salary</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center",  backgroundColor: grey,   height: "110px",  }}>
            <NotificationsActiveIcon sx={{ fontSize: 40, mr: 2, color: "red" }} />
            <Box>
              <Typography variant="h6">2 Notifications</Typography>
              <Typography variant="body2">Recent Updates</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Widgets Section */}
      <Grid container spacing={3} mt={1}>
        {/* Attendance Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400], }}>
            <Typography variant="h6">Attendance Overview</Typography>
            <Typography>Total Present: 22 Days</Typography>
            <Typography>Total Absences: 3 Days</Typography>
            <Typography>Overtime: 5 Hours</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              View Details
            </Button>
          </Paper>
        </Grid> */}

        {/* Leave Balance Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400], }}>
            <Typography variant="h6">Leave Balance</Typography>
            <Typography>Annual Leave: 10 Days</Typography>
            <Typography>Sick Leave: 5 Days</Typography>
            <Typography>Pending Requests: 1</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Request Leave
            </Button>
          </Paper>
        </Grid> */}

        {/* Payroll Widget */}
        {/* <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400],  }}>
            <Typography variant="h6">Payroll</Typography>
            <Typography>Last Salary: $2,500</Typography>
            <Typography>Next Payday: March 15</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              View Payslip
            </Button>
          </Paper>
        </Grid> */}

        {/* Quick Actions Widget */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" ,  backgroundColor: colors.primary[400], }}>
            <Typography variant="h6">Quick Actions</Typography>
            <Button variant="contained" color="primary" sx={{ m: 1 }}>
              Clock In
            </Button>
            <Button variant="contained" color="secondary" sx={{ m: 1 }}>
              Request Leave
            </Button>
            <Button variant="contained" color="success" sx={{ m: 1 }}>
              View Payslip
            </Button>
          </Paper>
        </Grid> */}

        {/* Recent Announcements Widget */}
        {/* <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 ,  backgroundColor: colors.primary[400], }}>
            <Typography variant="h6">Announcements</Typography>
            <Typography>- Payroll processed for February</Typography>
            <Typography>- Team-building event on March 10</Typography>
          </Paper>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default UserDashboard;
