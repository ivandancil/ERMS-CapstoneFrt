import { Box, Card, CardContent, Typography, Grid, Paper, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

function PayrollDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Check if user is stored in localStorage

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  // Fetch logged-in user details from API
  const fetchUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const data = await response.json();
      setUser(data);

      // Store user data in localStorage for future use
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PAYROLL DASHBOARD" subtitle={`Welcome, ${loading ? "Loading..." : user?.name || "Unknown User"}`} />
      </Box>

    {/* Payroll Overview Panel */}
<Grid container spacing={3} mt={0.5}>
  {/* Total Employees */}
  <Grid item xs={12} md={3}>
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", alignItems: "center", backgroundColor: colors.primary[400], height: "110px" }}
    >
      <Box>
        <Typography variant="h6" color="white">Total Employees</Typography>
        <Typography variant="body2" color="white">Employees currently in payroll</Typography>
        <Typography variant="h4" color="white">{}</Typography>
      </Box>
    </Paper>
  </Grid>

  {/* Payroll Processed */}
  <Grid item xs={12} md={3}>
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", alignItems: "center", backgroundColor: colors.primary[400], height: "110px" }}
    >
      <Box>
        <Typography variant="h6" color="white">Payroll Processed</Typography>
        <Typography variant="body2" color="white">Payrolls completed this month</Typography>
        <Typography variant="h4" color="white">{}</Typography>
      </Box>
    </Paper>
  </Grid>

  {/* Pending Payroll */}
  <Grid item xs={12} md={3}>
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", alignItems: "center", backgroundColor: colors.primary[400], height: "110px" }}
    >
      <Box>
        <Typography variant="h6" color="white">Pending Payroll</Typography>
        <Typography variant="body2" color="white">Employees awaiting payroll processing</Typography>
        <Typography variant="h4" color="white">{}</Typography>
      </Box>
    </Paper>
  </Grid>

  {/* Overtime Payments */}
  <Grid item xs={12} md={3}>
    <Paper
      elevation={3}
      sx={{ p: 3, display: "flex", alignItems: "center", backgroundColor: colors.primary[400], height: "110px" }}
    >
      <Box>
        <Typography variant="h6" color="white">Overtime Payments</Typography>
        <Typography variant="body2" color="white">Total overtime paid this month</Typography>
        <Typography variant="h4" color="white">{}</Typography>
      </Box>
    </Paper>
  </Grid>
</Grid>


    </Box>
  );
}

export default PayrollDashboard;
