import React from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Download } from "lucide-react";
import Header from "../../components/Header";

function PayrollReport() {
  return (
    <Box m="20px">
      <Header title="DOWNLOAD REPORTS" subtitle="Download payroll summaries and detailed reports." />

      <Card sx={{ mt: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Payroll Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Select and download payroll reports as CSV or PDF.
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Button variant="contained" color="primary" startIcon={<Download />} sx={{ textTransform: "none" }}>
              Download Monthly Payroll Report (CSV)
            </Button>
            <Button variant="contained" color="secondary" startIcon={<Download />} sx={{ textTransform: "none" }}>
              Download Payroll Summary (PDF)
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PayrollReport;
