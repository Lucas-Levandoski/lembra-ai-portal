import { PublicHeaderView } from 'Generic';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeaderView />
      <main className="px-[12vw]">{children}</main>
    </>
  );
}
