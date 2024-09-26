import { ReScheduleView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reagendamento'
};

type Params = {
  bookingId: string;
}

export default function ReScheduleMissingId({ params }: { params: Params}) {
  return <ReScheduleView bookingId={params.bookingId} />;
}