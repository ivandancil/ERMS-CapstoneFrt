import { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTraining from "./AddTraining";

import EditTraining from "./EditTraining";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

interface Training {
  id: number;
  trainingID: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface Participant {
  id: number;
  trainingTitle: string;
  name: string;
  completed: boolean;
}


function TrainingDevelopment() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([]);
const [loadingParticipants, setLoadingParticipants] = useState(true);
const [participantsError, setParticipantsError] = useState("");


  const addDialogRef = useRef<HTMLButtonElement>(null);
  const editDialogRef = useRef<HTMLButtonElement>(null);

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


    // Fetching Participants Table
    useEffect(() => {
      if (tabIndex === 1) {
        fetchParticipants();
      }
    }, [tabIndex]);
    
    const fetchParticipants = async () => {
      setLoadingParticipants(true);
      setParticipantsError("");
    
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/training-participants", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to fetch participants.");
        }
    
        const data = await response.json();
        const participantsArray = Array.isArray(data) ? data : data.data || [];
        setParticipants(participantsArray);
      } catch (err: any) {
        console.error("Error fetching participants:", err.message);
        setParticipantsError(err.message || "Failed to load participants data");
      } finally {
        setLoadingParticipants(false);
      }
    };
    

  // Delete Training Data
  const deleteTraining = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this training?")) return;

    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/trainings/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete training.");
      }

      setTrainings(trainings.filter((training) => training.id !== id));
      alert("Training deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete training.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TRAINING DEVELOPMENT" subtitle="Manage Training Programs" />
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
          Create Training
        </Button>
      </Box>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}

    <Tabs
        value={tabIndex}
        onChange={(_, newValue: number) => setTabIndex(newValue)}
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          '& .MuiTab-root': { color: '#000',  },
          '& .Mui-selected': { color: 'black',  fontWeight: 'bold', fontSize: "14px"},
          '& .MuiTabs-indicator': { backgroundColor: '#1976d2',  height: '3px', // Thicker indicator
            borderRadius: '2px', },
        }}
      >
        <Tab label="Trainings" />
        <Tab label="Participants" />
      </Tabs>


      {tabIndex === 0 && (
        // <Paper elevation={3} sx={{ p: 3 }}>
         
      <Box sx={{ mt: "20px", height: "55vh" }}>
        <DataGrid
          rows={trainings}
          columns={[
        
            { field: "trainingID", headerName: "Training ID", flex: 1 },
            { field: "training_title", headerName: "Training Title", flex: 1.5 },
            { field: "start_datetime", headerName: "Start Date", flex: 1.5 },
            { field: "end_datetime", headerName: "End Date", flex: 1.5 },
            { field: "duration", headerName: "Duration", flex: 1 },
            {
              field: "status",
              headerName: "Status",
              flex: 1,
              renderCell: (params) => (
                <Typography
                  sx={{
                    mt: "15px",
                    fontWeight: "bold",
                    color:
                      params.value === "Ongoing"
                        ? "white"
                        : params.value === "Completed"
                        ? "white"
                        : "white",
                  }}
                >
                  {params.value}
                </Typography>
              ),
            },
            
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
                      setSelectedTrainingId(params.row.id);
                      setOpenEditDialog(true);
                    }}
                    ref={editDialogRef}
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
                    onClick={() => deleteTraining(params.row.id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
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
      // {/* </Paper> */}
      )}

  {tabIndex === 1 && (
  // <Paper elevation={3} sx={{ p: 3 }}>
   
  //   {participantsError && (
  //     <Typography color="error" textAlign="center" mt={2}>
  //       {participantsError}
  //     </Typography>
  //   )}
    
    <Box sx={{ mt: "20px", height: "55vh" }}>
      <DataGrid
        rows={participants}
        columns={[
          { field: "fullname", headerName: "Participant Name", flex: 2 },
          { field: "training_title", headerName: "Training Title", flex: 2 },
        
          { field: "jobposition", headerName: "Job Position", flex: 2 },
          {
            field: "completed",
            headerName: "Status",
            flex: 1,
            renderCell: (params) =>
              params.value ? "Completed" : "In Progress",
          },
          // {
          //   field: "actions",
          //   headerName: "Actions",
          //   flex: 2,
          //   renderCell: (params) => (
          //     <>
          //       <Button
          //         variant="contained"
          //         size="small"
          //         onClick={() => markAsCompleted(params.row.id)}
          //       >
          //         Mark as Completed
          //       </Button>
          //       <Button
          //         variant="contained"
          //         size="small"
          //         sx={{ ml: 1 }}
          //         onClick={() => generateCertificate(params.row.id)}
          //       >
          //         Generate Certificate
          //       </Button>
          //     </>
          //   ),
          // },
        ]}
        loading={loadingParticipants}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        getRowId={(row) => row.id}
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
  // </Paper>
)}


      

     
   {/* Add Training Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Fill Up Training Details</DialogTitle>
          <DialogContent>
            <AddTraining onTrainingAdded={fetchTrainings} onClose={() => setOpenAddDialog(false)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>


      {/* Edit Training Dialog */}
      <Dialog
  open={openEditDialog}
  onClose={() => setOpenEditDialog(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Edit Training</DialogTitle>
  <DialogContent>
    <EditTraining
      trainingId={selectedTrainingId} // Pass trainingId here
      onTrainingUpdated={fetchTrainings} // Callback to refresh
      onClose={() => setOpenEditDialog(false)} // Close dialog
    />
  </DialogContent>
</Dialog>

    </Box>
  );
}

export default TrainingDevelopment;
