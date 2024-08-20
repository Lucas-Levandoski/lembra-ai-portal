import { ListAgendasForTagView } from 'Bookings/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listando Agendas'
};

type Params = {
  userTag: string;
}

export default function PublicAgendasByTag({ params }: { params: Params}) {
  return <ListAgendasForTagView userTag={params.userTag} />;
}