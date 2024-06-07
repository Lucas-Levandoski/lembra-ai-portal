import { Link } from 'Common';
import Image from 'next/image';
import NextLink from 'next/link';
import { CiCalendar, CiClock2 } from 'react-icons/ci';
import { PiClockCounterClockwiseLight, PiStackSimpleLight } from 'react-icons/pi';
import { UserInfo } from '../components';

export function ProtectedHeaderView() {
  return (
    <header className="border-b h-20 px-[12vw] mx-0 my-auto flex items-center justify-between bg-white">
      <NextLink href='/portal'>
        <Image
          alt='logo'
          src='/assets/images/lembra-ai-logo.png'
          width={140}
          height={20} />
      </NextLink>
      <nav className="flex gap-8">
        <Link route='agenda'><PiStackSimpleLight strokeWidth={5} className='size-6 font-bold'/> Agendas</Link>
        <Link route='calendar'><CiCalendar strokeWidth={0.5} className='size-6' /> Calendário</Link>
        <Link route='availability'><CiClock2 strokeWidth={0.3} className='size-6' />Disponibilidade</Link>
        <Link route='reminders'><PiClockCounterClockwiseLight  strokeWidth={5} className='size-6'/> Lembretes</Link>
      </nav>
      <UserInfo />
    </header>
  )
}