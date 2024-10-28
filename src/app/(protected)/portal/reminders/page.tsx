import { Breadcrumbs } from 'Generic/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meus Lembretes'
};

export default function PortalReminders() {
  return (
    <>
      <Breadcrumbs />
      <div> testing landing inside portal </div>
    </>
  );
}