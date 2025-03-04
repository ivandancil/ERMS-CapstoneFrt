import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { mockDataSystemUsers } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

interface RowData {
  access: "admin" | "user"; 
}

const SystemManagement = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
      {
        field: "id",
        headerName: "ID"
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
        field: "access",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row }: { row: RowData }) => {
          return (
            <Box
            {...({} as any)}
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                row.access === "admin"
                ? colors.greenAccent[600]

                : colors.greenAccent[700]
            }
            borderRadius="4px"
            mt="10px"
          >
        {row.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
        {row.access === "user" && <LockOpenOutlinedIcon />}
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {row.access}
        </Typography>
      </Box>
          );
        },
      },
     
    ];

  return (
    <Box m="20px">
        <Header title="SYSTEM MANAGEMENT" subtitle="Manage ADMIN/USER List" />
        <Box  
         sx={{
          mt: "20px",
          height: "65vh",
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
        }}
        >
      <DataGrid
          rows={mockDataSystemUsers}
          columns={columns} 
          />
    
    </Box>
  </Box>
  )
}

export default SystemManagement