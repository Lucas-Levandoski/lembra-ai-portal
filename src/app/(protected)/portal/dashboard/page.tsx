import { DashboardView } from 'modules/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Dashboard'
};

export default function PortalDashboard() {
  return <DashboardView />
}