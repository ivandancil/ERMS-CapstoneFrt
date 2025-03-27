import { useState } from "react";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Reports = () => {
    const theme = useTheme();
        const colors = tokens(theme.palette.mode);
        const navigate = useNavigate();
  
  // Mock report data
  const [reports] = useState([
    { id: 1, name: "Employee Payroll Report", date: "2024-03-01", type: "Payroll" },
    { id: 2, name: "Attendance Summary", date: "2024-02-28", type: "Attendance" },
    { id: 3, name: "Leave Requests Report", date: "2024-02-25", type: "Leave Management" },
  ]);

  // Define columns for DataGrid
  const columns = [
    { field: "name", headerName: "Report Name", flex: 2 },
    { field: "date", headerName: "Date Generated", flex: 1 },
    { field: "type", headerName: "Category", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="REPORTS" subtitle="View and Export Reports" />
        <Box mt={3}>
        <Button 
                  
                  variant="contained" 
                  sx={{ backgroundColor: colors.blueAccent[700],
                         color: "#fff", "&:hover": { backgroundColor: colors.blueAccent[500] },
                         mr: 5,
                         textTransform: "none", fontSize: "13px", fontWeight: "bold",
                         px: 3, // Increase horizontal padding
                         py: 1.5, // Increase vertical padding
                         minWidth: "180px", // Set minimum width
                         minHeight: "10px",  }} 
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/admin/add_employee")}
                >
                  Export to PDF
                </Button>
       <Button 
                  
                  variant="contained" 
                  sx={{ backgroundColor: colors.blueAccent[700],
                         color: "#fff", "&:hover": { backgroundColor: colors.blueAccent[500] },
                         mr: 5,
                         textTransform: "none", fontSize: "13px", fontWeight: "bold",
                         px: 3, // Increase horizontal padding
                         py: 1.5, // Increase vertical padding
                         minWidth: "180px", // Set minimum width
                         minHeight: "10px",  }} 
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/admin/add_employee")}
                >
                  Export to CSV
                </Button>
      </Box>
      </Box>

     

      <Box mt={3} height="50vh" component={Paper}>
        {reports.length > 0 ? (
          <DataGrid
            rows={reports}
            columns={columns}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
              "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
            }}
          />
        ) : (
          <Typography textAlign="center" p={2}>No reports available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Reports;
