import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../theme";
import Header from "../../components/Header";

function DocumentManagement() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Employee Handbook.pdf",
      type: "PDF",
      uploadedBy: "HR Admin",
      date: "2024-03-12",
      category: "Common",
    },
    {
      id: 2,
      name: "Company Policies.docx",
      type: "Word",
      uploadedBy: "HR Admin",
      date: "2024-03-10",
      category: "Common",
    },
    {
      id: 3,
      name: "Personal Development Plan.pdf",
      type: "PDF",
      uploadedBy: "John Ray Escarlan",
      date: "2024-03-15",
      category: "Personal",
    },
  ]);

  const [currentTab, setCurrentTab] = useState("Common");

  const fileInputRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const deleteDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newDocuments = Array.from(files).map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      type: file.type.split("/")[1].toUpperCase(),
      uploadedBy: "Current User", // Replace with actual user data
      date: new Date().toISOString().split("T")[0],
      category: currentTab,
    }));
    setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
    event.target.value = null; // Reset the input
  };

  const columns = [
    { field: "name", headerName: "Document Name", flex: 2 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    { field: "date", headerName: "Upload Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => deleteDocument(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const filteredDocuments = documents.filter(
    (doc) => doc.category === currentTab
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DOCUMENT MANAGEMENT" subtitle="Organize and Access Your Files Efficiently" />
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: "#fff",
            "&:hover": { backgroundColor: colors.blueAccent[500] },
            mr: 5,
            textTransform: "none",
            fontSize: "13px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            minWidth: "180px",
          }}
          startIcon={<AddIcon />}
          onClick={handleUploadClick}
        >
          Upload Documents
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
      </Box>

      <Tabs
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            '& .MuiTab-root': { color: '#000',  },
            '& .Mui-selected': { color: 'black',  fontWeight: 'bold', fontSize: "14px"},
            '& .MuiTabs-indicator': { backgroundColor: '#1976d2',  height: '3px', // Thicker indicator
              borderRadius: '2px', },
          }}
        >
          <Tab value="Common" label="Common Files" />
          <Tab value="Personal" label="Personal Files" />
        </Tabs>

      <Paper elevation={3} sx={{ p: 3 }}>
      
        <Box height="55vh">
          <DataGrid
            rows={filteredDocuments}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            sx={{
              borderRadius: "8px",
              overflow: "hidden",
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                color: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: colors.blueAccent[700],
                color: "#fff",
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default DocumentManagement;
