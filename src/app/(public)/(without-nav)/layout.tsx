import { PublicNoNavHeaderView } from 'Generic/views';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicNoNavHeaderView />
      <main className="px-4 md:px[12vw] lg:px-[2vw] xl:px-[8vw] 2xl:px-[12vw] py-16">{children}</main>
    </>
  );
}
