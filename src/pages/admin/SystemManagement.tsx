import { Box, Typography, useTheme, Tooltip, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined"; // Payroll Icon
import { useState, useEffect, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

interface RowData {
  id: number;
  name: string;
  email: string;
  access: "admin" | "user" | "payroll"; // Added payroll role
}

const SystemManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [error, setError] = useState(""); // State to hold any error messages
  const [users, setUsers] = useState<RowData[]>([]); // Data state to hold system users
  const [loading, setLoading] = useState<boolean>(false); // To track loading state
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const addDialogRef = useRef<HTMLButtonElement>(null);
  const editDialogRef = useRef<HTMLButtonElement>(null);

  // Fetch Users from the backend
  async function fetchUsers() {
    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const data = await response.json();
      const usersArray = Array.isArray(data) ? data : data.data || []; // Adjust as needed based on your API response

      // Ensure all users have 'access' as 'admin', 'user', or 'payroll'
      const formattedUsers = usersArray.map((user: any) => ({
        ...user,
        access:
          user.access?.toLowerCase() === "admin"
            ? "admin"
            : user.access?.toLowerCase() === "payroll"
            ? "payroll"
            : "user",
      }));

      setUsers(formattedUsers); // Set the users in the state
    } catch (err: any) {
      console.error("Error fetching users:", err.message);
      setError(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(); // Call the function to fetch users
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column-cell",
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
            width="30%"
            m="20 auto"
            p="5px"
            display="flex"
            justifyContent="center"
        //  backgroundColor={
        //   row.access === "admin"
        //     ? "#d32f2f" // Deep Red for Admin
        //     : row.access === "payroll"
        //     ? "#0288d1" // Deep Blue for Payroll
        //     : row.access === "user"
        //     ? "#388e3c" // Deep Green for HR / Employee Management
        //     : "#6c757d" // Muted Gray for unspecified roles
        // }
        

            borderRadius="4px"
            mt="10px"
            alignItems="center"
          >
            <Tooltip
              title={
                row.access === "admin"
                  ? "Administrator"
                  : row.access === "payroll"
                  ? "Payroll Manager"
                  : "Regular User"
              }
            >
              <Box display="flex" alignItems="center">
                {row.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                {row.access === "payroll" && <MonetizationOnOutlinedIcon />} 
                {row.access === "user" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                  {row.access === "admin"
                    ? "Admin"
                    : row.access === "payroll"
                    ? "Payroll"
                    : "User"}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SYSTEM MANAGEMENT" subtitle="View Registered System Users"  />
      </Box>

      {error && (
        <Box sx={{ backgroundColor: colors.redAccent[500], padding: "10px", borderRadius: "5px" }}>
          <Typography color="white">{error}</Typography>
        </Box>
      )}
      <Box sx={{ mt: "20px", height: "65vh" }}>
        <DataGrid
          rows={users} // Data from backend (system users)
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          loading={loading} // Show loading spinner while fetching data
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], color: "#fff" },
            "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700], color: "#fff" },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
          }}
        />
      </Box>
    </Box>
  );
};

export default SystemManagement;
