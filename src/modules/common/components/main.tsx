import { ReactNode } from 'react';

type props = {
  children: ReactNode;
}

export function MainContainer({ children }: props) {
  return <main className="px-4 md:px[12vw] lg:px-[2vw] xl:px-[8vw] 2xl:px-[12vw] py-16">{children}</main>;
}