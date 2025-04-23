'use client';

import { BookingAlreadyReScheduled, BookingCanceled, BookingNotFound } from 'Bookings/components';
import { CancelLanding } from 'Bookings/components';
import { useOnGuestCancel } from 'Bookings/hooks';
import { CirclingFourDotsLoading } from 'Common/components';

type props = {
  bookingId: string;
}

export function CancelView({ bookingId }: props) {
  const { 
    booking,
    agenda,
    profile,
    reason,
    isLoading,
    isSubmitLoading,
    isSubmitSuccess,
    handleSubmit,
    handleChangeReason,
  } = useOnGuestCancel(bookingId);

  const renderComponent = () => {
    switch (booking?.details.status) {
      case undefined:
        return <BookingNotFound />;
      case 'booked':
        return (
          <CancelLanding 
            booking={booking} 
            isSubmitLoading={isSubmitLoading} 
            isSubmitSuccess={isSubmitSuccess}
            onSubmit={handleSubmit}
            agenda={agenda}
            profile={profile}
            reason={reason}
            onChangeReason={handleChangeReason}
          />
        );
      case 'rescheduled':
        return <BookingAlreadyReScheduled agenda={agenda} booking={booking} profile={profile} />;
      case 'canceled':
        return <BookingCanceled agenda={agenda} booking={booking} profile={profile} />;
    }
  };

  return (
    <div className="flex flex-col shadow-lg p-2 sm:p-6 rounded-xl w-fit mx-auto gap-8">
      <div className="flex gap-4 lg:flex-row flex-col">
        {
          isLoading
            ? <div className="m-auto"><CirclingFourDotsLoading /></div>
            : renderComponent()
        }
      </div>
    </div>
  );
}