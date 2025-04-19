import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";

interface Document {
  id: number;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
  category: string;
}

function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentTab, setCurrentTab] = useState("Common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [scanTargetDocId, setScanTargetDocId] = useState<number | null>(null);


  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const deleteDocument = (id: number) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

      const newDocuments: Document[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.split("/")[1]?.toUpperCase() || "FILE",
        uploadedBy: "Current User",
        date: new Date().toISOString().split("T")[0],
        category: currentTab,
      }));

      setDocuments((prevDocs) => [...prevDocs, ...newDocuments]);
      event.target.value = "";
  };

  const handleScanChange = async (
    event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        const formData = new FormData();
        formData.append("document", file);
        formData.append("category", currentTab);
        if (scanTargetDocId) {
          formData.append("linked_doc_id", scanTargetDocId.toString());
    }


    // Fetch API to upload the scanned document
    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-document", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Scan uploaded successfully!");
        fetchDocuments();
      } else {
        alert("Failed to upload scanned document.");
      }
        } catch (error) {
          console.error("Scan error:", error);
          alert("Error occurred during scan upload.");
        }

        event.target.value = "";
      };

  // Fetch uploaded documents from API on mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/documents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        const mappedData: Document[] = data.map((doc: any) => ({
          id: doc.id,
          name: doc.original_name,
          type: doc.type?.toUpperCase() || "FILE",
          uploadedBy: doc.uploaded_by || "Admin",
          date: doc.uploaded_at?.split("T")[0] || "",
          category: doc.category || "Common",
        }));

        setDocuments(mappedData);
      } else {
        console.error("Failed to fetch documents");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Document Name", flex: 2 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "uploadedBy", headerName: "Uploaded By", flex: 1 },
    { field: "date", headerName: "Upload Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" gap={1} mt={1}>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setScanTargetDocId(params.row.id);
              cameraInputRef.current?.click();
            }}
                      >
            Download
          </Button>
         
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setScanTargetDocId(params.row.id);
              cameraInputRef.current?.click(); 
            }}
                      >
            Scan Document
          </Button>
        </Box>
      ),
    },
  ];

  const filteredDocuments = documents.filter(
    (doc) => doc.category === currentTab
  );

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="DOCUMENT MANAGEMENT"
          subtitle="Organize and Access Your Files Efficiently"
        />
      
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          multiple
        />
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={cameraInputRef}
          style={{ display: "none" }}
          onChange={handleScanChange}
        />
      </Box>

      <Tabs
        value={currentTab}
        onChange={handleTabChange}
          sx={{
            fontWeight: "bold",
            backgroundColor: "white",
            "& .MuiTab-root": { color: "#000" },
            "& .Mui-selected": {
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#1976d2",
              height: "3px",
              borderRadius: "2px",
            },
          }}
      >
        <Tab value="Common" label="Uploaded Files by HR" />
      </Tabs>

      <Box height="55vh" mt={2}>
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
                backgroundColor: "black",
                color: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "black",
                color: "#fff",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnSeparator": { display: "none" },
            }}
        />
      </Box>
    </Box>
  );
}

export default DocumentManagement;
