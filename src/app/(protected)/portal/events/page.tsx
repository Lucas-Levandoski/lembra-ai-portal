import { EventsView } from 'Events/views';
import { Breadcrumbs } from 'Generic/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meus Eventos'
};

export default function PortalEvents() {
  return (
    <>
      <Breadcrumbs />
      <EventsView />
    </>
  );
}