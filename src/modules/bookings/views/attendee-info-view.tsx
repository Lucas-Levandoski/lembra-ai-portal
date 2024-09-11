'use client';

import { useOnAttendeeInfo } from 'Bookings/hooks';
import { Button, TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { CiCalendar } from 'react-icons/ci';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';

type props = {
  userTag: string;
  agendaTag: string;
  date: string;
}

export function AttendeeInfoView({ userTag, agendaTag, date }: props) {
  const { agenda, profile, onSubmit } = useOnAttendeeInfo(userTag, agendaTag, date);

  return (
    profile &&
    agenda &&
    (
      <div className="flex min-w-[600px] shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
        <div className="flex gap-3 flex-col w-[500px]">
          <ProfileTag profile={profile} />
          <h1>{agenda.name}</h1>
          <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
          <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
            <FcGoogle className="size-8" />
            Google meet
          </div>
          <div className="border rounded-lg p-4 flex items-center gap-6">
            <HiOutlineGlobeAsiaAustralia className="size-8" />
            Horário de Brasília
          </div>
          <div className="border rounded-lg p-4 flex items-center gap-6">
            <CiCalendar className="size-8" />
            
          </div>
        </div>
        <div className="border-r w-1"></div>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 max-w-[500px]" >
          <h2>Preencha os Campos</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Nome *</label>
            <input className="p-2 border rounded-xl" id="name"/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">E-mail *</label>
            <input type="email" className="p-2 border rounded-xl" id="email" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">Por favor, compartilhe qualquer coisa que possa ser útil para a preparação da nossa reunião.</label>
            <textarea className="p-2 border rounded-xl" id="description" />
          </div>
          <Button type="submit">Agendar Evento</Button>
        </form>
      </div>
    )
  );
}