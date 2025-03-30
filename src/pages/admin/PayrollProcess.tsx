import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, useTheme, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import * as XLSX from "xlsx";


type Payroll = {
    id: number;
    file_name: string;
    file_path: string;
    status: string;
    created_at: string;
    updated_at: string;
};


const AdminPayrollProcessing = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [payrolls, setPayrolls] = useState<Payroll[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);

    const [open, setOpen] = useState(false); // ✅ Ensure state is correctly initialized
    const [excelData, setExcelData] = useState<string>(""); // ✅ Now accepts HTML string


    const handleView = async (fileName: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/storage/payrolls/${fileName}`);
            if (!response.ok) throw new Error("Failed to fetch file.");

            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const htmlTable = XLSX.utils.sheet_to_html(sheet);

                setExcelData(htmlTable);
                setOpen(true); // Open dialog
            };
            reader.readAsArrayBuffer(blob);
        } catch (error) {
            console.error("Error fetching payroll file:", error);
            alert("Error opening payroll file.");
        }
    };

    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://127.0.0.1:8000/api/payroll/pending", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch payrolls");
                }

                const data: Payroll[] = await response.json();
                setPayrolls(data);
                console.log("Payroll API Response:", data); // Log the response
            } catch (error) {
                console.error("Error fetching payrolls:", error);
            }
        };

        fetchPayrolls();
    }, []);

    const updateStatus = async (id: number, newStatus: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/payroll/update-status/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update payroll status");
            }

            setPayrolls((prev) =>
                prev.map((payroll) =>
                    payroll.id === id ? { ...payroll, status: newStatus } : payroll
                )
            );
        } catch (error) {
            console.error("Error updating payroll status:", error);
        }
    };
    

    const columns: GridColDef[] = [
        { 
            field: "file_name", 
            headerName: "Payroll File", 
            flex: 1,
            renderCell: (params) => <Typography mt={2}>{params.row.file_name}</Typography>
        },
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box display="flex" gap={1} mt={1}>
                   <Button onClick={() => handleView("YhBKcQyjkrknqwuycvHmkV9cOABwIELjWX2ewitJ.xlsx")} variant="contained">
                View Payroll File
            </Button>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => updateStatus(params.row.id, "Deploy")}
                    >
                        Send to Employees
                    </Button>
                </Box>
            ),
        },
    ];

    
    return (
        <Box m="20px">
            <Header title="PAYROLL APPROVAL" subtitle="Review and approve payroll files" />
            <Box mt={3} height="55vh">
                <DataGrid
                    rows={payrolls}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    sx={{
                        borderRadius: "8px",
                        overflow: "hidden",
                        "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700] },
                        "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700] },
                    }}
                />
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Payroll File Preview</DialogTitle>
                <DialogContent>
                    <div dangerouslySetInnerHTML={{ __html: excelData }} />
                </DialogContent>
            </Dialog>

        </Box>
    );
};

export default AdminPayrollProcessing;
