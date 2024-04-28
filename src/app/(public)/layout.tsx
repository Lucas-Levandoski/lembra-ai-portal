
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b h-20 px-[12vw] flex justify-center items-center">
        <nav className="flex gap-6">
          <a href="/landing">Product</a>
          <a href="/about-us">About Us</a>
        </nav>
      </header>

      <main className="px-[12vw]">{children}</main>
    </>
  );
}
