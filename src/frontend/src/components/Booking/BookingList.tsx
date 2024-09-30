import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Booking, BookingStatus } from '../../types/booking';
import { useBookings } from '../../hooks/useBookings';
import { formatDate } from '../../utils/date';
import { formatCurrency } from '../../utils/formatting';

const BookingList: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('');
  const [sortColumn, setSortColumn] = useState<keyof Booking>('startTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { bookings, loading, error } = useBookings();

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (bookings) {
      let filtered = [...bookings];

      // Apply date filters
      if (startDate) {
        filtered = filtered.filter(
          (booking) => new Date(booking.startTime) >= new Date(startDate)
        );
      }
      if (endDate) {
        filtered = filtered.filter(
          (booking) => new Date(booking.endTime) <= new Date(endDate)
        );
      }

      // Apply status filter
      if (statusFilter) {
        filtered = filtered.filter((booking) => booking.status === statusFilter);
      }

      // Apply sorting
      filtered.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      setFilteredBookings(filtered);
    }
  }, [bookings, startDate, endDate, statusFilter, sortColumn, sortDirection]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const newDate = event.target.value;
    if (type === 'start') {
      setStartDate(newDate);
    } else {
      setEndDate(newDate);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as BookingStatus | '');
  };

  const handleSort = (column: keyof Booking) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error loading bookings: {error.message}</div>;

  return (
    <div>
      <h2>Booking List</h2>
      <div>
        <TextField
          type="date"
          label="Start Date"
          value={startDate}
          onChange={(e) => handleDateChange(e, 'start')}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End Date"
          value={endDate}
          onChange={(e) => handleDateChange(e, 'end')}
          InputLabelProps={{ shrink: true }}
        />
        <Select
          value={statusFilter}
          onChange={handleStatusChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>All Statuses</em>
          </MenuItem>
          {Object.values(BookingStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('id')}>Booking ID</TableCell>
              <TableCell onClick={() => handleSort('startTime')}>Start Time</TableCell>
              <TableCell onClick={() => handleSort('endTime')}>End Time</TableCell>
              <TableCell onClick={() => handleSort('status')}>Status</TableCell>
              <TableCell onClick={() => handleSort('totalPrice')}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{formatDate(booking.startTime)}</TableCell>
                <TableCell>{formatDate(booking.endTime)}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{formatCurrency(booking.totalPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingList;
```

This implementation includes the following features:

1. Fetching bookings using the `useBookings` hook.
2. Filtering bookings by date range and status.
3. Sorting bookings by clicking on table headers.
4. Displaying bookings in a table format using Material-UI components.
5. Formatting dates and currency using utility functions.

Please note that this implementation makes some assumptions about the structure of the `Booking` type and the `BookingStatus` enum. You may need to adjust these based on your actual type definitions.

Human tasks mentioned in the JSON specification:

```typescript
// TODO: Implement proper error handling for failed API requests
// TODO: Add accessibility attributes to the table and form elements
// TODO: Optimize performance for large datasets, possibly implementing virtual scrolling
// TODO: Implement unit and integration tests for the BookingList component