import { EditAgendaView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Agenda'
};

export default function EditAgenda() {
  return <EditAgendaView />
}