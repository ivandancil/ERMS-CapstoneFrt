import { Box, Button, Typography, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Header from "../../components/Header";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { tokens } from "../../theme";
import { useState, useEffect } from "react"; // Add the useState and useEffect hooks

interface LeaveRequest {
  id: number;
  leave_type: string;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  } | null; 
}


const LeaveManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define state variables
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch Function
  async function fetchLeaveRequests() {
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("http://127.0.0.1:8000/api/leave-requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch leave requests.");
      }
  
      const data = await response.json();
      const requestsArray = Array.isArray(data) ? data : data.data || [];
  
      // Map and add employee_name from the user object
      const mappedRequests = requestsArray.map((request: LeaveRequest) => ({
        ...request,
        employee_name: request.user?.name ?? "Unknown",
      }));
  
      setLeaveRequests(mappedRequests); // Set state with employee_name included
    } catch (err) {
      console.error("Error fetching leave requests:", (err as Error).message);
      setError((err as Error).message || "Failed to load leave request data");
    }
     finally {
      setLoading(false);
    }
  }
  


  useEffect(() => {
    fetchLeaveRequests();
  }, []); // Empty dependency array ensures this only runs on component mount

  // Define columns for the DataGrid
  const columns = [
  
    {
      field: "employee_name",
      headerName: "Employee Name",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return <Typography style={{ marginTop: "16px" }}>{params.row.user?.name ?? "Unknown"}</Typography>;
        
      },
    },
    { field: "leave_type", headerName: "Leave Type", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <Box m="20px">
      {/* Header and Download Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="LEAVE MANAGEMENT" subtitle="" />
        {/* <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
          }}
        >
          Download Report
        </Button> */}
      </Box>

      {/* Status Box */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} my={1}>
        <Box
          gridColumn="span 4"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <EventAvailableIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            {loading ? "Loading..." : `${leaveRequests.length} Pending Leave Requests`}
          </Typography>
        </Box>
      </Box>

      {/* Leave Requests DataGrid */}
      <Box mt={4} sx={{ height: "55vh" }}>
        <Typography variant="h4" color={colors.grey[100]} mb={1}>
          Pending Leave Requests
        </Typography>
        <DataGrid
          rows={leaveRequests}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page: 0, pageSize: 10 }}
          loading={loading}
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[500] },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: colors.blueAccent[700],
            },
          }}
        />
      </Box>

      {/* Error Handling */}
      {error && (
        <Box mt={2} sx={{ backgroundColor: colors.redAccent[600], p: 2, borderRadius: "5px" }}>
          <Typography color={colors.grey[100]}>{error}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default LeaveManagement;
