import { IShortAgendaProps } from 'Agenda/models';
import { BookingEntity } from 'Bookings/models';
import { TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { IShortProfile } from 'Profile/models';
import { BiCalendar, BiUser } from 'react-icons/bi';
import { TimeDescription } from '../time-description';
import { sumTimes } from 'Common';
import { twMerge } from 'tailwind-merge';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { CiClock1 } from 'react-icons/ci';

type props = {
  booking: BookingEntity;
  agenda: IShortAgendaProps;
  profile: IShortProfile;
}

export function CancelConfirmation ({ agenda, booking, profile }: props) {
  return (
    <div className="flex flex-col items-center h-fit my-10 mx-5 gap-16">
      <div className="flex flex-col gap-3 justify-center">
        <IoCheckmarkCircle className="size-7 text-green-500 mx-auto"/>
        <h1 className="mx-auto">Cancelamento confirmado</h1>
        <p>A confirmação do cancelamento foi enviada para o seu e-mail</p>
      </div> 
      <div className="flex gap-4 lg:flex-row lg:max-h-[600px] flex-col">
        <div className="flex flex-col gap-6"> 
          <ProfileTag className="mx-auto w-fit" profile={profile} />
          <div className="flex items-center">
            <span className={twMerge('h-4 w-4 rounded-full mr-4', `bg-${agenda.colorName}-500`)} />
            <strong className="line-through">{agenda.name}</strong>
          </div>
          <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
          <div className="flex items-center">
          </div>
        </div>
        <div className="lg:border-r lg:w-1 lg:h-auto border-t h-1"></div>
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center gap-3">
            <BiUser className="size-6" />
            <p>{booking.guestDetails.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <BiCalendar className="size-6" />
            <TimeDescription 
              className="text-sm line-through"
              date={booking.details.date} 
              startTime={booking.details.time} 
              endTime={sumTimes(booking.details.time, booking.details.duration)} 
            />
          </div>
          <div className="flex items-center gap-3">
            <CiClock1 className="size-6" />
            <p>Horário de Brasília</p>
          </div>
        </div>
      </div>
    </div>
  );
}