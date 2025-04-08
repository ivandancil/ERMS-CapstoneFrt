import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { blue } from "@mui/material/colors";

// Define Employee Type
interface Employee {
  id: number;
  employeeID: string;
  jobPosition: string;
  lastname: string;
  firstname: string;
  middlename?: string; // Optional
  sex: string;
  dateOfBirth: string; // Assuming date is in string format (e.g., "YYYY-MM-DD")
  civilStatus: string;
  phoneNumber: string;
  email: string;
  address: string;
}


function EmployeeProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

   // Handle Tab Change
   function handleTabChange(event: React.SyntheticEvent, newValue: number) {
    setTabIndex(newValue);
  }

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from storage

    fetch("http://127.0.0.1:8000/api/employee", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Send token in headers
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Employee Data:", data); // Debugging
        setEmployee(data.employee); // ✅ Access the 'employee' key
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <Box m="20px">
    {/* Page Header */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="EMPLOYEE PROFILE" subtitle="Detailed Employee Information" />
      {/* <Button
        variant="contained"
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: "#fff",
          "&:hover": { backgroundColor: colors.blueAccent[500] },
        }}
        onClick={handleOpen}
      >
        Edit Profile
      </Button> */}
    </Box>

    {/* <Paper elevation={3} sx={{ p: 3, mt: 2, width: "100%", borderRadius: "10px" }}> */}
        <Grid container spacing={3} mt={2}>
          {/* Profile Picture */}
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center">
            <Box position="relative">
            <Avatar 
                sx={{ width: 100, height: 100, mx: "auto" }} 
              />

              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  backgroundColor: colors.blueAccent[700],
                  color: "white",
                  boxShadow: 2,
                  "&:hover": { backgroundColor: colors.blueAccent[500] },
                }}
              >
                <CameraAltIcon />
               
              </IconButton>
            </Box>
          </Grid>

          
          {/* Profile Details */}
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h5"
              sx={{
               fontWeight: "bold",
               fontSize: "1.9rem",
              }}
            >
              {employee?.firstname} {employee?.lastname}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem", color: "gray" }}>
              Employee ID: <strong>{employee?.employeeID || "N/A"}</strong>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1rem", color: "gray" }}>
              Job Position: <strong>{employee?.jobPosition || "Not Assigned"}</strong>
            </Typography>


          
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Tabs for Sections */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          sx={{
            backgroundColor: "white", // Background color for tabs
            "& .MuiTab-root": {
              color: "black",
              fontWeight: "bold" // Set text color to white
            },
            "& .Mui-selected": {
              color: "black", // Change selected tab color (Gold for visibility)
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="Personal Details" />
        
          <Tab label="Emergency Contact" />
        </Tabs>


        {/* Tab Content */}
        <Box mt={2}>
          {tabIndex === 0 && (
             <TableContainer  sx={{ maxHeight: "400px", overflow: "auto", boxShadow: 3 }}>
            <Table stickyHeader>
                      <TableBody>
                  {[
                    ["Employee ID", employee?.employeeID],
                    ["Job Position", employee?.jobPosition],
                    ["Last Name", employee?.lastname],
                    ["First Name", employee?.firstname],
                    ["Middle Name", employee?.middlename],
                    ["Sex", employee?.sex],
                    ["Date of Birth", employee?.dateOfBirth],
                    ["Civil Status", employee?.civilStatus],
                    ["Phone Number", employee?.phoneNumber],
                    ["Email", employee?.email],
                    ["Address", employee?.address],
                  
                  ].map(([label, value]) => (
                    <TableRow key={label} sx={{ "&:hover": { backgroundColor: colors.grey[700] } }}>
                      <TableCell sx={{ fontWeight: "bold" }}>{label}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

        
          {tabIndex === 1 && (
            <TableContainer sx={{ boxShadow: 3 }}>
              <Table>
                <TableBody>
                  <TableRow sx={{ "&:hover": { backgroundColor: colors.grey[700] } }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Contact Name</TableCell>
                    {/* <TableCell>{employee.emergencyContactName}</TableCell> */}
                  </TableRow>
                  <TableRow sx={{ "&:hover": { backgroundColor: colors.grey[700] } }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Contact Number</TableCell>
                    {/* <TableCell>{employee.emergencyContactNumber}</TableCell> */}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        
      {/* </Paper> */}

    </Box>
  );
}

export default EmployeeProfile;