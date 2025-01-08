import { CancelView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancelamento'
};

type Params = {
  bookingId: string;
}

export default function Cancel({ params }: { params: Params}) {
  return <CancelView bookingId={params.bookingId} />;
}