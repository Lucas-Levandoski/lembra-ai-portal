'use client';

import { Calendar, TimeGrid } from 'Common';
import { useEffect } from 'react';
import { useBookings } from 'Bookings';

export function CalendarColumn() {
  const { 
    bookedDates, 
    selectedDate, 
    isBookedDatesLoading, 
    getMyBookedDates, 
    onSelectingDate, 
    getDayBookingsFormated,
    isDayBookingsLoading
  } = useBookings();

  useEffect(() => {
    getMyBookedDates();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Calendar highlightedDays={bookedDates?.dates} isLoading={isBookedDatesLoading} onSelectedDay={onSelectingDate} currentDay={selectedDate} />
      <TimeGrid meetings={getDayBookingsFormated()} isLoading={isDayBookingsLoading} />
    </div>
  );
}