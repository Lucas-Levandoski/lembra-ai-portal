import { MyLinkView } from 'Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Link'
};

export default function MyLink() {
  return (
    <MyLinkView />
  );
} 