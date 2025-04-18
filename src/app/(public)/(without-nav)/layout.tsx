import { MainContainer } from 'Common';
import { PublicNoNavHeaderView } from 'Generic/views';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNoNavHeaderView />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
