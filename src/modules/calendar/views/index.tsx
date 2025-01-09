'use client';

import { useOnOwnerCancel } from 'Bookings';
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
    selectedAgenda,
    selectedBookingReschedules,
    onCloseBooking,
    onSelectBooking,
    toggleShowAgenda, 
    onSelectDate,
    handleReloadAll,
  } = useCalendar();

  const {
    isLoading,
    handleCancelCancellation,
    handleCancellation,
    handleConfirmCancellation,
    isOpen,
  } = useOnOwnerCancel(handleReloadAll);

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
      <BookingDialog 
        isOpen={isBookingOpen}
        onClose={onCloseBooking}
        isLoading={isBookingLoading}
        booking={selectedBooking}
        agenda={selectedAgenda}
        reschedules={selectedBookingReschedules}
        isCancellationOpen={isOpen}
        onCancellation={handleCancellation}
        onCancellationCancel={handleCancelCancellation}
        onCancellationConfirm={handleConfirmCancellation}
        isCancellationLoading={isLoading}
      />
    </div>
  );
};