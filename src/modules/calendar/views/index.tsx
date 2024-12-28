'use client';

import { BookingDialog, LeftMenu } from '../components';
import { WeekView } from '../components/week-view';
import { useCalendar } from 'Calendar/hooks';

export function CalendarView() {
  const { 
    bookingsFormatted, 
    isAgendaLoading, 
    isMonthBookingsLoading, 
    isBookingLoading,
    selectedBooking,
    selectedDate, 
    isBookingOpen, 
    onCloseBooking,
    onSelectBooking,
    toggleShowAgenda, 
    onSelectDate, 
    selectedAgenda,
  } = useCalendar();

  return (
    <div className="grid grid-cols-7 gap-5 p-5 shadow-lg rounded-lg">
      <div className="col-span-2">
        <LeftMenu 
          onSelectingDate={onSelectDate} 
          selectedDate={selectedDate} 
          eventsByAgenda={bookingsFormatted} 
          isLoading={isMonthBookingsLoading || isAgendaLoading} 
          onToggle={toggleShowAgenda} 
        />
      </div>
      <div className="col-span-5">
        <WeekView eventsByAgenda={bookingsFormatted} selectedDate={selectedDate} onSelectBooking={onSelectBooking} />
      </div>
      <BookingDialog isOpen={isBookingOpen} onClose={onCloseBooking} isLoading={isBookingLoading} booking={selectedBooking} agenda={selectedAgenda} />
    </div>
  );
};