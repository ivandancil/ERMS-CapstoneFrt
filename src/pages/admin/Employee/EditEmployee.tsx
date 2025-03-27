import { useState, useEffect } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

interface EditEmployeeProps {
  employeeId: number | null;
  onEmployeeUpdated: () => void;
  onClose: () => void;
}

function EditEmployee({ employeeId, onEmployeeUpdated, onClose }: EditEmployeeProps) {
  const [employeeData, setEmployeeData] = useState({
    employeeID: "",
    jobPosition: "",
    lastname: "",
    firstname: "",
    middlename: "",
    sex: "",
    dateOfBirth: "",
    civilStatus: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!employeeId) {
      console.warn("No employeeId provided, skipping fetch.");
      return;
    }

    // Edit Function
    async function fetchEmployee() {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        console.log(`Fetching employee with ID: ${employeeId}`);

        const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch employee. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Check if API response contains the expected data
        const employee = data.data || data; // Adjust based on actual response structure

        if (!employee) {
          throw new Error("Invalid employee data received.");
        }

        setEmployeeData({
          employeeID: employee.employeeID || "",
          jobPosition: employee.jobPosition || "",
          lastname: employee.lastname || "",
          firstname: employee.firstname || "",
          middlename: employee.middlename || "",
          sex: employee.sex || "",
          dateOfBirth: employee.dateOfBirth || "",
          civilStatus: employee.civilStatus || "",
          phoneNumber: employee.phoneNumber || "",
          email: employee.email || "",
          address: employee.address || "",
        });

        console.log("Employee data set:", employee);
      } catch (err: any) {
        console.error("Error fetching employee:", err.message);
        setError(err.message || "Error loading employee data.");
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [employeeId]); // Dependency on `employeeId` ensures re-fetching when ID changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  //Update Function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      console.log("Updating employee:", employeeData);

      const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employeeID: employeeData.employeeID,
          jobPosition: employeeData.jobPosition,
          lastname: employeeData.lastname,
          firstname: employeeData.firstname,
          middlename: employeeData.middlename,
          sex: employeeData.sex,
          dateOfBirth: employeeData.dateOfBirth,
          civilStatus: employeeData.civilStatus,
          phoneNumber: employeeData.phoneNumber,
          email: employeeData.email,
          address: employeeData.address,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update employee. Status: ${response.status}`);
      }

      alert("Employee updated successfully.");
      onEmployeeUpdated();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
         <TextField
            label="Employee ID"
            name="employeeID"
            disabled
            value={employeeData.employeeID}
            fullWidth
            required
            sx={{
              mt: 2, 
              ...inputStyles 
            }}
          />
            <TextField
            label="Job Position"
            name="jobPosition"
            value={employeeData.jobPosition}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />      

          <TextField
            label="Last Name"
            name="lastname"
            value={employeeData.lastname}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
          <TextField
            label="First Name"
            name="firstname"
            value={employeeData.firstname}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
            <TextField
            label="Middle Name"
            name="middlename"
            value={employeeData.middlename}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
           <TextField
            label="Sex"
            name="sex"
            value={employeeData.sex}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
           <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={employeeData.dateOfBirth}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
           <TextField
            label="Civil Status"
            name="civilStatus"
            value={employeeData.civilStatus}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
          
          {/* <TextField
            label="Age"
            name="age"
            value={employeeData.age}
            onChange={handleChange}
            type="number"
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          /> */}
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={employeeData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />
          <TextField
            label="Email"
            name="email"
            disabled
            value={employeeData.email}
            onChange={handleChange}
            type="email"
            fullWidth
            required
            sx={{
              ...inputStyles 
            }}
          />
          <TextField
            label="Address"
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            fullWidth
            required
            autoComplete="off"
            sx={{
              ...inputStyles 
            }}
          />

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Saving..." : "Update Employee"}
            </Button>
          </Box>
        </>
      )}
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

export default EditEmployee;
