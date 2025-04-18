'use client';

import { BookingAlreadyReScheduled, BookingCanceled, BookingNotFound, ReSchedulePickATime } from 'Bookings/components';
import { useOnReSchedule } from 'Bookings/hooks';
import { CirclingFourDotsLoading } from 'Common/components';

type props = {
  bookingId: string;
}

export function ReScheduleView({ bookingId }: props) {
  const { 
    agenda, 
    isLoading, 
    isBookingLoading, 
    isSubmitLoading,
    isSubmitSuccess,
    oldBooking, 
    profile, 
    availabilities, 
    selected,
    handleDateChange, 
    handleSelectedTime, 
    handleSubmit,
  } = useOnReSchedule(bookingId);

  const renderComponent = () => {
    switch (oldBooking?.details.status) {
      case undefined:
        return <BookingNotFound />;
      case 'canceled':
      case 'booked':
        return (
          <ReSchedulePickATime availabilities={availabilities} agenda={agenda} booking={oldBooking!} isLoading={isLoading} profile={profile} selected={selected} 
            onSelectedTime={handleSelectedTime}onDateChange={handleDateChange} onSubmit={handleSubmit} isSubmitLoading={isSubmitLoading} isSubmitSuccess={isSubmitSuccess}
          />
        );
      case 'rescheduled':
        return <BookingAlreadyReScheduled agenda={agenda} booking={oldBooking} profile={profile} />;
    }
  };

  return (
    <div className="flex flex-col shadow-lg p-2 sm:p-6 rounded-xl w-fit mx-auto gap-8">
      <div className="flex gap-4 lg:flex-row flex-col">
        {
          isBookingLoading
            ? <div className="m-auto"><CirclingFourDotsLoading /></div>
            : renderComponent()
        }
      </div>
    </div>
  );
}