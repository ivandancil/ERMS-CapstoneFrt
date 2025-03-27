import React, { useState } from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";

interface AddLeaveRequestProps {
  onLeaveRequestAdded: () => void;
  onClose: () => void;
}

const leaveTypes = ["Vacation", "Sick", "Emergency", "Maternity", "Paternity"]; // Customize as needed

function AddLeaveRequest({ onLeaveRequestAdded, onClose }: AddLeaveRequestProps) {
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/leave-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit leave request.");
      }

      // Clear form
      setFormData({ leave_type: "", start_date: "", end_date: "", reason: "" });

      // Refresh leave requests
      onLeaveRequestAdded();
      onClose();
      alert("Leave request submitted successfully.");
    } catch (err: any) {
      console.error(err.message);
      setError(err.message || "Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} mt={2}>
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      <TextField
        select
        label="Leave Type"
        name="leave_type"
        value={formData.leave_type}
        onChange={handleChange}
        required
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
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
        sx={{...inputStyles}}
      />

      <TextField
        label="End Date"
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
        sx={{...inputStyles}}
      />

      <TextField
        label="Reason"
        name="reason"
        
        value={formData.reason}
        onChange={handleChange}
        multiline
        rows={3}
        required
      
        sx={{...inputStyles} }
      />

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
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


export default AddLeaveRequest;
