import { Box, Typography, useTheme, Tabs, Tab, Button, Tooltip, CircularProgress, TextField, Grid } from "@mui/material";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined"; // Payroll Icon
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import moment from "moment";
import { useSearch } from "../../components/SearchContext";


interface RowData {
  id: number;
  name: string;
  email: string;
  access: "admin" | "user" | "payroll";
}

interface LogData {
  id: number;
  category: string;
  user?: string;
  action?: string;
  event?: string;
  timestamp: string;
}

interface UserLogData {
  id: number;
  name: string;
  action: string;
  timestamp: string;
  user?: {
    name: string;
    // Add other user fields if needed
  };
}

const SystemManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [error, setError] = useState("");
  const { searchTerm } = useSearch();
  const [users, setUsers] = useState<RowData[]>([]);
  const [logs, setLogs] = useState<LogData[]>([]);
  const [userLogs, setUserLogs] = useState<UserLogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);
 

  const [userPagination, setUserPagination] = useState({ page: 0, pageSize: 10 });
  const [logPagination, setLogPagination] = useState({ page: 0, pageSize: 10 });
  const [userLogPagination, setUserLogPagination] = useState({ page: 0, pageSize: 10 });

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users.");
      const data = await response.json();
      const usersArray = Array.isArray(data) ? data : data.data || [];
      const formattedUsers = usersArray.map((user: any) => ({
        ...user,
        access:
          user.access?.toLowerCase() === "admin"
            ? "admin"
            : user.access?.toLowerCase() === "payroll"
            ? "payroll"
            : "user",
      }));
      setUsers(formattedUsers);
    } catch (err: any) {
      setError(err.message || "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/system-logs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch logs.");
      const data = await response.json();
      setLogs(data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load system logs");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/user-logs", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch user logs.");
      const data = await response.json();
      setUserLogs(data.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load user logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabValue === 0) fetchUsers();
    // if (tabValue === 1) fetchLogs();
    if (tabValue === 1) fetchUserLogs();
  }, [tabValue]);


  
    // Filtering logic based on searchTerm
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredLogs = logs.filter((log) =>
      log.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredUserLogs = userLogs.filter((log) =>
      log.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "access", headerName: "Access Level", flex: 1, 
      renderCell: ({ row }: { row: RowData }) => (
        <Box
        
          width="30%"
          m="20 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          mt={1.5}
         
          // sx={{
          //   backgroundColor: row.access === "admin" ? "#d32f2f" :
          //                    row.access === "payroll" ? "#0288d1" :
          //                    "#388e3c", 
          //   color: "#fff", 
          //   borderRadius: "4px",
          // }}
        >
          <Tooltip
            title={row.access === "admin" ? "Administrator" : 
                   row.access === "payroll" ? "Payroll Manager" : 
                   "Regular User"}
          >
            <Box display="flex" alignItems="center">
              {row.access === "admin" && <AdminPanelSettingsOutlinedIcon />}
              {row.access === "payroll" && <MonetizationOnOutlinedIcon />} 
              {row.access === "user" && <LockOpenOutlinedIcon  />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {row.access === "admin" ? "Admin" : 
                 row.access === "payroll" ? "Payroll" : 
                 "User"}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const logColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "timestamp", headerName: "Timestamp", flex: 1 },
    { field: "user", headerName: "User", flex: 1 },
    { field: "action", headerName: "Action/Event", flex: 1 },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      // valueGetter: (params: any) => {
      //   // Check if params.row and params.row.timestamp exist
      //   const timestamp = params.row?.timestamp;
      //   return timestamp ? moment(timestamp).fromNow() : "N/A"; // Safely access timestamp
      // },
    },
  ];
  
 const userLogColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  { field: "action", headerName: "Action", flex: 1 },
  { field: 'timestamp', headerName: 'Timestamp', flex: 1, valueFormatter: ({ value }: any) => moment(value).format('MMMM Do YYYY, h:mm:ss a') },
 
];

  
  return (
    <Box m="20px">
        <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Header title="SYSTEM MANAGEMENT" subtitle="Manage Users & View System Logs" />
        </Grid>
        {/* <Grid item sx={inputStyles}>
        <TextField
            label="Search"
            value={searchTerm}
            variant="outlined"
            autoComplete="off"
            sx={{ width: "250px", marginRight: "20px" }}
          />
        </Grid> */}
      </Grid>
      <Tabs 
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          '& .MuiTab-root': { color: '#000' },
          '& .Mui-selected': { color: 'black', fontWeight: 'bold', fontSize: "14px" },
          '& .MuiTabs-indicator': { backgroundColor: '#1976d2', height: '3px', borderRadius: '10px' },
        }}
      >
        <Tab label="Registered Users" />
        {/* <Tab label="System Logs" /> */}
        <Tab label="User Logs" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ mt: "15px", height: "50vh" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              paginationModel={userPagination}
              onPaginationModelChange={setUserPagination}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": { backgroundColor: "black", color: "#fff" },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "black",
                  color: "#fff",
                },
                "& .MuiTablePagination-root": {
                  color: "#fff", 
                },
                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },
                "& .MuiDataGrid-columnSeparator": { display: "none" },
              }}
            />
          )}
        </Box>
      )}

      {/* {tabValue === 1 && (
        <Box sx={{ mt: "20px", height: "55vh" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={filteredLogs}
              columns={logColumns}
              paginationModel={logPagination}
              onPaginationModelChange={setLogPagination}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], color: "#fff" },
                "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700], color: "#fff" },
                "& .MuiDataGrid-columnSeparator": { display: "none" },
              }}
            />
          )}
        </Box>
      )} */}

      {tabValue === 1 && (
        <Box sx={{ mt: "20px", height: "50vh" }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              rows={filteredUserLogs}
              columns={userLogColumns}
              paginationModel={userLogPagination}
              onPaginationModelChange={setUserLogPagination}
              pageSizeOptions={[5, 10, 25]}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": { backgroundColor:"black", color: "#fff" },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "black",
                  color: "#fff",
                },
                "& .MuiTablePagination-root": {
                  color: "#fff", 
                },
                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },
                "& .MuiDataGrid-columnSeparator": { display: "none" },
            
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};



// Styles: Placeholder turns white on hover!
const inputStyles = {
  "& .MuiInputLabel-root": { color: "#ccc !important" },
  "& .MuiInputLabel-root.Mui-focused": { color: "white !important" },
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiInputLabel-root": { color: "white !important" },
    "& fieldset": { borderColor: "#ccc !important" },
    "&:hover fieldset": { borderColor: "white !important" },
    "&.Mui-focused fieldset": { borderColor: "white !important" },
  },
  "& .MuiInputBase-input": { color: "white" },
};

export default SystemManagement;
