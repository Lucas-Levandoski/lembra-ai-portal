import { IShortAgendaProps } from 'Agenda/models';
import { IShortProfile, TimezoneDictionary } from 'Profile/models';
import { BiCalendar, BiCamera, BiSolidBadgeCheck , BiUser } from 'react-icons/bi';
import { TimeDescription } from './time-description';
import { envVars, sumMinutesToTime } from 'Common';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import Image from 'next/image';
import { ProfilePicture } from 'Profile';

type props = {
  agenda?: IShortAgendaProps,
  profile?: IShortProfile,
  time?: string,
  date?: string,
}

export function SuccessBookingCard({ agenda, profile, time, date }: props) {
  return (
    <div className="flex flex-col gap-8 justify-center text-center border rounded-lg p-6 lg:w-4/6 mx-auto">
      {
        profile && <ProfilePicture profile={profile} />
      }
      <h1 className="mx-auto flex items-center gap-6">
        <BiSolidBadgeCheck  className="size-12 text-green-700" />
        Você está agendado
      </h1>
      <span>
        Um convite para o calendário foi enviado para o seu endereço de e-mail.
      </span>
      <div className="flex flex-col gap-4 justify-center border w-fit rounded-lg p-6 mx-auto">
        <h1>{agenda?.name}</h1>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          <BiUser className="size-6" />{profile?.name}
        </span>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          {
            time && 
            date &&
            agenda &&
            <>
              <BiCalendar className="size-6" />
              <TimeDescription date={date} startTime={time} endTime={sumMinutesToTime(time, agenda.timeFrame)} />
            </>
          }
        </span>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          <HiOutlineGlobeAsiaAustralia className="size-8" />Fuso horário: {TimezoneDictionary[profile!.timezone]}
        </span>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          <BiCamera className="size-7"/>
          Detalhes de webconferência em breve.
        </span>
      </div>
    </div>
  );
}