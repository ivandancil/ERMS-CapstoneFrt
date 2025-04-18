import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const RecordListTable = () => {
  // Sample records data
  const [records, setRecords] = useState([
    { id: 1, name: 'John Doe', position: 'Developer', status: 'Active', date: '2025-04-01' },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', status: 'Inactive', date: '2025-03-25' },
    { id: 3, name: 'Mark Johnson', position: 'Designer', status: 'Active', date: '2025-04-05' },
    // Add more records as necessary
  ]);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small" style={{ marginRight: '10px' }}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" size="small">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3>Record List</h3>
      <DataGrid
        rows={records}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default RecordListTable;
