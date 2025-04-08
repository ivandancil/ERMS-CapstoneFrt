import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../theme";

interface JobPositionProps {
  onJobPositionAdded: () => void; // Callback to refresh the job positions list
  onClose: () => void; // Close the dialog
}

const JobPosition: React.FC<JobPositionProps> = ({ onJobPositionAdded, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobPositionName, setJobPositionName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJobPositionSubmit = async () => {
    if (!jobPositionName.trim()) {
      setError("Job position name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/job-positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: jobPositionName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add job position.");
      }

      onJobPositionAdded(); // Refresh the job position list
      setJobPositionName(""); // Clear the input field
      onClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding job position:", error);
      setError("Failed to add job position.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: colors.blueAccent[700], color: "#fff", textAlign: "center" }}>
        Add New Job Position
      </DialogTitle>
      <DialogContent>
        <Box sx={{ padding: "20px" }}>
          {error && <Typography color="error" textAlign="center">{error}</Typography>}
          <TextField
            fullWidth
            label="Job Position Name"
            variant="outlined"
            value={jobPositionName}
            onChange={(e) => setJobPositionName(e.target.value)}
            sx={{
              marginBottom: "16px",
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={handleJobPositionSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Job Position"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobPosition;
