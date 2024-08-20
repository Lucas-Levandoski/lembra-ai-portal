import { PickTimeForAgendaView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listando Agendas'
};

type Params = {
  userTag: string;
  agendaTag: string;
}

export default function PublicAgendaByTag({ params }: { params: Params}) {
  return <PickTimeForAgendaView userTag={params.userTag} agendaTag={params.agendaTag} />;
}