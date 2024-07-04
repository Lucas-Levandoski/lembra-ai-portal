import { NewAgendaView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nova Agenda'
};

export default function NewAgenda() {
  return <NewAgendaView />;
}