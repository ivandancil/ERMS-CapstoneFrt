import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CampaignIcon from "@mui/icons-material/Campaign";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const overviewData = [
    { title: "150", subtitle: "Total Employees", icon: <GroupsIcon sx={{ fontSize: 30, color: "#3498db" }} /> }, // Blue
    { title: "10", subtitle: "New Employee Registrations", icon: <PersonAddAltIcon sx={{ fontSize: 30, color: "#2ecc71" }} /> }, // Green
    { title: "5", subtitle: "Pending Leave Requests", icon: <PendingActionsIcon sx={{ fontSize: 30, color: "#f39c12" }} /> }, // Orange
  
  ];

  return (
    <Box m={3}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to ADMIN dashboard" />
        {/* <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: 1 }} />
          Download Reports
        </Button> */}
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
                backgroundColor: colors.primary[600],
                height: "110px", // Smaller height
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
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400], }}>
            <FactCheckIcon sx={{ fontSize: 30, color: "#9b59b6" }} /> {/* Purple */}
            <Typography variant="h6" mt={2}>Attendance Overview</Typography>
            <Typography>Total Present: 140 Employees</Typography>
            <Typography>Total Absent: 10 Employees</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              View Details
            </Button>
          </Paper>
        </Grid>

        {/* Payroll Summary Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400], }}>
            <AttachMoneyIcon sx={{ fontSize: 30, color: "#27ae60" }} /> {/* Green */}
            <Typography variant="h6" mt={2}>Payroll Summary</Typography>
            <Typography>Total Salary: $150,000</Typography>
            <Typography>Next Payroll: March 15</Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              View Payroll
            </Button>
          </Paper>
        </Grid>

        {/* Announcements Widget */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3,  backgroundColor: colors.primary[400]  }}>
            <CampaignIcon sx={{ fontSize: 30, color: "#e67e22" }} /> {/* Orange */}
            <Typography variant="h6" mt={2}>Recent Announcements</Typography>
            <Typography>- Payroll processed for February</Typography>
            <Typography>- Team Meeting on March 10</Typography>
          </Paper>
        </Grid>


        {/* Quick Actions Widget */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center",  backgroundColor: colors.primary[400], }}>
            <SettingsApplicationsIcon sx={{ fontSize: 30, color: "#16a085" }} /> {/* Teal */}
            <Typography variant="h6" mt={2}>Quick Actions</Typography>
            <Button variant="contained" color="primary" sx={{ m: 1 }}>
              Add Employee
            </Button>
            <Button variant="contained" color="secondary" sx={{ m: 1 }}>
              Approve Leave
            </Button>
            <Button variant="contained" color="success" sx={{ m: 1 }}>
              Generate Reports
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
