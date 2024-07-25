import { VisualIdentityView } from 'Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Identidade Visual'
};

export default function VisualIdentity() {
  return (
    <VisualIdentityView />
  );
} 