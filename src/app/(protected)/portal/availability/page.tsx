import { AvailabilityView } from 'Availability';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Disponibilidade'
};

export default function PortalAvailability() {
  return <AvailabilityView />
}