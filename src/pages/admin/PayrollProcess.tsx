import { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

interface Payroll {
    id: number;
    file: string;
    status: string;
}

const AdminPayrollProcessing = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [payrolls, setPayrolls] = useState<Payroll[]>([]);
    const [selectedPayroll, setSelectedPayroll] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState(false);

    // ✅ Fetch Payroll Data from API
    useEffect(() => {
        const fetchPayrolls = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the Bearer token

                const response = await fetch("http://127.0.0.1:8000/api/payroll/pending", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add Bearer token
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch payrolls");
                }

                const data: Payroll[] = await response.json();
                setPayrolls(data);
            } catch (error) {
                console.error("Error fetching payrolls:", error);
            }
        };

        fetchPayrolls();
    }, []);

    // ✅ Function to Approve/Reject Payroll
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

            // Update state after successful API call
            setPayrolls((prev) =>
                prev.map((payroll) =>
                    payroll.id === id ? { ...payroll, status: newStatus } : payroll
                )
            );
        } catch (error) {
            console.error("Error updating payroll status:", error);
        }
    };

    // ✅ Define DataGrid Columns
    const columns: GridColDef[] = [
        { 
            field: "file_name", 
            headerName: "Payroll File", 
            flex: 1,
            renderCell: (params) => <Typography>{params.row.file_name}</Typography>
        },
        // { 
        //     field: "file_path", 
        //     headerName: "Payroll File", 
        //     flex: 1,
        //     renderCell: (params) => {
        //         const filename = params.row.file_path.split("/").pop(); // Extract filename
        //         return <Typography>{filename}</Typography>;
        //     }
        // },
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <Box display="flex" gap={1}>
                    <Button variant="contained" color="success" onClick={() => updateStatus(params.row.id, "Approved")}>
                        Send to Employees
                    </Button>
                    <Button variant="contained" color="error" onClick={() => updateStatus(params.row.id, "Rejected")}>
                        Reject
                    </Button>
                </Box>
            ),
        },
    ];
    

    return (
        <Box m="20px">
            <Header title="PAYROLL APPROVAL" subtitle="Review and approve payroll files" />

            {/* Payroll Table */}
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
        </Box>
    );
};

export default AdminPayrollProcessing;
