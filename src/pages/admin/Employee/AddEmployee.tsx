import { Box, TextField, Button, Typography, useTheme, Snackbar, Alert, Autocomplete, MenuItem, Grid, FormControl, InputLabel, Select } from "@mui/material";
import { useState, useCallback } from "react";

interface AddEmployeeProps {
  onEmployeeAdded: () => void;
  onClose: () => void;
}

const civilStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const jobPositions = ["Teacher", "Admin Officer", "HR Manager", "Finance Officer"];


function AddEmployee({ onEmployeeAdded, onClose }: AddEmployeeProps) {
  const theme = useTheme();
  const [employeeID, setEmployeeID] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [sex, setSex] = useState("");
  const [dateOfBirth, setDateofBirth] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddEmployee = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!employeeID || !lastname || !firstname || !middlename || !sex || !dateOfBirth || !civilStatus || !jobPosition || !phoneNumber || !email || !address) {
      setError("All fields are required.");
      setLoading(false);  // Ensure loading resets
      return;
    }

    if (!/^(09|\+639)\d{9}$/.test(phoneNumber)) {
      setError("Invalid phone number format. Use 09XXXXXXXXX or +639XXXXXXXXX.");
      setLoading(false);
      return;
    }


    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ employeeID, lastname, firstname, middlename, sex, dateOfBirth, civilStatus, phoneNumber, email, address, jobPosition }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add employee");
      }

      setSuccess(true);
      onEmployeeAdded();
      onClose();

      // Clear form
      setEmployeeID(""); setLastname(""); setFirstname(""); setMiddlename("");
      setSex(""); setDateofBirth(""); setCivilStatus(""); setPhoneNumber("");
      setEmail(""); setAddress(""); setJobPosition("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [employeeID, lastname, firstname, middlename, sex, dateOfBirth, civilStatus, phoneNumber, email, address, jobPosition, onEmployeeAdded, onClose]);

  return (
    <form onSubmit={handleAddEmployee}>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12} md={6}>
          <TextField label="Employee ID" fullWidth value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField label="Job Position" fullWidth value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid> */}
         <Grid item xs={12} md={6} sx={inputStyles}>
          <TextField
              select
              label="Job Position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Teacher I">Teacher I</MenuItem>
              <MenuItem value="Teacher II">Teacher II</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </TextField>

        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Last Name" fullWidth value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="First Name" fullWidth value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Middle Name" fullWidth value={middlename} onChange={(e) => setMiddlename(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={6} sx={inputStyles}>
         <TextField
              select
              label="Sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              fullWidth
              variant="outlined"
            >
               <MenuItem value="Male">Male</MenuItem>
               <MenuItem value="Female">Female</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Date of Birth" fullWidth type="date" value={dateOfBirth} onChange={(e) => setDateofBirth(e.target.value)} autoComplete="off" InputLabelProps={{ shrink: true }} sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={6} sx={inputStyles}>
           <TextField
              select
              label="Civil Status"
              value={civilStatus}
              onChange={(e) => setCivilStatus(e.target.value)}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
              <MenuItem value="Divorced">Divorced</MenuItem>
              <MenuItem value="Widowed">Widowed</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Phone Number" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Address" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="off" sx={inputStyles} />
        </Grid>
      </Grid>

      {error && <Typography color="error" mt={1}>{error}</Typography>}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Employee added successfully!
        </Alert>
      </Snackbar>
    </form>
  );
}

// Styles: Placeholder turns white on hover!
const inputStyles = {
  "& .MuiInputLabel-root": { color: "black !important" },
  "& .MuiInputLabel-root.Mui-focused": { color: "black !important" },
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiInputLabel-root": { color: "black !important" },
    "& fieldset": { borderColor: "black !important" },
    "&:hover fieldset": { borderColor: "black !important" },
    "&.Mui-focused fieldset": { borderColor: "black !important" },
  },
  "& .MuiInputBase-input": { color: "black" },
};

export default AddEmployee;
