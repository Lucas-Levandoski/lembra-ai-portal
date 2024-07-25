import { ProfileView } from 'Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Perfil'
};

export default function Profile() {
  return (
    <ProfileView />
  );
} 