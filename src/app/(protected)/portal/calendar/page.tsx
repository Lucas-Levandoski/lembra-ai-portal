import { Breadcrumbs } from 'Generic/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Calendário'
};

export default function PortalCalendar() {
  return (
    <>
      <Breadcrumbs />
      <div> testing landing inside portal </div>
    </>
  );
}