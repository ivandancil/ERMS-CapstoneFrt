  import { useState, useEffect, useRef } from "react";
  import { Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import { DataGrid } from "@mui/x-data-grid";
  import Header from "../../../components/Header";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import AddEmployee from "./AddEmployee";
  import EditEmployee from "./EditEmployee";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import { useSearch } from "../../../components/SearchContext";
  import ViewEmployee from "./ViewEmployee";
import { tokens } from "../../../theme";

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
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [openViewDialog, setOpenViewDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const { searchTerm } = useSearch();
    const editDialogRef = useRef<HTMLButtonElement>(null);

          const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); 

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
      {
        documentName: "Personal Data Sheet",
        // documentUrl: "http://example.com/document/certificate_of_employment.pdf"
      }
    ];


    return (
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Employee Management List" subtitle="Manage Employee Details" />

      {/* Add Employee Button */}
      <Button
        variant="contained"
          sx={{
            background: `${colors.primary[400]}`,
            color: "black",
            "&:hover": { background: `${colors.grey[900]}`, },
            textTransform: "none",
            fontSize: { xs: ".3rem", sm: ".7rem", md: ".9rem" },
            fontFamily: "Poppins",
            py: { xs: .8, sm: 1, md: 1.3 },
            width: { xs: "5rem", sm: "9rem", md: "11rem" },
          }}
        // startIcon={<AddIcon />}
        // onClick={() => setOpenAddDialog(true)}
        // ref={addDialogRef}
      >
        Create Employee
      </Button>
    </Box>

        {/* Show Error Message if API Fails */}
        {error && (
          <Typography color="error" textAlign="center" mt={2}>
            {error}
          </Typography>
        )}

        {/* Employee Table */}
           <Box
                m="20px 0 0 0"
                height="75vh"
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "outlined",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                  },
                  "& .MuiDataGrid-columnHeader": {
                   background: `${colors.primary[400]}`,
                    borderBottom: "none",
                    fontSize: { xs: ".6rem", sm: ".7rem", md: ".8rem" },
                    fontFamily: "Poppins"
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    // backgroundColor: colors.primary[400],
                    fontSize: { xs: ".5rem", sm: ".6rem", md: ".8rem" },
                    fontFamily: "Poppins"
                  },
                  "& .MuiDataGrid-footerContainer": {
                   background: `${colors.primary[400]}`,
                    borderTop: "none",
                    fontSize: { xs: ".2rem", sm: ".7rem", md: ".9rem" },
                    fontFamily: "Poppins"
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `${colors.grey[100]} !important`,
                  },
                  "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                      '@media (max-width: 900px)': {
                          '&.MuiDataGrid-columnHeader--hide, &.MuiDataGrid-cell--hide': {
                              display: 'none !important',
                          },
                      },
                  },
                }}
              >

          <DataGrid
            rows={filteredEmployees}
            columns={[
              { field: "employeeID", headerName: "Employee ID", flex: 1,  minWidth: 130,  },
              { field: "lastname", headerName: "Last Name", flex: 1,  minWidth: 120,  },
              { field: "firstname", headerName: "First Name", flex: 1,  minWidth: 120,  },
              { field: "email", headerName: "Email", flex: 1,  minWidth: 230,  },
              {
                field: "actions",
                headerName: "Actions",
                flex: 1.5,
                minWidth: 250,
                renderCell: (params) => (
                  <Box display="flex" gap={1} mt={1}>

                  {/* View Button */}
                    <Button
                        sx={{ textTransform: "none",
                          color: colors.grey[100],
                             fontSize: { xs: ".5rem", sm: ".6rem", md: ".8rem" }
                             }}
                        startIcon={<VisibilityIcon sx={{ fontSize: isSmallScreen ? '1rem' : 'inherit' }} />}
                        onClick={() => handleView(params.row)}
                      >
                        View
                    </Button>

                  {/* Edit Button */}
                    <Button
                        sx={{ textTransform: "none",
                          color: colors.grey[100],
                             fontSize: { xs: ".5rem", sm: ".6rem", md: ".8rem" }
                             }}
                        startIcon={<EditIcon sx={{ fontSize: isSmallScreen ? '1rem' : 'inherit' }} />}
                        onClick={() => {
                          setSelectedEmployeeId(params.row.id);
                          setOpenEditDialog(true);
                        }}
                        ref={editDialogRef}
                      >
                        Edit
                    </Button>

                  {/* Delete Button */}
                    <Button
                        sx={{
                          textTransform: "none",
                          fontSize: { xs: ".5rem", sm: ".6rem", md: ".8rem" },
                          backgroundColor: "primary", 
                          "&:hover": { backgroundColor: "primary" },
                        }}
                      startIcon={<DeleteIcon sx={{ fontSize: isSmallScreen ? '1rem' : 'inherit' }} />}
                      color="error"
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
          
          />
        </Box>

        {/* Add Employee Dialog */}
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
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

        {/* View Employee Dialog */}
        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} fullWidth maxWidth="md">
          <DialogTitle>View Employee Information</DialogTitle>
          <DialogContent>
            <ViewEmployee open={openViewDialog} onClose={() => setOpenViewDialog(false)} employee={selectedEmployee} documents={mockDocuments} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)} color="primary" variant="contained" autoFocus >
                Close
              </Button>
            </DialogActions>
          </Dialog>


        {/* Edit Employee Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm" >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            <EditEmployee employeeId={selectedEmployeeId} onEmployeeUpdated={fetchEmployees} onClose={() => setOpenEditDialog(false)} />
          </DialogContent>
        </Dialog>
      </Box>
    );
  }
  
export default EmployeeManagement;

