'use client';

import { Calendar, TimeGrid } from 'Common';
import { useEffect } from 'react';
import { useDayBookings } from 'Bookings';
import dayjs from 'dayjs';

export function CalendarColumn() {
  const { 
    bookedDates, 
    selectedDate, 
    isBookedDatesLoading, 
    getMyBookedDates, 
    onSelectingDate, 
    getDayBookingsFormatted,
    isDayBookingsLoading
  } = useDayBookings();

  useEffect(() => {
    onSelectingDate(dayjs(new Date()).format('YYYY-MM-DD'));
    getMyBookedDates();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Calendar highlightedDays={bookedDates?.dates} isLoading={isBookedDatesLoading} onSelectedDay={onSelectingDate} currentDay={selectedDate} />
      <TimeGrid meetings={getDayBookingsFormatted()} isLoading={isDayBookingsLoading} />
    </div>
  );
}