'use client';

import { IShortAgendaProps } from 'Agenda';
import { BookingEntity } from 'Bookings/models';
import { IShortProfile } from 'Profile/models';
import { BiCalendar, BiCamera, BiUser } from 'react-icons/bi';
import Image from 'next/image';
import { TimeDescription } from '../time-description';
import { Button, CirclingFourDotsLoading } from 'Common/components';
import { envVars, sumMinutesToTime } from 'Common/utils';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import { useOnAlreadyReScheduled } from 'Bookings/hooks/use-on-already-re-scheduled';



type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
}

export function BookingAlreadyReScheduled({ booking, agenda, profile }: props) {
  const { isNewBookingLoading, newBooking } = useOnAlreadyReScheduled(booking);

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
        Este Booking já foi reagendado
      </h1>
      <div className="flex flex-col gap-4 justify-center border w-fit rounded-lg p-6 mx-auto">
        <h1>{agenda?.name}</h1>
        <span className="flex items-center gap-4 text-gray-700 text-lg">
          <BiUser className="size-6" />{profile?.name}
        </span>
        <div className="border-y-2 py-4">
          <div className="flex flex-col gap-2">
            <h2>Evento Antigo</h2>
            <span className="flex items-center gap-4 text-gray-700 text-lg">
              <BiCalendar className="size-6" />
              {
                agenda &&
                <TimeDescription date={booking.details.date} startTime={booking.details.time} endTime={sumMinutesToTime(booking.details.time, agenda.timeFrame)} />
              }
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Evento Atualizado</h2>
            {
              isNewBookingLoading 
                ? <CirclingFourDotsLoading />
                : (
                  <>
                    <span className="flex items-center gap-4 text-gray-700 text-lg">
                      <BiCalendar className="size-6" />
                      {
                        agenda &&
                        newBooking &&
                        <TimeDescription date={newBooking.details.date} startTime={newBooking.details.time} endTime={sumMinutesToTime(newBooking.details.time, agenda.timeFrame)} />
                      }
                    </span>
                    {
                      newBooking &&
                      <Button route={newBooking.id} >Reagendar evento atualizado</Button>
                    }
                  </>
                )
            }
          </div>
        </div>
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
  );
}