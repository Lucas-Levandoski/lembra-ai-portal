import { BookableAgendasView } from 'Bookings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listando Agendas'
};

type Params = {
  userTag: string;
}

export default function PublicAgendasByTag({ params }: { params: Params}) {
  return <BookableAgendasView userTag={params.userTag} />;
}