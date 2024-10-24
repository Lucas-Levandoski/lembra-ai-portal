import { IShortAgendaProps } from 'Agenda';
import { BookingEntity } from 'Bookings/models';
import { IShortProfile } from 'Profile/models';
import Image from 'next/image';
import { BiCalendar, BiCamera, BiUser } from 'react-icons/bi';
import { TimeDescription } from '../time-description';
import { envVars, sumMinutesToTime } from 'Common';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
}

export function BookingCanceled({ booking, agenda, profile }: props) {
  return (
    <div className="flex flex-col gap-8 justify-center text-center rounded-lg p-6 w-full mx-auto">
      {
        profile &&
        <Image
          className="rounded-full"
          height={60}
          width={60}
          src={
            profile.profilePictureUrl
              ? `${envVars.saProfilesUrl}/${profile.profilePictureUrl}`
              : `${envVars.saAssetsUrl}/user_placeholder.png`
          }
          alt="profile" 
        />
      }
      <h1 className="mx-auto flex items-center gap-6">
        É uma pena mas este evento foi <strong className="text-red-700">cancelado</strong>
      </h1>
      <div className="flex flex-col gap-4 justify-center border w-fit rounded-lg p-6 mx-auto">
        <h1>{agenda?.name}</h1>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          <BiUser className="size-6" />{profile?.name}
        </span>
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-4 text-gray-700 text-lg">
            <BiCalendar className="size-6" />
            {
              agenda &&
              <TimeDescription date={booking.details.date} startTime={booking.details.time} endTime={sumMinutesToTime(booking.details.time, agenda.timeFrame)} />
            }
          </span>
          <span className="flex items-center gap-4 text-gray-700 text-lg">
            <HiOutlineGlobeAsiaAustralia className="size-8" />
            Horário de Brasília
          </span>
          <span className="flex items-center gap-4 text-gray-700 text-lg">
            <BiCamera className="size-6"/>
            Detalhes de webconferência em breve.
          </span>
        </div>
      </div>
    </div>
  );
}