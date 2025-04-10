import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Stack,
  Input,
} from "@mui/material";

function RecordManagement() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/parse-document", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Something went wrong");

      setParsedData(result);
    } catch (error) {
      console.error("Error parsing document:", error);
      setParsedData(null);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Record Management
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography>Upload Employee PDF Document</Typography>
          <Input type="file" onChange={handleFileChange} />
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload and Parse"}
          </Button>

          {parsedData && (
            <Box mt={3}>
              <Typography variant="h6">Extracted Information:</Typography>
              <TextField
                label="Name"
                value={parsedData.name || ""}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={parsedData.email || ""}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Position"
                value={parsedData.position || ""}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Date of Birth"
                value={parsedData.dob || ""}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={parsedData.address || ""}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default RecordManagement;
