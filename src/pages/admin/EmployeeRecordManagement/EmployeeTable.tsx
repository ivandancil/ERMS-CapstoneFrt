import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Grid,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../components/SearchContext";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface EmployeeRecord {
  id: number;
  employeeID: string;
  employeeName: string;
  attendanceStatus: string;
  hoursWorked: number;
  performanceRating: string;
  lastUpdated: string;
}

function EmployeeTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [employeeRecords, setEmployeeRecords] = useState<EmployeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { searchTerm } = useSearch();

  // Example: Fetch employee records
  async function fetchEmployeeRecords() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/employee-records", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employee records.");
      }

      const data = await response.json();
      setEmployeeRecords(data.records);
    } catch (err: any) {
      console.error("Error fetching employee records:", err.message);
      setError(err.message || "Failed to load employee records");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployeeRecords();
  }, []);

  // Filter employee records based on search term
  const filteredEmployeeRecords = employeeRecords.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Employee Records
        </Typography>

        {/* Add New Record Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: "#fff",
            "&:hover": { backgroundColor: colors.blueAccent[500] },
            textTransform: "none",
            fontSize: "13px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-employee-record")}
        >
          Create New Record
        </Button>
      </Box>

      {/* Show Error Message if API Fails */}
      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      {/* Employee Record Table */}
      <Box mt={3} height="55vh">
        <DataGrid
          rows={filteredEmployeeRecords}
          columns={[
            { field: "employeeID", headerName: "Employee ID", flex: 1 },
            { field: "employeeName", headerName: "Employee Name", flex: 1 },
            { field: "attendanceStatus", headerName: "Attendance Status", flex: 1 },
            { field: "hoursWorked", headerName: "Hours Worked", flex: 1 },
            { field: "performanceRating", headerName: "Performance Rating", flex: 1 },
            { field: "lastUpdated", headerName: "Last Updated", flex: 1 },
            {
              field: "actions",
              headerName: "Actions",
              flex: 1.5,
              renderCell: (params) => (
                <Box display="flex" gap={1} mt={1}>
                  {/* View Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", fontSize: "12px", px: 2 }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/employee-record/${params.row.id}`)}
                  >
                    View
                  </Button>
                </Box>
              ),
            },
          ]}
          loading={loading}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={{ page: 0, pageSize: 10 }}
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
}

export default EmployeeTable;
