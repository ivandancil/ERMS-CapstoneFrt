import React, { useState } from "react";
import { TextField, MenuItem, Button, Box, Typography } from "@mui/material";
import { useNotificationContext } from "../../../components/NotificationContext";

interface AddLeaveRequestProps {
  onLeaveRequestAdded: () => void;
  onClose: () => void;
}

const leaveTypes = ["Vacation", "Sick", "Emergency", "Maternity", "Paternity"];

function AddLeaveRequest({ onLeaveRequestAdded, onClose }: AddLeaveRequestProps) {
  const { addNotification, removeNotification } = useNotificationContext();
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.end_date < formData.start_date) {
      setError("End date cannot be before start date.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user || !user.name) {
        throw new Error("User data is missing.");
      }

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

      const requestData = await response.json();

      // Notify admin but NOT the user
      if (user?.role !== "admin") {
        addNotification(`${user?.name} submitted a leave request.`, "admin", requestData.id);
      }

      setFormData({ leave_type: "", start_date: "", end_date: "", reason: "" });

      alert("Leave request added successfully.");
      onLeaveRequestAdded();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} mt={2}>
      {error && <Typography color="error" textAlign="center">{error}</Typography>}

      <TextField
        select
        label="Leave Type"
        name="leave_type"
        value={formData.leave_type}
        onChange={handleChange}
        required
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
      />

      <TextField
        label="End Date"
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        label="Reason"
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        multiline
        rows={3}
        required
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }} disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
}

export default AddLeaveRequest;
