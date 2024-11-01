import { Breadcrumbs } from 'Generic/components';
import { CalendarView } from 'Calendar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Calendário'
};

export default function PortalCalendar() {
  return (
    <>
      <Breadcrumbs />
      <CalendarView />
    </>
  );
}