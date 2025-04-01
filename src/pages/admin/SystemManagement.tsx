import { Box, Typography, useTheme, Tabs, Tab, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import moment from "moment";

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

const SystemManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [error, setError] = useState("");
  const [users, setUsers] = useState<RowData[]>([]);
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState(0);

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

  useEffect(() => {
    fetchUsers();
    fetchLogs();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "access", headerName: "Access Level", flex: 1 },
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
      valueGetter: (params: any) => moment(params.row.timestamp).fromNow(),
    },
  ];

  return (
    <Box m="20px">
      <Header title="SYSTEM MANAGEMENT" subtitle="Manage Users & View System Logs" />
      <Tabs 
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            '& .MuiTab-root': { color: '#000',  },
            '& .Mui-selected': { color: 'black',  fontWeight: 'bold', fontSize: "14px"},
            '& .MuiTabs-indicator': { backgroundColor: '#1976d2',  height: '3px', // Thicker indicator
              borderRadius: '10px', },
          }} 
      >
        <Tab label="Users" />
        <Tab label="System Logs" />
      </Tabs>

      {tabValue === 0 && (
        <Box sx={{ mt: "15px", height: "55vh" }}>
          <DataGrid
            rows={users}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            loading={loading}
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
      )}
      {tabValue === 1 && (
        <Box sx={{ mt: "20px", height: "55vh" }}>
          {/* <Button variant="contained" onClick={fetchLogs} sx={{ mb: 2 }}>
            Refresh Logs
          </Button> */}
          <DataGrid
            rows={logs}
            columns={logColumns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 25]}
            loading={loading}
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
      )}
    </Box>
  );
};

export default SystemManagement;