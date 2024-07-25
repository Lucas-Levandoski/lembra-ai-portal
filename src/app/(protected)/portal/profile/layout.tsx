import { ProfileLeftMenuView } from 'Profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Perfil'
};

type props = {children: React.ReactNode}

export default function Profile({children}: Readonly<props>) {
  return <ProfileLeftMenuView>{children}</ProfileLeftMenuView>;
}