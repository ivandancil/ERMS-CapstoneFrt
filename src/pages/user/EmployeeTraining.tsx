import { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Modal, TextField, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

interface Training {
  id: number;
  training_title: string;
  date: string;
  duration: string;
  status: string;
  registered: boolean;
  confirmed: boolean;
}

function EmployeeTraining() {
   const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [certificateInfo, setCertificateInfo] = useState({
    fullName: "",
    position: "",
  
  });

  // Fetch trainings from the backend
  async function fetchTrainings() {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/trainings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trainings.");
      }

      const data = await response.json();
      const trainingsArray = Array.isArray(data) ? data : data.data || [];

      setTrainings(trainingsArray);
    } catch (err: any) {
      console.error("Error fetching trainings:", err.message);
      setError(err.message || "Failed to load training data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleEnroll = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!selectedTraining || !certificateInfo.fullName || !certificateInfo.position) {
      alert("Please fill all the required fields.");
      return;
    }

    const postData = {
      training_id: selectedTraining.id,
      training_title: selectedTraining.training_title,
      fullname: certificateInfo.fullName,
      jobposition: certificateInfo.position,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/training-participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Enrollment failed");
      }

      alert("Enrollment Successful!");

      // Update local state to reflect enrollment
      setTrainings((prevTrainings) =>
        prevTrainings.map((training) =>
          training.id === selectedTraining?.id
            ? { ...training, registered: true }
            : training
        )
      );

      setOpen(false);
      setSelectedTraining(null);
      setCertificateInfo({ fullName: '', position: '' });
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Enrollment Failed. Please try again.");
    }
  }

  const handleOpenModal = (training: Training) => {
    setSelectedTraining(training);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTraining(null);
  };

  const handleRegister = (id: number) => {
    const training = trainings.find((t) => t.id === id);
    if (training?.registered) {
      setTrainings((prev) =>
        prev.map((training) =>
          training.id === id ? { ...training, registered: false } : training
        )
      );
    } else {
      handleOpenModal(training!);
    }
  };

  const columns: GridColDef[] = [
    { field: "training_title", headerName: "Training Program", flex: 1 },
    { field: "start_datetime", headerName: "Start Date", flex: 1 },
    { field: "end_datetime", headerName: "End Date", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.row.registered ? "secondary" : "primary"}
          onClick={() => handleRegister(params.row.id)}
        >
          {params.row.registered ? "Enrolled" : "Enroll"}
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="TRAINING & DEVELOPMENT"
        subtitle="Your training records and upcoming sessions"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : (
       
        
          <Box mt={3} height="55vh">
            <DataGrid
              rows={trainings}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: colors.blueAccent[700],
                  color: "#fff",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: colors.blueAccent[700],
                  color: "#fff",
                },
              }}
            />
          </Box>
      
      )}

      {/* Enroll Training Dialog */}
      <Dialog
        open={open}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Enroll in Training</DialogTitle>

        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Please fill in the necessary details to enroll in:
          </Typography>

          <TextField
            fullWidth
            label="Training Title"
            value={selectedTraining?.training_title || ''}
            margin="normal"
            sx={inputStyles}
            disabled
          />

          <TextField
            fullWidth
            label="Full Name"
            placeholder="Enter your full name"
            margin="normal"
            value={certificateInfo.fullName}
            sx={inputStyles}
            onChange={(e) =>
              setCertificateInfo({ ...certificateInfo, fullName: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Job Position"
            placeholder="Enter your job position"
            margin="normal"
            value={certificateInfo.position}
            sx={inputStyles}
            onChange={(e) =>
              setCertificateInfo({ ...certificateInfo, position: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleEnroll}>
            Enroll
          </Button>
        </DialogActions>
      </Dialog>
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

export default EmployeeTraining;
