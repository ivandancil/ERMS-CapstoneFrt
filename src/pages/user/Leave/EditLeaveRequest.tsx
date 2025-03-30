import { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";

interface EditLeaveRequestProps {
  leaveRequest: {
    id: number;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
  };
  onLeaveRequestUpdated: () => void;
  onClose: () => void;

}

const leaveTypes = ["Vacation", "Sick", "Emergency", "Maternity", "Paternity"]; // Customize as needed

function EditLeaveRequest({ leaveRequest, onLeaveRequestUpdated, onClose }: EditLeaveRequestProps) {
  const [leaveType, setLeaveType] = useState(leaveRequest.leave_type);
  const [startDate, setStartDate] = useState(leaveRequest.start_date);
  const [endDate, setEndDate] = useState(leaveRequest.end_date);
  const [reason, setReason] = useState(leaveRequest.reason);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const [formData, setFormData] = useState({
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: "",
    });

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/my-leave-requests/${leaveRequest.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          leave_type: leaveType,
          start_date: startDate,
          end_date: endDate,
          reason: reason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update leave request.");
      }

      alert("Leave request updated successfully.");
      onLeaveRequestUpdated();
      onClose();
    } catch (err: any) {
      console.error("Error updating leave request:", err.message);
      setError(err.message || "Failed to update leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
      <TextField
        label="Leave Type"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        fullWidth
        sx={{...inputStyles}}
      
         >
              {leaveTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
         </TextField>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{...inputStyles}}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{...inputStyles}}
      />
      <TextField
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{...inputStyles}}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Update"}
        </Button>
      </Box>
    </Box>
  );
}

// 🔥 Styles: Placeholder turns white on hover!
const inputStyles = {
  "& .MuiInputLabel-root": { color: "#ccc !important" }, // Default placeholder color
  "& .MuiInputLabel-root.Mui-focused": { color: "white !important" }, // Focus color
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiInputLabel-root": { color: "white !important" }, // White placeholder on hover
    "& fieldset": { borderColor: "#ccc !important" }, // Default border color
    "&:hover fieldset": { borderColor: "white !important" }, // Border turns white on hover
    "&.Mui-focused fieldset": { borderColor: "white !important" }, // White border on focus
  },
  "& .MuiInputBase-input": { color: "white" }, // Text color white
};


export default EditLeaveRequest;
