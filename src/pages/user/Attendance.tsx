import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

// Interface for Attendance Records
interface AttendanceRecord {
  date: string;
  status: string;
  timeIn: string;
  timeOut: string;
  overtime: string;
}

function Attendance() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isClockedIn, setIsClockedIn] = useState<boolean>(false);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [currentTimeIn, setCurrentTimeIn] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("March"); // Default month

  // Get formatted time (HH:MM AM/PM)
  function getCurrentTime(): string {
    return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  }

  // Get today's date (March 9, 2025)
  function getCurrentDate(): string {
    return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  // Handle Clock In / Clock Out
  function handleClock() {
    if (!isClockedIn) {
      // Clock In
      const timeIn = getCurrentTime();
      setCurrentTimeIn(timeIn);
      setIsClockedIn(true);
    } else {
      // Clock Out
      const timeOut = getCurrentTime();
      const timeIn = currentTimeIn || getCurrentTime();
      const overtime = calculateOvertime(timeIn, timeOut);

      // Add new attendance record
      setAttendanceRecords((prev) => [
        { date: getCurrentDate(), status: "Present", timeIn, timeOut, overtime },
        ...prev,
      ]);

      setIsClockedIn(false);
      setCurrentTimeIn(null);
    }
  }

  // Calculate overtime (if >8 hours)
  function calculateOvertime(timeIn: string, timeOut: string): string {
    const [inHours, inMinutes, inPeriod] = parseTime(timeIn);
    const [outHours, outMinutes, outPeriod] = parseTime(timeOut);

    let in24 = convertTo24Hour(inHours, inPeriod);
    let out24 = convertTo24Hour(outHours, outPeriod);

    let totalMinutes = (out24 * 60 + outMinutes) - (in24 * 60 + inMinutes);
    let overtimeMinutes = totalMinutes - 8 * 60; // Overtime if >8 hours

    return overtimeMinutes > 0 ? `${Math.floor(overtimeMinutes / 60)}h ${overtimeMinutes % 60}m` : "-";
  }

  // Convert "8:00 AM" -> [8, 0, "AM"]
  function parseTime(time: string): [number, number, string] {
    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);
    return [hours, minutes, period];
  }

  // Convert 12-hour time to 24-hour format
  function convertTo24Hour(hours: number, period: string): number {
    if (period === "PM" && hours !== 12) return hours + 12;
    if (period === "AM" && hours === 12) return 0;
    return hours;
  }

  // Filter records by selected month
  function filterRecordsByMonth(records: AttendanceRecord[], month: string): AttendanceRecord[] {
    return records.filter((record) => {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.toLocaleString("en-US", { month: "long" });
      return recordMonth === month;
    });
  }

  // Handle month change
  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMonth(event.target.value as string);
  };

  // Example attendance records (You can replace this with actual data)
  useEffect(() => {
    // Example of hardcoded records
    setAttendanceRecords([
      {
        date: "March 1, 2025",
        status: "Present",
        timeIn: "8:00 AM",
        timeOut: "5:00 PM",
        overtime: "1h 30m",
      },
      {
        date: "March 2, 2025",
        status: "Present",
        timeIn: "9:00 AM",
        timeOut: "6:00 PM",
        overtime: "0h 45m",
      },
      {
        date: "April 5, 2025",
        status: "Present",
        timeIn: "7:30 AM",
        timeOut: "4:30 PM",
        overtime: "-",
      },
    ]);
  }, []);

  return (
    <Box m="20px">
      {/* Page Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ATTENDANCE" subtitle="View your attendance records" />
      </Box>

      {/* Month Filter */}
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ mr: 2 }}>Select Month:</Typography>
        <FormControl fullWidth>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "5px",
              borderColor: "white",
              color: "white",
            }}
          >
            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Attendance Records Table */}
      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: colors.primary[400],
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: colors.blueAccent[700] }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Date</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              <TableCell sx={{ color: "white" }}>Time In</TableCell>
              <TableCell sx={{ color: "white" }}>Time Out</TableCell>
              <TableCell sx={{ color: "white" }}>Overtime</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRecordsByMonth(attendanceRecords, selectedMonth).map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: "white" }}>{row.date}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.status}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.timeIn}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.timeOut}</TableCell>
                <TableCell sx={{ color: "white" }}>{row.overtime}</TableCell>
              </TableRow>
            ))}
            {attendanceRecords.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: "white" }}>
                  No attendance records for {selectedMonth}.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Attendance;
