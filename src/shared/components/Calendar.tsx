import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Booking, IceSlot } from '../types';
import { formatDate, parseISODate, isOverlapping } from '../utils/dateTime';

// Styled components
const CalendarContainer = styled.div`
  // Add styles for the calendar container
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
`;

const DateCell = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#e0e0e0' : 'white')};
  &:hover {
    background-color: #f0f0f0;
  }
`;

const TimeSlotsContainer = styled.div`
  margin-top: 20px;
`;

interface CalendarProps {
  onSelectSlot: (slot: IceSlot) => void;
  bookings: Booking[];
}

export const Calendar: React.FC<CalendarProps> = ({ onSelectSlot, bookings }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month');
  const [visibleTimeSlots, setVisibleTimeSlots] = useState<IceSlot[]>([]);

  const fetchTimeSlots = useCallback(async (date: Date) => {
    // TODO: Implement API call to fetch time slots for the selected date
    // This is a placeholder implementation
    const slots: IceSlot[] = [
      { id: '1', startTime: new Date(date.setHours(9, 0, 0, 0)), endTime: new Date(date.setHours(10, 0, 0, 0)) },
      { id: '2', startTime: new Date(date.setHours(10, 0, 0, 0)), endTime: new Date(date.setHours(11, 0, 0, 0)) },
      // Add more slots as needed
    ];
    setVisibleTimeSlots(slots);
  }, []);

  useEffect(() => {
    fetchTimeSlots(selectedDate);
  }, [selectedDate, fetchTimeSlots]);

  const generateCalendarGrid = (currentDate: Date): Date[][] => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const calendarGrid: Date[][] = [];
    let currentWeek: Date[] = [];

    while (startDate <= lastDayOfMonth) {
      currentWeek.push(new Date(startDate));
      if (currentWeek.length === 7) {
        calendarGrid.push(currentWeek);
        currentWeek = [];
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      calendarGrid.push(currentWeek);
    }

    return calendarGrid;
  };

  const renderDateCell = (date: Date, isSelected: boolean, onSelect: (date: Date) => void) => (
    <DateCell key={date.toISOString()} isSelected={isSelected} onClick={() => onSelect(date)}>
      {formatDate(date, 'D')}
    </DateCell>
  );

  const renderTimeSlots = (slots: IceSlot[], onBookSlot: (slot: IceSlot) => void) => {
    const sortedSlots = slots.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    const groupedSlots: { [hour: string]: IceSlot[] } = {};

    sortedSlots.forEach((slot) => {
      const hour = slot.startTime.getHours();
      if (!groupedSlots[hour]) {
        groupedSlots[hour] = [];
      }
      groupedSlots[hour].push(slot);
    });

    return (
      <TimeSlotsContainer>
        {Object.entries(groupedSlots).map(([hour, hourSlots]) => (
          <div key={hour}>
            <h3>{`${hour}:00`}</h3>
            {hourSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onBookSlot(slot)}
                disabled={bookings.some((booking) => isOverlapping(booking, slot))}
              >
                {`${formatDate(slot.startTime, 'HH:mm')} - ${formatDate(slot.endTime, 'HH:mm')}`}
              </button>
            ))}
          </div>
        ))}
      </TimeSlotsContainer>
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setViewMode('day');
  };

  return (
    <CalendarContainer>
      {viewMode === 'month' && (
        <CalendarGrid>
          {generateCalendarGrid(selectedDate).map((week, weekIndex) =>
            week.map((date) =>
              renderDateCell(
                date,
                date.toDateString() === selectedDate.toDateString(),
                handleDateSelect
              )
            )
          )}
        </CalendarGrid>
      )}
      {viewMode === 'day' && renderTimeSlots(visibleTimeSlots, onSelectSlot)}
    </CalendarContainer>
  );
};

// Human tasks:
// 1. Implement responsive design for various screen sizes (Required)
// 2. Add accessibility features (ARIA labels, keyboard navigation) (Required)
// 3. Implement localization for multi-language support (Optional)