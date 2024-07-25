import { ManageConnectionsView } from 'Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gerenciar Conexões'
};

export default function ManageConnections() {
  return <ManageConnectionsView />;
}