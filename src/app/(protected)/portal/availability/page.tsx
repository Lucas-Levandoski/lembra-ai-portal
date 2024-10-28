import { AvailabilityView } from 'Availability';
import { Breadcrumbs } from 'Generic/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minha Disponibilidade'
};

export default function PortalAvailability() {
  return (
    <>
      <Breadcrumbs />
      <AvailabilityView />
    </>
  );
}