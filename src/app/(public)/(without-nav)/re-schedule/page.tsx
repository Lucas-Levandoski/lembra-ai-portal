import { ReScheduleMissingIdView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reagendamento - Necessário BookindId'
};

export default function ReScheduleMissingId() {
  return <ReScheduleMissingIdView />;
}