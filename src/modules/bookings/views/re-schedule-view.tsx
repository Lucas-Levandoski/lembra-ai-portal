'use client';

import { BookingAlreadyReScheduled, BookingCanceled, BookingNotFound, ReSchedulePickATime } from 'Bookings/components';
import { useOnReSchedule } from 'Bookings/hooks';
import { CirclyingFourDotsLoading } from 'Common/components';

type props = {
  bookingId: string;
}

export function ReScheduleView({ bookingId }: props) {
  const { 
    agenda, 
    isLoading, 
    isBookingLoading, 
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
      case 'booked':
        return (
          <ReSchedulePickATime 
            availabilities={availabilities} 
            agenda={agenda} 
            booking={oldBooking!} 
            isLoading={isLoading} 
            profile={profile} 
            selected={selected}
            onSelectedTime={handleSelectedTime}
            onDateChange={handleDateChange} 
            onSubmit={handleSubmit} 
          />
        );
      case 'rescheduled':
        return <BookingAlreadyReScheduled agenda={agenda} booking={oldBooking} isLoading={isLoading} profile={profile} />;
      case 'canceled':
        return <BookingCanceled agenda={agenda} booking={oldBooking} isLoading={isLoading} profile={profile} />;
    }
  };

  return (
    <div className="flex flex-col shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
      <div className="flex min-w-[600px] gap-4">
        {
          isBookingLoading
            ? <div className="m-auto"><CirclyingFourDotsLoading /></div>
            : renderComponent()
        }
      </div>
    </div>
  );
}