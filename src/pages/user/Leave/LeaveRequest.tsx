import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AddLeaveRequest from "./AddLeaveRequest";
import EditLeaveRequest from "./EditLeaveRequest";


interface Leave {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
}

function LeaveRequest() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [leaveRequests, setLeaveRequests] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<Leave | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const addDialogRef = useRef<HTMLButtonElement>(null);

  // Fetch Leave Requests
  async function fetchLeaveRequests() {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/my-leave-requests", {
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

      setLeaveRequests(requestsArray);
    } catch (err: any) {
      console.error("Error fetching leave requests:", err.message);
      setError(err.message || "Failed to load leave request data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Delete Leave Request
  const deleteLeaveRequest = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;

    setDeleteLoading(id);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/leave-requests/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete leave request.");
      }

      setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
      alert("Leave request deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete leave request.");
    } finally {
      setDeleteLoading(null);
    }
  };

  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="LEAVE REQUEST" subtitle="Track your leave requests" />

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
            minWidth: "180px",
          }}
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          ref={addDialogRef}
        >
          Send Leave Request
        </Button>
      </Box>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

      <Box mt={2} height="60vh">
        <DataGrid
          rows={leaveRequests}
          columns={[
            { field: "leave_type", headerName: "Leave Type", flex: 1 },
            { field: "start_date", headerName: "Start Date", flex: 1 },
            { field: "end_date", headerName: "End Date", flex: 1 },
            { field: "reason", headerName: "Reason", flex: 1 },
            { field: "status", headerName: "Status", flex: 1 },
            {
              field: "actions",
              headerName: "Actions",
              flex: 1.5,
              renderCell: (params) => (
                <Box display="flex" gap={1} mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", fontSize: "12px", px: 2 }}
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedLeaveRequest(params.row);
                      setOpenEditDialog(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      fontSize: "12px",
                      px: 2,
                      backgroundColor: "primary",
                      color: "#fff",
                      "&:hover": { backgroundColor: "primary" },
                    }}
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteLeaveRequest(params.row.id)}
                    disabled={deleteLoading === params.row.id}
                  >
                    {deleteLoading === params.row.id ? "Deleting..." : "Delete"}
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

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Fill Up Leave Request Form</DialogTitle>
        <DialogContent>
          <AddLeaveRequest
            onLeaveRequestAdded={() => {
              fetchLeaveRequests(); // Refresh the leave requests

            }}
            onClose={() => setOpenAddDialog(false)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="secondary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Leave Request</DialogTitle>
        <DialogContent>
          {selectedLeaveRequest && (
            <EditLeaveRequest
              leaveRequest={selectedLeaveRequest}
              onLeaveRequestUpdated={fetchLeaveRequests}
              onClose={() => setOpenEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default LeaveRequest;
