import { CancelMissingIdView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancelamento - Necessário BookindId'
};

export default function CancelMissingId() {
  return <CancelMissingIdView />;
}