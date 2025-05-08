import { ReactNode } from 'react';

type props = {
  children: ReactNode;
}

export function MainContainer({ children }: props) {
  return <main className="md:h-screen px-4 md:px[12vw] lg:px-[2vw] xl:px-[8vw] 2xl:px-[12vw] pb-10 pt-28">{children}</main>;
}