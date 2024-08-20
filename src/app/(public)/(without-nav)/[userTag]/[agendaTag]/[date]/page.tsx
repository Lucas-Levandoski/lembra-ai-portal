import { AttendeeInfoView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Informações de contato'
};

type Params = {
  userTag: string;
  agendaTag: string;
  date: string;
}

export default function GatherUserInfo({ params }: { params: Params}) {
  return <AttendeeInfoView userTag={params.userTag} agendaTag={params.agendaTag} date={params.date} />;
}