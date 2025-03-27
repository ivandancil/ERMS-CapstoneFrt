import { Box, Paper, Button, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

// Sample Payroll Data (Replace with API in the future)
const payrollData = [
  { id: 1, month: "February 2025", basicPay: 3000, deductions: 500, netPay: 2500 },
  { id: 2, month: "January 2025", basicPay: 3000, deductions: 450, netPay: 2550 },
  { id: 3, month: "December 2024", basicPay: 3000, deductions: 400, netPay: 2600 },
];

// Function to handle download (Replace with actual logic)
const handleDownloadPayslip = (month: string) => {
  alert(`Downloading payslip for ${month}`);
};

function Payroll() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "basicPay", headerName: "Basic Pay ($)", flex: 1 },
    { field: "deductions", headerName: "Deductions ($)", flex: 1 },
    { field: "netPay", headerName: "Net Pay ($)", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => handleDownloadPayslip(params.row.month)}>
          Download Payslip
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PAYROLL" subtitle="View your salary details" />
      </Box>

      {/* Payroll DataGrid */}
      <Box mt={3} height="55vh">
        <DataGrid
          rows={payrollData}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], color: "#fff" },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700], color: "#fff" },
          }}
        />
      </Box>
    </Box>
  );
}

export default Payroll;
