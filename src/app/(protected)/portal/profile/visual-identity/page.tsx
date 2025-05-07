import { VisualIdentityView } from 'Profile/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Identidade Visual'
};

export default function VisualIdentity() {
  return (
    <VisualIdentityView />
  );
} 