import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function AccountingPayrollUpload() {
    const [file, setFile] = useState<File | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const token = localStorage.getItem("token"); // Adjust based on where you store the token
        if (!token) return alert("Unauthorized: No token found");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/payroll/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        }
    };

    return (
        <Box m="20px">
            <Typography variant="h4">Upload Payroll File</Typography>
            <input type="file" accept=".xlsx,.csv" onChange={handleFileChange} />
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
        </Box>
    );
}

export default AccountingPayrollUpload;
