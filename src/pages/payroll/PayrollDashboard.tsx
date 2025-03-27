import { Box, Card, CardContent, Typography, Grid, Paper, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

function PayrollDashboard() {
       const theme = useTheme();
        const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
       <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PAYROLL DASHBOARD" subtitle="" />
      </Box>

     {/* Overview Panel */}
     <Grid container spacing={3} mt={.5}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, display: "flex", alignItems: "center",  backgroundColor: colors.primary[600],   height: "110px", }}>
            <Box>
              <Typography variant="h6"></Typography>
              <Typography variant="body2"></Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Payroll Processed */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Payrolls Processed</Typography>
              <Typography variant="h4">45</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Approvals */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Approvals</Typography>
              <Typography variant="h4">8</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PayrollDashboard;
