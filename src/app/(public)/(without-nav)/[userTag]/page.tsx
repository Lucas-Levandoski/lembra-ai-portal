import { PublicAgendasView } from 'Agenda';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listando Agendas'
};

type Params = {
  userTag: string;
}

export default function PublicAgendasByTag({ params }: { params: Params}) {
  return <PublicAgendasView userTag={params.userTag} />;
}