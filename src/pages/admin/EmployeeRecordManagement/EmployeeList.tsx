import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EmployeeModal from "./EmployeeModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee data (could be from an API or local state)
    const fetchData = async () => {
      const data = await fetchEmployees(); // Replace with API call if necessary
      setEmployees(data);
    };

    fetchData();
  }, []);

  // Columns configuration for DataGrid
  const columns = [
    { field: "id", headerName: "Employee ID", width: 150 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "position", headerName: "Position", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <div>
          <Link to={`/admin/employee_profile/${params.id}`}>
            <Button>View</Button>
          </Link>
          <Button onClick={() => setSelectedEmployee(params.id)}>Edit</Button>
          <Button>Delete</Button>
        </div>
      ),
      width: 200,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={(newSelection) => setSelectedEmployee(newSelection)}
      />
      {selectedEmployee && <EmployeeModal employeeId={selectedEmployee} />}
    </div>
  );
};

export default EmployeeList;
