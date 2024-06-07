import { AgendasView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Minhas Agendas'
};

export default function PortalAgenda() {
  return <AgendasView />
}