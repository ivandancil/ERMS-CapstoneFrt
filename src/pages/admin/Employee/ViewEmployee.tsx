import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  DialogActions,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

interface Employee {
  id: number;
  employeeID: string;
  jobPosition: string;
  lastname: string;
  firstname: string;
  middlename: string;
  sex: string;
  dateOfBirth: string;
  civilStatus: string;
  name: string;
  age: number;
  phoneNumber: string;
  email: string;
  address: string;
}

interface ViewEmployeeDialogProps {
  open: boolean;
  documents: { documentName: string; documentUrl?: string }[];
  onClose: () => void;
  employee: Employee | null;
}

function ViewEmployee({ open, onClose, employee, documents }: ViewEmployeeDialogProps) {
  if (!employee) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle 
        sx={{ 
          backgroundColor: "#1E1E1E", 
          color: "#fff", 
          fontWeight: "bold", 
          fontFamily: "Poppins",
          textAlign: "center" 
        }}
      >
        Employee Profile
      </DialogTitle>

      <DialogContent dividers>
        <Box p={3}>
          {/* Profile Section */}
          <Box display="flex" alignItems="center" mb={3} gap={3}>
            <Box
              sx={{
                width: 120,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                backgroundColor: "#B0BEC5",
              }}
            >
              <PersonIcon sx={{ fontSize: 60, color: "#fff" }} />
            </Box>
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {employee.firstname} {employee.middlename} {employee.lastname}
              </Typography>
              <Typography color="textSecondary" variant="h5">
                {employee.jobPosition}
              </Typography>
            </Box>
          </Box>

          {/* Personal Info */}
          <Card sx={{ mb: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                PERSONAL INFORMATION
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Employee ID:</Typography>
                  <Typography>{employee.employeeID || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Sex:</Typography>
                  <Typography>{employee.sex || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Date of Birth:</Typography>
                  <Typography>{employee.dateOfBirth || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Age:</Typography>
                  <Typography>{employee.age || "N/A"}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Civil Status:</Typography>
                  <Typography>{employee.civilStatus || "N/A"}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

             {/* Contact Info */}
             <Card sx={{ mb: 2, boxShadow: 2 }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        CONTACT INFORMATION
                    </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                            <Typography fontWeight="bold">Email:</Typography>
                            <Typography>{employee.email || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                            <Typography fontWeight="bold">Phone Number:</Typography>
                            <Typography>{employee.phoneNumber || "N/A"}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography fontWeight="bold">Address:</Typography>
                            <Typography>{employee.address || "N/A"}</Typography>
                            </Grid>
                        </Grid>
                </CardContent>
            </Card>

              {/* Documents Section */}
              <Card sx={{ mb: 2, boxShadow: 2 }}>
                <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    DOCUMENTS
                </Typography>
                    {documents.length > 0 ? (
                        <Grid container spacing={2}>
                        {documents.map((doc, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ p: 2 }}>
                                <Typography fontWeight="bold">
                                {doc.documentName}
                                </Typography>
                                <Box mt={1}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    onClick={() => window.open(doc.documentUrl, "_blank")}
                                >
                                    View
                                </Button>
                                </Box>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography>No documents available</Typography>
                )}
                </CardContent>
            </Card>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewEmployee;
