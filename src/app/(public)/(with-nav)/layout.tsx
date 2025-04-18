import { MainContainer } from 'Common';
import { PublicHeaderView } from 'Generic';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeaderView />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
