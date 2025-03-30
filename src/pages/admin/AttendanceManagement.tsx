import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Header from '../../components/Header';
import AddIcon from "@mui/icons-material/Add";
import { tokens } from '../../theme';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling

// Define attendance statuses
type AttendanceStatus = 'present' | 'absent' | 'holiday';

// Define attendance data structure
type AttendanceData = {
  [date: string]: AttendanceStatus;
};

// Mock attendance data for demonstration
const attendanceData: AttendanceData = {
  '2025-03-01': 'present',
  '2025-03-02': 'absent',
  '2025-03-03': 'holiday',
  '2025-03-04': 'present',
  // Add more dates as needed
};

type AttendanceRecord = {
  id: number;
  name: string;
  date: string;
  morningTimeIn: string;
  timeOut: string;
  afternoonTimeIn: string;
  afternoonTimeOut: string;
  breakTime: string;
  breakOutTime: string;
  
};

type Employee = {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
};



const mockEmployees: Employee[] = [
  { id: 1, name: 'John Ray Escarlan', position: 'Teacher II', email: 'johnray@depedsample.com' },
 
  // Add more...
];


const mockData: AttendanceRecord[] = [
  {
    id: 1,
    name: 'John Ray Escarlan',
    date: '2025-03-16',
    morningTimeIn: '08:00 AM',
    timeOut: '05:00 PM',
    afternoonTimeIn: '01:00 PM',
    afternoonTimeOut: '05:00 PM',
    breakTime: '12:00 PM',
    breakOutTime: '01:00 PM',
  },

];






const AttendanceManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Tabs State
  const [tabIndex, setTabIndex] = useState(0); // 0 corresponds to "Daily Attendance"
  const [attendanceRecords] = useState<AttendanceRecord[]>(mockData);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
const [isCalendarOpen, setIsCalendarOpen] = useState(false);

const handleViewCalendar = (employee: Employee) => {
  setSelectedEmployee(employee);
  setIsCalendarOpen(true);
};

const handleCloseCalendar = () => {
  setIsCalendarOpen(false);
  setSelectedEmployee(null);
};

 // Function to calculate total working days and absences
 const calculateAttendanceMetrics = (data: AttendanceData) => {
  const totalDays = Object.keys(data).length;
  const absentDays = Object.values(data).filter(status => status === 'absent').length;
  return { totalDays, absentDays };
};


  // Filter records based on the selected date
  const filteredRecords = attendanceRecords.filter(
    (record) => record.date === selectedDate?.format('YYYY-MM-DD')
  );

    // Memoized attendance metrics
    const attendanceMetrics = useMemo(() => calculateAttendanceMetrics(attendanceData), []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Employee Name', flex: 1 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'morningTimeIn', headerName: 'Morning Time In', width: 130 },
    { field: 'timeOut', headerName: 'Time Out', width: 130 },
    { field: 'breakTime', headerName: 'Break In', width: 130 },
    { field: 'breakOutTime', headerName: 'Break Out', width: 130 },
  ];

  // Columns for the employee data grid
  const employeeColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'position', headerName: 'Position', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewCalendar(params.row)}
        >
          View Calendar
        </Button>
      ),
    },
  ];

  // Function to determine CSS class for each calendar tile
  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split('T')[0];
    switch (attendanceData[dateString]) {
      case 'present':
        return 'present';
      case 'absent':
        return 'absent';
      case 'holiday':
        return 'holiday';
      default:
        return '';
    }
  };


  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ATTENDANCE MANAGEMENT" subtitle="Manage Attendance Details" />

        {/* Download Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: "#fff",
            "&:hover": { backgroundColor: colors.blueAccent[500] },
            textTransform: "none",
            fontSize: "13px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            minWidth: "180px",
          }}
          startIcon={<AddIcon />}
        >
          Download Attendance Report
        </Button>
      </Box>

      {/* Tabs */}
      <Box mt={2}>
      <Tabs    value={tabIndex}
        onChange={(_, newValue: number) => setTabIndex(newValue)}
        sx={{
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
          '& .MuiTab-root': { color: '#000',  },
          '& .Mui-selected': { color: 'black',  fontWeight: 'bold', fontSize: "14px"},
          '& .MuiTabs-indicator': { backgroundColor: '#1976d2',  height: '3px', // Thicker indicator
            borderRadius: '2px', },
        }}
      >
          <Tab label="Daily Attendance" />
          <Tab label="Registered Employees" /> {/* NEW TAB */}
        </Tabs>

      </Box>

      {/* Tab Content */}
      {tabIndex === 0 && (
        <Box mt={2}>
          {/* Date Picker for Daily */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={inputStyles}
            />
          </LocalizationProvider>

          {/* Daily Attendance Table */}
          <Box mt={2} height="45vh">
            <DataGrid
              rows={filteredRecords}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              paginationModel={{ page: 0, pageSize: 10 }}
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], color: "#fff" },
                "& .MuiDataGrid-footerContainer": { backgroundColor: colors.blueAccent[700], color: "#fff" },
                "& .MuiDataGrid-columnSeparator": { display: "none" },
              }}
            />
          </Box>
        </Box>
      )}

{tabIndex === 1 && (
    <Box mt={2} height="55vh">
    <DataGrid
      rows={mockEmployees}
      columns={employeeColumns}
      pageSizeOptions={[5, 10, 20]}
      paginationModel={{ page: 0, pageSize: 10 }}
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        '& .MuiDataGrid-root': { border: 'none' },
        '& .MuiDataGrid-columnHeader': { backgroundColor: colors.blueAccent[700], color: '#fff' },
        '& .MuiDataGrid-footerContainer': { backgroundColor: colors.blueAccent[700], color: '#fff' },
        '& .MuiDataGrid-columnSeparator': { display: 'none' },
      }}
    />
  </Box>
)}


   {/* Calendar Dialog */}
   <Dialog open={isCalendarOpen} onClose={handleCloseCalendar} maxWidth="sm" fullWidth>
        <DialogTitle>
          Attendance Calendar for {selectedEmployee?.name}
        </DialogTitle>
        <DialogContent>
          {/* Attendance Metrics */}
          <Box mb={2}>
            <Typography>Total Working Days: {attendanceMetrics.totalDays}</Typography>
            <Typography>Absences: {attendanceMetrics.absentDays}</Typography>
          </Box>

          {/* Attendance Calendar */}
          <Calendar
            tileClassName={tileClassName}
          />

          {/* Legend */}
          <Box mt={2} display="flex" justifyContent="space-around">
            <Box display="flex" alignItems="center">
              <Box width={15} height={15} bgcolor="#4caf50" mr={1} />
              <Typography variant="body2">Present</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box width={15} height={15} bgcolor="#f44336" mr={1} />
              <Typography variant="body2">Absent</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Box width={15} height={15} bgcolor="#ff9800" mr={1} />
              <Typography variant="body2">Holiday</Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseCalendar} variant="contained" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

       {/* Calendar tile styling */}
       <style>
        {`
          .react-calendar__tile.present {
            background: #4caf50;
            color: white;
            border-radius: 8px;
          }
          .react-calendar__tile.absent {
            background: #f44336;
            color: white;
            border-radius: 8px;
          }
          .react-calendar__tile.holiday {
            background: #ff9800;
            color: white;
            border-radius: 8px;
          }
        `}
      </style>

    </Box>
  );
};

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

export default AttendanceManagement;
