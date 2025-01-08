'use client';

import { BookingAlreadyReScheduled, BookingCanceled, BookingNotFound } from 'Bookings/components';
import { CancelLanding } from 'Bookings/components';
import { useOnCancel } from 'Bookings/hooks';
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
  } = useOnCancel(bookingId);

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
    <div className="flex flex-col shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
      <div className="flex min-w-[600px] gap-4">
        {
          isLoading
            ? <div className="m-auto"><CirclingFourDotsLoading /></div>
            : renderComponent()
        }
      </div>
    </div>
  );
}