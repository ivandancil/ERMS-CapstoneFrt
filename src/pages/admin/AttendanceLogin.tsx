import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const AttendanceLogin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (employeeId.trim() === "") {
      setError("Employee ID is required!");
      return;
    }

    // Simulating API call for attendance check-in
    console.log(`Employee ID ${employeeId} marked as Present.`);
    
    // Navigate back to the Attendance Management page after login
    navigate("/attendance-management");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" color={colors.grey[100]} mb={2}>
        Employee Attendance Login
      </Typography>

      <TextField
        label="Employee ID"
        variant="outlined"
        fullWidth
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />
      {error && <Typography color="error">{error}</Typography>}

      <Button
        variant="contained"
        color="success"
        onClick={handleLogin}
        sx={{ mt: 2 }}
      >
        Mark Attendance
      </Button>
    </Box>
  );
};

export default AttendanceLogin;
