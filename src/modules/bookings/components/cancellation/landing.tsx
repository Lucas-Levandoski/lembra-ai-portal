import { IShortAgendaProps } from 'Agenda/models';
import { BookingEntity } from 'Bookings/models';
import { IShortProfile } from 'Profile/models';
import { CancelConfirmation } from './confirmation';
import { BouncingThreeDotsLoading, Button, ErrorMessage, TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { ChangeEvent } from 'react';
import { TimeDescription } from '../time-description';
import { sumTimes } from 'Common/utils';
import { twMerge } from 'tailwind-merge';
import { BiCalendar } from 'react-icons/bi';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
  reason: string;
  onChangeReason: (event: ChangeEvent<HTMLTextAreaElement>) => void; 
  isSubmitLoading: boolean;
  isSubmitSuccess: boolean;
  onSubmit: () => void;
}



export function CancelLanding({ booking, isSubmitLoading, isSubmitSuccess, onSubmit, onChangeReason, agenda, reason, profile }: props) {

  return (
    isSubmitSuccess
      ? agenda && booking && profile && <CancelConfirmation agenda={agenda} booking={booking} profile={profile} />
      : (
        <div className="flex flex-col items-center h-fit w-[900px] my-10 mx-5 gap-16">
          <h1 className="mx-auto">Deseja cancelar o evento?</h1>
          <div className="grid grid-cols-9 gap-1 w-full">
            <div className="flex flex-col gap-6 col-span-4">
              {
                profile === undefined
                  ? <ErrorMessage message="Falha ao carregar dados do usuário" />
                  : <ProfileTag className="mx-auto w-fit" profile={profile} />
              }
              {
                agenda === undefined 
                  ? <ErrorMessage message="Falha ao carregar informações da agenda" />
                  : (
                    <>
                      <div className="flex items-center">
                        <span className={twMerge('h-4 w-4 rounded-full mr-4', `bg-${agenda.colorName}-500`)} />
                        <strong>{agenda.name}</strong>
                      </div>
                      <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
                      <div className="flex items-center">
                        <BiCalendar className="size-6" />
                        <TimeDescription 
                          className="mx-auto text-sm my-3"
                          date={booking.details.date} 
                          startTime={booking.details.time} 
                          endTime={sumTimes(booking.details.time, booking.details.duration)} 
                        />
                      </div>
                    </>
                  )
              }
            </div>
            <div className="flex justify-center h-full col-span-1">
              <span className="border w-[1px] h-full" />
            </div>
            <div className="flex flex-col justify-around col-span-4">
              <label htmlFor="reason">Informe o motivo do cancelamento</label>
              <textarea id="reason" value={reason} className="h-24 text-base resize-none rounded-lg p-2 border w-full" onChange={onChangeReason} />
              <Button disabled={isSubmitLoading} onClick={onSubmit} variant="danger" >
                {
                  isSubmitLoading 
                    ? <BouncingThreeDotsLoading />
                    : 'Confirmar'
                }
              </Button>
            </div>
          </div>
        </div>
      )
  );
};