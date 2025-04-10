  import React, { useState, useEffect, useRef } from "react";
  import {
    Box,
    Button,
    Typography,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
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


    return (
      <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
    <Header title="EMPLOYEE MANAGEMENT LIST" subtitle="Manage Employee Details" />

    {/* Add Employee Button */}
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
              { field: "email", headerName: "Email", flex: 1.5 },
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
              "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], color: "#fff" },
              "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700], color: "#fff" },
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
          <DialogTitle>Please Input Employee Details</DialogTitle>
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
        <DialogTitle
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Employee Details
        </DialogTitle>

        <DialogContent dividers>
          {selectedEmployee ? (
            <Box p={2}>
              <Grid container spacing={2}>
                {/* Row 1: Employee ID & Sex */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Employee ID" value={selectedEmployee.employeeID || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Sex" value={selectedEmployee.sex || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}}/>
                </Grid>

                {/* Row 2: Job Position & Date of Birth */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Job Position" value={selectedEmployee.jobPosition || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Date of Birth" value={selectedEmployee.dateOfBirth || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>

                {/* Row 3: Last Name & Civil Status */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" value={selectedEmployee.lastname || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Civil Status" value={selectedEmployee.civilStatus || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>

                {/* Row 4: First Name & Phone */}
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" value={selectedEmployee.firstname || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Phone" value={selectedEmployee.phoneNumber || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>

                {/* Row 5: Middle Name (if available) & Email */}
                <Grid item xs={6}>
                  <TextField fullWidth label="Middle Name" value={selectedEmployee.middlename || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}}/>
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Email" value={selectedEmployee.email || "N/A"} variant="outlined" InputProps={{ readOnly: true }} sx={{...inputStyles}} />
                </Grid>

                {/* Row 6: Address (Full Width) */}
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" value={selectedEmployee.address || "N/A"} variant="outlined" InputProps={{ readOnly: true }} multiline rows={2} sx={{...inputStyles}}/>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography color="error" textAlign="center">
              No employee details available.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)} color="primary" variant="contained">
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


  export default EmployeeManagement;

