import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Rink, RinkSchedule as RinkScheduleType, IceSlot, SlotStatus, SlotType } from '../../types/rink';
import { useRinks } from '../../hooks/useRinks';
import { useBookings } from '../../hooks/useBookings';

interface RinkScheduleProps {
  // Add any additional props if needed
}

const RinkSchedule: React.FC<RinkScheduleProps> = () => {
  const { rinkId } = useParams<{ rinkId: string }>();
  const { getRinkDetails, getRinkSchedule } = useRinks();
  const { getUserBookings } = useBookings();

  const [rink, setRink] = useState<Rink | null>(null);
  const [schedule, setSchedule] = useState<RinkScheduleType | null>(null);
  const [userBookings, setUserBookings] = useState<IceSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const rinkData = await getRinkDetails(rinkId);
        const scheduleData = await getRinkSchedule(rinkId);
        const bookingsData = await getUserBookings();

        setRink(rinkData);
        setSchedule(scheduleData);
        setUserBookings(bookingsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch rink schedule. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [rinkId, getRinkDetails, getRinkSchedule, getUserBookings]);

  const handleSlotSelection = (slot: IceSlot) => {
    // Implement slot selection logic here
    console.log('Selected slot:', slot);
  };

  const renderTimeSlot = (slot: IceSlot) => {
    const startTime = format(new Date(slot.startTime), 'h:mm a');
    const endTime = format(new Date(slot.endTime), 'h:mm a');

    let statusClass = '';
    switch (slot.status) {
      case SlotStatus.AVAILABLE:
        statusClass = 'bg-green-100 hover:bg-green-200';
        break;
      case SlotStatus.BOOKED:
        statusClass = 'bg-red-100 cursor-not-allowed';
        break;
      case SlotStatus.MAINTENANCE:
        statusClass = 'bg-yellow-100 cursor-not-allowed';
        break;
    }

    return (
      <div
        key={slot.id}
        className={`p-2 m-1 rounded ${statusClass}`}
        onClick={() => slot.status === SlotStatus.AVAILABLE && handleSlotSelection(slot)}
      >
        <p className="font-bold">{`${startTime} - ${endTime}`}</p>
        <p>{slot.type === SlotType.PUBLIC ? 'Public' : 'Private'}</p>
        <p>{slot.status}</p>
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!rink || !schedule) {
    return <div>No schedule available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{rink.name} Schedule</h1>
      <div className="grid grid-cols-7 gap-4">
        {schedule.days.map((day) => (
          <div key={day.date} className="border p-2">
            <h2 className="font-bold mb-2">{format(new Date(day.date), 'EEEE, MMM d')}</h2>
            {day.slots.map(renderTimeSlot)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RinkSchedule;