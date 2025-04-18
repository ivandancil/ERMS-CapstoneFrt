  import React, { useState, useEffect, useRef } from "react";
  import { Box,
    Button,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Card,
    CardContent,
  } from "@mui/material";
  import { DataGrid } from "@mui/x-data-grid";
  import Header from "../../../components/Header";
  import AddIcon from "@mui/icons-material/Add";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { tokens } from "../../../theme";
  import { useNavigate } from "react-router-dom";
  import AddEmployee from "./AddEmployee";
  import EditEmployee from "./EditEmployee";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import { useSearch } from "../../../components/SearchContext";
  import JobPosition from "./JobPosition";
  import PersonIcon from '@mui/icons-material/Person';

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

  function EmployeeManagement() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [openAddJobPositionDialog, setOpenAddJobPositionDialog] = useState(false);
    const { searchTerm } = useSearch();

    


    const addDialogRef = useRef<HTMLButtonElement>(null);
    const editDialogRef = useRef<HTMLButtonElement>(null);

    

    const handleView = (employee: Employee) => {
      setSelectedEmployee(employee);
      setOpenViewDialog(true);
    };
    


    // Fetch Employees
    async function fetchEmployees() {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://127.0.0.1:8000/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees.");
        }

        const data = await response.json();
        const employeesArray = Array.isArray(data) ? data : data.data || [];

        setEmployees(employeesArray);
      } catch (err: any) {
        console.error("Error fetching employees:", err.message);
        setError(err.message || "Failed to load employee data");
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      fetchEmployees();
    }, []);

    // Delete Employee
    const deleteEmployee = async (id: number) => {
      if (!window.confirm("Are you sure you want to delete this employee?")) return;

      setDeleteLoading(true);
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://127.0.0.1:8000/api/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete employee.");
        }

        setEmployees(employees.filter((employee) => employee.id !== id));
        alert("Employee deleted successfully.");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete employee.");
      } finally {
        setDeleteLoading(false);
      }
      
    };

    // Filter employees based on search term
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const mockDocuments = [
      // {
      //   documentName: "Employee ID Card",
      //   // documentUrl: "http://example.com/document/employee_id_card.pdf"
      // },
      // {
      //   documentName: "Contract",
      //   // documentUrl: "http://example.com/document/contract.pdf"
      // },
      // {
      //   documentName: "Certificate of Employment",
      //   // documentUrl: "http://example.com/document/certificate_of_employment.pdf"
      // },
      {
        documentName: "Personal Data Sheet",
        // documentUrl: "http://example.com/document/certificate_of_employment.pdf"
      }
    ];

    return (
      <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
    <Header title="EMPLOYEE MANAGEMENT LIST" subtitle="Manage Employee Details" />

    {/* Add Employee Button */}
    <Button
      variant="outlined"
      sx={{
        backgroundColor: "black",
        color: "#fff",
        "&:hover": { backgroundColor: "black" },
        textTransform: "none",
        fontSize: "13px",
        fontWeight: "bold",
        px: 3,
        py: 1.5,
        minWidth: "180px",
      
      }}
      startIcon={<AddIcon />}
      onClick={() => setOpenAddDialog(true)}
      ref={addDialogRef} // Store reference to button
    >
      Create New Employee
    </Button>


    
  </Box>



  {/* Job Position Dialog */}
  {openAddJobPositionDialog && (
    <JobPosition
      onJobPositionAdded={fetchEmployees} // Refresh the list after adding a job position
      onClose={() => setOpenAddJobPositionDialog(false)} // Close dialog after adding
    />
  )}


        {/* Show Error Message if API Fails */}
        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}

        {/* Employee Table */}
        <Box mt={3} height="55vh">
          <DataGrid
            rows={filteredEmployees}
            columns={[
              { field: "employeeID", headerName: "Employee ID", flex: 1 },
              { field: "lastname", headerName: "Last Name", flex: 1 },
              { field: "firstname", headerName: "First Name", flex: 1 },
              { field: "email", headerName: "Email", flex: 1 },
              {
                field: "actions",
                headerName: "Actions",
                flex: 1.5,
                renderCell: (params) => (
                  <Box display="flex" gap={1} mt={1}>
                    {/* View Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", fontSize: "12px", px: 2 }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleView(params.row)}
                  >
                    View
                  </Button>
                    {/* Edit Button */}
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none", fontSize: "12px", px: 2 }}
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setSelectedEmployeeId(params.row.id);
                        setOpenEditDialog(true);
                      }}
                      ref={editDialogRef} // Store reference
                    >
                      Edit
                    </Button>

                    {/* Delete Button */}
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
                      onClick={() => deleteEmployee(params.row.id)}
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
              "& .MuiDataGrid-columnHeader": { backgroundColor: "black" , color: "#fff" },
              "& .MuiDataGrid-footerContainer": { 
                backgroundColor: "black", 
                color: "#fff", 
              },
              "& .MuiTablePagination-root": {
                color: "#fff", // Ensures pagination text is white
              },
              "& .MuiSvgIcon-root": {
                color: "#fff", // Ensures icons (like arrows) are white
              },
              "& .MuiDataGrid-columnSeparator": { display: "none" },
            }}
          />
        </Box>

        {/* Add Employee Dialog */}
        <Dialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Please Input Employee Information</DialogTitle>
          <DialogContent>
            <AddEmployee onEmployeeAdded={fetchEmployees} onClose={() => setOpenAddDialog(false)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)} color="primary" variant="contained" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

      {/* View Employee Modal */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} fullWidth maxWidth="md">
  <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#fff", fontWeight: "bold", textAlign: "center" }}>
    Employee Profile
  </DialogTitle>

  <DialogContent dividers>
    {selectedEmployee && (
      <Box p={3}>
        {/* Profile Section: Image and Name */}
        <Box display="flex" alignItems="center" mb={3} gap={3}>
          <Box
            sx={{
              width: 120,
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: "#B0BEC5", // Background color for the default icon
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: "#fff" }} /> {/* Profile icon */}
          </Box>
          <Box>
            <Typography variant="h3" fontWeight="bold">
              {selectedEmployee.firstname} {selectedEmployee.middlename} {selectedEmployee.lastname}
            </Typography>
            <Typography color="textSecondary" variant="h5">{selectedEmployee.jobPosition}</Typography>
          </Box>
        </Box>

        {/* Personal Information Section */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              PERSONAL INFORMATION
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Employee ID:</Typography>
                <Typography>{selectedEmployee.employeeID || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Sex:</Typography>
                <Typography>{selectedEmployee.sex || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Date of Birth:</Typography>
                <Typography>{selectedEmployee.dateOfBirth || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Civil Status:</Typography>
                <Typography>{selectedEmployee.civilStatus || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Age:</Typography>
                <Typography>{selectedEmployee.age || "N/A"}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Contact Information Section */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              CONTACT INFORMATION
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Email:</Typography>
                <Typography>{selectedEmployee.email || "N/A"}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Phone Number:</Typography>
                <Typography>{selectedEmployee.phoneNumber || "N/A"}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight="bold">Address:</Typography>
                <Typography>{selectedEmployee.address || "N/A"}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

       
        <Card sx={{ mb: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                  DOCUMENTS
                </Typography>
                {mockDocuments && mockDocuments.length > 0 ? (
                  <Grid container spacing={2}>
                    {mockDocuments.map((doc, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ boxShadow: 1, p: 2 }}>
                          <Typography fontWeight="bold">{doc.documentName}</Typography>
                          <Box mt={2}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => window.open(doc.documentUrl, '_blank')}
                              fullWidth
                            >
                              View Document
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
    )}
  </DialogContent>
  
  <DialogActions>
    <Button onClick={() => setOpenViewDialog(false)} color="primary" variant="contained" sx={{ borderRadius: "8px" }}>
      Close
    </Button>
  </DialogActions>
</Dialog>



        {/* Edit Employee Dialog */}
        <Dialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <EditEmployee
              employeeId={selectedEmployeeId}
              onEmployeeUpdated={fetchEmployees}
              onClose={() => setOpenEditDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    );
  }

      // 🔥 Styles: Placeholder turns white on hover!
      const inputStyles = {
        "& .MuiInputLabel-root": { color: "black !important" }, // Default placeholder color
        "& .MuiInputLabel-root.Mui-focused": { color: "black !important" }, // Focus color
        "& .MuiOutlinedInput-root": {
          "&:hover .MuiInputLabel-root": { color: "black !important" }, // White placeholder on hover
          "& fieldset": { borderColor: "black !important" }, // Default border color
          "&:hover fieldset": { borderColor: "black !important" }, // Border turns white on hover
          "&.Mui-focused fieldset": { borderColor: "black !important" }, // White border on focus
        },
        "& .MuiInputBase-input": { color: "black" }, // Text color white
      };


  export default EmployeeManagement;

