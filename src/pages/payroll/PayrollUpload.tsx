import React, { useState } from "react";
import { UploadCloud, XCircle } from "lucide-react";
import { 
  Box, Button, Card, CardContent, Typography, IconButton, CircularProgress 
} from "@mui/material";
import Header from "../../components/Header";

function PayrollUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const allowedFileTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      if (!allowedFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a CSV or Excel file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("payrollFile", file);

    try {
      setUploading(true);
      const response = await fetch("http://127.0.0.1:8000/api/payroll/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
        setFile(null);
      } else {
        alert(`Upload failed: ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <Box m="20px">
      <Header title="UPLOAD PAYROLL FILE" subtitle="Upload and process payroll files for salary disbursement." />

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Card sx={{ width: 400, padding: 4, boxShadow: 6 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom mb={3}>
              UPLOAD PAYROLL FILE
            </Typography>

            {/* File Upload Section */}
            <Box 
              sx={{
                border: "2px dashed #90caf9", 
                borderRadius: 2, 
                padding: 3, 
                textAlign: "center", 
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <UploadCloud size={40} color="#1e88e5" />
              <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                Click to select a file
              </Typography>
              <input 
                type="file" 
                id="fileInput" 
                hidden 
                onChange={handleFileChange} 
                accept=".csv, .xlsx" 
              />
            </Box>

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            {/* Display Selected File */}
            {file && (
              <Box 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  backgroundColor: "#e3f2fd", 
                  padding: 1.5, 
                  borderRadius: 2, 
                  mt: 2 
                }}
              >
                <Box>
                  <Typography variant="body2" color="black">{file.name}</Typography>
                  <Typography variant="caption" color="black">
                    {(file.size / 1024).toFixed(2)} KB
                  </Typography>
                </Box>
                <IconButton onClick={handleClearFile} color="error">
                  <XCircle size={20} />
                </IconButton>
              </Box>
            )}

            {/* Upload Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3, height: 45, fontWeight: 600 }}
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? <CircularProgress size={24} color="inherit" /> : "Upload File"}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default PayrollUpload;
