import { BookableAgendaView } from 'Bookings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listando Agendas'
};

type Params = {
  userTag: string;
  agendaTag: string;
}

export default function PublicAgendaByTag({ params }: { params: Params}) {
  return <BookableAgendaView userTag={params.userTag} agendaTag={params.agendaTag} />;
}