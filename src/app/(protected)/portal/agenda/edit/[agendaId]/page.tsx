import { EditAgendaView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editar Agenda'
};

type Params = {
  agendaId: string;
}

export default function EditAgenda({ params }: { params: Params}) {

  return <EditAgendaView agendaId={params.agendaId} />
  // return <div>{params.agendaId}</div>
}