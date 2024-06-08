import { useRouter } from 'next/router'
import { EditAgendaView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Agenda'
};

export default function EditAgenda() {
  const router = useRouter();

  return <EditAgendaView agendaId={router.query.slug as string}  />
}