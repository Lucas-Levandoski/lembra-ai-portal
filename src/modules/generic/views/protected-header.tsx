import { envVars, Link } from 'Common';
import Image from 'next/image';
import NextLink from 'next/link';
import { CiCalendar, CiClock2 } from 'react-icons/ci';
import { PiClockCounterClockwiseLight, PiStackSimpleLight } from 'react-icons/pi';
import { UserInfo } from '../components';

export function ProtectedHeaderView() {
  return (
    <header className="border-b h-20 px-[12vw] fixed z-50 w-full flex items-center justify-between bg-white">
      <NextLink href="/portal">
        <Image
          alt="logo"
          src={`${envVars.saAssetsUrl}/logo_lembra_ai.png`}
          width={140}
          height={20} />
      </NextLink>
      <nav className="flex gap-8">
        <Link route="/portal/agenda"><PiStackSimpleLight strokeWidth={5} className="size-6 font-bold"/> Agendas</Link>
        <Link route="/portal/calendar"><CiCalendar strokeWidth={0.5} className="size-6" /> Calendário</Link>
        <Link route="/portal/availability"><CiClock2 strokeWidth={0.3} className="size-6" />Disponibilidade</Link>
        <Link route="/portal/events"><PiClockCounterClockwiseLight  strokeWidth={5} className="size-6"/> Eventos</Link>
      </nav>
      <UserInfo />
    </header>
  );
}