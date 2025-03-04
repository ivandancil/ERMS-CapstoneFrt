import { Box, Button, useTheme} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataEmployee } from "../../data/mockData";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";



const EmployeeManagement = () => {

   const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const columns = [
      {
        field: "id",
        headerName: "ID",
        flex: 0.5
      },
      {
        field: "employeeId",
        headerName: "Employee ID",
      },
      {
        field: "name",
        headerName: "Name",
         flex: 1,
         cellClassName:  "name-column-cell",
      },
      {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
      },
      {
        field: "province",
        headerName: "Province",
        flex: 1,
      },
      {
        field: "zipCode",
        headerName: "ZipCode",
        flex: 1,
      },
     
     
    ];

  return (
    <Box m="20px">
       <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EMPLOYEE MANAGEMENT" subtitle="Managing the Employees List" />

      
            <Button 
                  
                  variant="contained" 
                  sx={{ backgroundColor: colors.blueAccent[700],
                         color: "#fff", "&:hover": { backgroundColor: colors.blueAccent[500] },
                         mr: 5,
                         textTransform: "none", fontSize: "13px", fontWeight: "bold"  }} 
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/admin/add_employee")}
                >
                  Add Employee
                </Button>
                </Box>

        <Box  
         sx={{
          mt: "20px",
          height: "75vh",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
        >
      <DataGrid
          rows={mockDataEmployee}
          columns={columns} 
          slots={{ toolbar: GridToolbar }} 
          />
    
    </Box>
  </Box>
  )
}

export default EmployeeManagement;