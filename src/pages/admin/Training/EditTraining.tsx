import { useState, useEffect } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

interface EditTrainingProps {
  trainingId: number | null;
  onTrainingUpdated: () => void;
  onClose: () => void;
}

function EditTraining({ trainingId, onTrainingUpdated, onClose }: EditTrainingProps) {
  const [trainingData, setTrainingData] = useState({
    trainingID: "",
    training_title: "",
    start_datetime: "",
    end_datetime: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!trainingId) {
      console.warn("No trainingId provided, skipping fetch.");
      return;
    }

    async function fetchTraining() {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://127.0.0.1:8000/api/trainings/${trainingId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch training. Status: ${response.status}`);
        }

        const data = await response.json();
        const training = data.data || data;

        if (!training) {
          throw new Error("Invalid training data received.");
        }

        setTrainingData({
          trainingID: training.trainingID || "",
          training_title: training.training_title || "",
          start_datetime: training.start_datetime || "",
          end_datetime: training.end_datetime || "",
          duration: training.duration || "",
        });
      } catch (err: any) {
        console.error("Error fetching training:", err.message);
        setError(err.message || "Error loading training data.");
      } finally {
        setLoading(false);
      }
    }

    fetchTraining();
  }, [trainingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingData({ ...trainingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainingId) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/trainings/${trainingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trainingID: trainingData.trainingID,
          training_title: trainingData.training_title,
          start_datetime: trainingData.start_datetime,
          end_datetime: trainingData.end_datetime,
          duration: trainingData.duration,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update training. Status: ${response.status}`);
      }

      alert("Training updated successfully.");
      onTrainingUpdated();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update training.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          <TextField
            label="Training ID"
            name="trainingID"
            value={trainingData.trainingID}
            fullWidth
            required
            sx={{
              mt: 2, 
              ...inputStyles 
            }}
          />

          <TextField
            label="Training Title"
            name="training_title"
            value={trainingData.training_title}
            onChange={handleChange}
            fullWidth
            required
            sx={inputStyles}
          />

          <TextField
            label="Start Date & Time"
            name="start_datetime"
            type="datetime-local"
            value={trainingData.start_datetime}
            onChange={handleChange}
            fullWidth
            required
            sx={inputStyles}
          />

          <TextField
            label="End Date & Time"
            name="end_datetime"
             type="datetime-local"
            value={trainingData.end_datetime}
            onChange={handleChange}
            fullWidth
            required
            sx={inputStyles}
          />

          <TextField
            label="Duration"
            name="duration"
            value={trainingData.duration}
            onChange={handleChange}
            fullWidth
            required
            sx={inputStyles}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Update Training"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

// Input Styles
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

export default EditTraining;
