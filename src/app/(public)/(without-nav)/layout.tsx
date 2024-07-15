import { PublicNoNavHeaderView } from 'Generic';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNoNavHeaderView />
      <main className="px-[12vw] pt-16">{children}</main>
    </>
  );
}
