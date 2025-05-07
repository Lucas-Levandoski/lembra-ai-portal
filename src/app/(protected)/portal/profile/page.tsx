import { ProfileView } from 'Profile/views';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Perfil'
};

export default function Profile() {
  return (
    <ProfileView />
  );
} 