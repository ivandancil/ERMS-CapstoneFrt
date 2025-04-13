import { Box, Grid, Paper, Typography, Button, useTheme } from "@mui/material";
import Header from "../../components/Header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";

// Define Employee Type
interface Employee {
  id: number;
  jobPosition: string;
  lastname: string;
  firstname: string;
}

interface User {
  name: string;
  email?: string;
}

function UserDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/api/employee", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch employee data");
        return response.json();
      })
      .then((data) => {
        setEmployee(data.employee);
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
        <Header
          title="DASHBOARD"
          subtitle={`Welcome, ${employee?.firstname || ""} ${employee?.lastname || ""}`}
        />
      </Box>

      {/* Top Summary Cards */}
      <Grid container spacing={3} mt={0.5}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              backgroundColor: grey[200],
              height: "110px",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 40, mr: 2, color: blue[700] }} />
            <Box>
              <Typography variant="h5">
                {employee?.firstname} {employee?.lastname}
              </Typography>
              <Typography variant="body2">{employee?.jobPosition}</Typography>
            </Box>
          </Paper>
        </Grid>

       
        {/* Pending Tasks */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              backgroundColor: grey[200],
              height: "110px",
            }}
          >
              <AssignmentIcon sx={{ fontSize: 40, mr: 2, color: "orange" }} />
              <Box>
              <Typography variant="h5">Pending Tasks</Typography>
              <Typography variant="body2">4 Tasks</Typography>
            </Box>
          
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              alignItems: "center",
              backgroundColor: grey[200],
              height: "110px",
            }}
          >
            <NotificationsActiveIcon sx={{ fontSize: 40, mr: 2, color: red[600] }} />
            <Box>
              <Typography variant="h5">2 Notifications</Typography>
              <Typography variant="body2">Recent Updates</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Widgets Section */}
      <Grid container spacing={3} mt={2}>
        {/* Employment Details */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: colors.primary[400],
              borderRadius: "12px",
              boxShadow: 6,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 10,
              },
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <WorkIcon sx={{ mr: 1, color: "black" }} />
              <Typography variant="h5" color="black">
                Employment Details
              </Typography>
            </Box>
            <Typography variant="body1" color="black">
              Job Position: {employee?.jobPosition}
            </Typography>
            <Typography variant="body1" color="black">
              Date Hired: {employee?.dateHired}
            </Typography>
            <Typography variant="body1" color="black">
              Work Status: {employee?.status}
            </Typography>
          </Paper>
        </Grid>
       

     

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              p: 3,
              textAlign: "center",
              backgroundColor: colors.primary[400],
              borderRadius: "12px",
              boxShadow: 6,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 10,
              },
            }}
          >
            <Typography variant="h5" gutterBottom color="black">
              Quick Actions
            </Typography>
            <Button variant="contained" color="primary" sx={{ m: 1 }}>
              Scan Document
            </Button>
            <Button variant="contained" color="secondary" sx={{ m: 1 }}>
              View Profile
            </Button>
          
          </Paper>
        </Grid>

       
      </Grid>
    </Box>
  );
}

export default UserDashboard;
