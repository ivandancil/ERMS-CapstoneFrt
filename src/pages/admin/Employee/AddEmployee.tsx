import { Box, TextField, Button, Typography, useTheme, Snackbar, Alert } from "@mui/material";
import { useState, useCallback } from "react";

interface AddEmployeeProps {
  onEmployeeAdded: () => void;
  onClose: () => void;
}

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
      <TextField label="Employee ID" fullWidth margin="normal" value={employeeID} onChange={(e) => setEmployeeID(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Job Position" fullWidth margin="normal" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Last Name" fullWidth margin="normal" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="First Name" fullWidth margin="normal" value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Middle Name" fullWidth margin="normal" value={middlename} onChange={(e) => setMiddlename(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Sex" fullWidth margin="normal" value={sex} onChange={(e) => setSex(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Date of Birth" fullWidth margin="normal" type="date" value={dateOfBirth} onChange={(e) => setDateofBirth(e.target.value)} autoComplete="off" sx={inputStyles} InputLabelProps={{ shrink: true }} />
      <TextField label="Civil Status" fullWidth margin="normal" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Phone Number" fullWidth margin="normal" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" sx={inputStyles} />
      <TextField label="Address" fullWidth margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="off" sx={inputStyles} />
    

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
  "& .MuiInputLabel-root": { color: "#ccc !important" },
  "& .MuiInputLabel-root.Mui-focused": { color: "white !important" },
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiInputLabel-root": { color: "white !important" },
    "& fieldset": { borderColor: "#ccc !important" },
    "&:hover fieldset": { borderColor: "white !important" },
    "&.Mui-focused fieldset": { borderColor: "white !important" },
  },
  "& .MuiInputBase-input": { color: "white" },
};

export default AddEmployee;
