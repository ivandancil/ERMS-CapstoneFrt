import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNotificationContext } from "../../../components/NotificationContext";

interface AddTrainingProps {
  onTrainingAdded: () => void;
  onClose: () => void;
}

function AddTraining({ onTrainingAdded, onClose }: AddTrainingProps) {
  const [trainingID, setTrainingID] = useState(""); 
  const [trainingTitle, setTrainingTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotificationContext();
  

  const handleAddTraining = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/trainings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          trainingID,
          training_title: trainingTitle,
          start_datetime: startDate,
          end_datetime: endDate,
          duration: duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add training");
      }

      setTrainingID("");
      setTrainingTitle("");
      setStartDate("");
      setEndDate("");
      setDuration("");
      onTrainingAdded(); // Refresh training list
      onClose(); // Close dialog
    } catch (error) {
      console.error("Error adding training:", error);
      alert("Failed to add training");
    } finally {
      setLoading(false);
    }
    addNotification("New training session has been added!", "user");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2}>
        <TextField
        label="Training ID"
        value={trainingID}
        onChange={(e) => setTrainingID(e.target.value)}
        fullWidth
        autoComplete="off"
        sx={inputStyles}
      />
      <TextField
        label="Training Title"
        value={trainingTitle}
        onChange={(e) => setTrainingTitle(e.target.value)}
        fullWidth
        autoComplete="off"
        sx={inputStyles}
      />
      <TextField
        label="Start Date"
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        autoComplete="off"
        InputLabelProps={{ shrink: true }}
        sx={inputStyles}
      />
      <TextField
        label="End Date"
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        autoComplete="off"
        InputLabelProps={{ shrink: true }}
        sx={inputStyles}
      />
     
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddTraining}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Training"}
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

export default AddTraining;
