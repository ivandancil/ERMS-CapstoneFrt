import React from "react";
import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const payrollData = [
  { id: 1, fileName: "Payroll_March.csv", uploadedBy: "Admin", uploadDate: "2025-03-29", status: "Processed" },
  { id: 2, fileName: "Payroll_February.xlsx", uploadedBy: "HR", uploadDate: "2025-02-28", status: "Processed" },
];

const columns = [
  { field: "fileName", headerName: "File Name", flex: 2 },
  { field: "uploadDate", headerName: "Upload Date", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function PayrollView() {
    const theme = useTheme();
        const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="UPLOADED PAYROLL" subtitle="View uploaded payroll records" />

      <Card sx={{ mt: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Payroll Files
          </Typography>
          <Box sx={{ height: 400 }}>
            <DataGrid 
              rows={payrollData} 
              columns={columns} 
              pageSizeOptions={[5, 10]} 
              disableRowSelectionOnClick
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: colors.blueAccent[700],
                  color: "#fff",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: colors.blueAccent[700],
                  color: "#fff",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PayrollView;
