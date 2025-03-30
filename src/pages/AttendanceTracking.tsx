import { useState } from "react";
import { 
  AppBar, Toolbar, Typography, Button, Box, Grid, Paper, 
  TextField, useTheme 
} from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Navbar from "../components/Navbar";



function AttendanceTracking() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [showTable, setShowTable] = useState(false);


  const handleSelectEmployee = (employee) => {
    setEmployeeId(employee.id);
    setEmployeeName(employee.name);
  };

  const handleTimeIn = () => {
    if (!employeeId || !employeeName) return alert("Please enter Employee ID and Name!");

    const newRecord = {
      id: attendance.length + 1,
      name: employeeName,
      timeIn: new Date().toLocaleTimeString(),
      breakIn: null,
      breakOut: null,
      timeOut: null,
    };

    setAttendance([...attendance, newRecord]);
    setEmployeeId("");
    setEmployeeName("");
  };

  const handleBreak = (id) => {
    setAttendance(attendance.map((record) => {
      if (record.id === id) {
        if (!record.breakIn) return { ...record, breakIn: new Date().toLocaleTimeString() };
        if (!record.breakOut) return { ...record, breakOut: new Date().toLocaleTimeString() };
      }
      return record;
    }));
  };

  const handleTimeOut = (id) => {
    setAttendance(attendance.map((record) =>
      record.id === id && !record.timeOut
        ? { ...record, timeOut: new Date().toLocaleTimeString() }
        : record
    ));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Employee Name", flex: 1 },
    { field: "timeIn", headerName: "Time In", flex: 1 },
    {
      field: "breakTime",
      headerName: "Break Time",
      flex: 1,
      renderCell: (params) =>
        params.row.breakIn && params.row.breakOut
          ? `${params.row.breakIn} - ${params.row.breakOut}`
          : params.row.breakIn
          ? `${params.row.breakIn} - Pending`
          : "Not Taken",
    },
    { field: "timeOut", headerName: "Time Out", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
          <Button
            variant="contained"
            size="small"
            color="warning"
            disabled={!!params.row.breakOut}
            onClick={() => handleBreak(params.row.id)}
          >
            {params.row.breakIn ? (params.row.breakOut ? "Break Done" : "Break Out") : "Break In"}
          </Button>
          <Button
            variant="contained"
            size="small"
            color={params.row.timeOut ? "success" : "error"}
            disabled={!!params.row.timeOut}
            onClick={() => handleTimeOut(params.row.id)}
          >
            {params.row.timeOut ? "Checked Out" : "Time Out"}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden", bgcolor: "black" }}>
    <Navbar />

    {/* Full Page Watermark */}
    <Box
      component="img"
      src="/image/enhance.png"
      alt="Background"
      sx={{
        position: "absolute",
        top: "90px", // Same offset for navbar
        left: 0,
        width: "100%",
        height: "calc(100vh - 90px)",
        objectFit: "fill",
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />

    {/* Content */}
    <Box sx={{ p: 4, mt: 7, position: "relative", zIndex: 2 }}>
    <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper   
            sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: 400,
                  borderRadius: 3,
                  bgcolor: "rgba(255, 250, 250, 0.7)", // White with 70% opacity
                  color: theme.palette.text.primary,
                  textAlign: "center",
                  backdropFilter: "blur(3px)", // Adds a blur effect to enhance readability
                  border: "1px solid rgba(255, 255, 255, 0.3)"
          
                }}>
                <Typography
          variant="h3"
          textAlign="center"
          mb={1}
          fontWeight="bold"
          sx={{
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "black",
            fontFamily: '"Roboto", "Arial", sans-serif', // Change to your desired font
          }}
        >
          Attendance Form
        </Typography>
              <Typography 
                variant="body1" 
                textAlign="center" 
                color="black"
                mb={2}
              >
                Record your work hours and breaks accurately.
              </Typography>

              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                autoComplete="off"
                sx={{
                  "& .MuiInputLabel-root": { color: "black !important" },
                  "& .MuiOutlinedInput-root": {
                    fieldset: {
                      borderColor: "black !important", // Always black border
                      borderWidth: 2, // Adjust border width if needed
                    },
                  },
                  "& .MuiInputBase-input": { color: "black" },
                }}
              />
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                autoComplete="off"
                sx={{
                  "& .MuiInputLabel-root": { color: "black !important" },
                  "& .MuiOutlinedInput-root": {
                    fieldset: {
                      borderColor: "black !important", // Always black border
                      borderWidth: 2, // Adjust border width if needed
                    },
                  },
                  "& .MuiInputBase-input": { color: "black" },
                }}
              />
              <Button
              variant="contained"
              color="secondary"
              sx={{
                backgroundColor: colors.blueAccent[900],
                color: "white",
<<<<<<< HEAD
                "&:hover": { backgroundColor: colors.blueAccent[900], },
=======
                "&:hover": { backgroundColor: colors.blueAccent[900] },
>>>>>>> frontend
              }}
                onClick={handleTimeIn}
              >
                Time In
              </Button>

              <Button
                variant="contained"
                  color="secondary"
<<<<<<< HEAD
                 sx={{
                backgroundColor: colors.blueAccent[900],
                color: "white",
                "&:hover": { backgroundColor: colors.blueAccent[900], },
              }}
=======
                sx={{
                  backgroundColor: colors.blueAccent[900],
                  color: "white",
                  "&:hover": { backgroundColor: colors.blueAccent[900] },
                }}
>>>>>>> frontend
                onClick={() => setShowTable(true)}
              >
                Show Attendance Table
              </Button>
            </Paper>
          </Grid>

          {showTable && (
          <Grid item xs={12} md={8}>
            <Paper    
                  sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          height: 400,
                          bgcolor: "rgba(255, 250, 250, 0.2)", // White background with opacity
                          backdropFilter: "blur(4px)", // Blur effect
                          borderRadius: 3,
                          boxShadow: 5,
                          color: "black", // Text color
                        }}>
              <DataGrid
                rows={attendance}
                columns={columns}
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                sx={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  "& .MuiDataGrid-root": { border: "none" },
                  "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[900] },
                  "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[900] },
                }}
              />
            </Paper>
          </Grid>
        )}
        </Grid>
      </Box>
    </Box>
  );
}

export default AttendanceTracking;
