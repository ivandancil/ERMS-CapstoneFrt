import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Performance = () => {
   const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const navigate = useNavigate();

  // Mock Data for Employee Performance
  const [performances, setPerformances] = useState([
    { id: 1, employee_id: "E-001", evaluation_date: "2024-03-05", score: 85, remarks: "Excellent", status: "Approved" },
    { id: 2, employee_id: "E-002", evaluation_date: "2024-02-20", score: 78, remarks: "Good", status: "Pending" },
  ]);

  // Delete Function (Removes record from state)
  const deletePerformance = (id: number) => {
    setPerformances(performances.filter((performance) => performance.id !== id));
  };

  // Define Columns for DataGrid
  const columns: GridColDef[] = [
    { field: "employee_id", headerName: "Employee ID", flex: 1 },
    { field: "evaluation_date", headerName: "Evaluation Date", flex: 1 },
    { field: "score", headerName: "Score", flex: 1 },
    { field: "remarks", headerName: "Remarks", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button variant="contained" color="secondary" onClick={() => deletePerformance(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EMPLOYEE PERFORMANCE" subtitle="Manage Employee Evaluations" />
        {/* <Button 
                  
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
                  Add Performance Record
                </Button> */}
      </Box>

     

      {/* DataGrid Table */}
      {/* <Box mt={3} height="55vh">
      
        <DataGrid
          rows={performances}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
          }}
        />
      </Box> */}
    </Box>
  );
};

export default Performance;
