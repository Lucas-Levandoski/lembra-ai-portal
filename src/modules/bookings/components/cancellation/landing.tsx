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
        <div className="flex flex-col gap-8">
          <h1 className="mx-auto">Deseja cancelar o evento?</h1>
          <div className="flex gap-6 lg:flex-row flex-col justify-evenly">
            <div className="flex flex-col gap-6 2xl:w-[400px]">
              {
                profile === undefined
                  ? <ErrorMessage message="Falha ao carregar dados do usuário" />
                  : <ProfileTag className="mx-auto w-fit" profile={profile} />
              }
              {
                agenda === undefined 
                  ? <ErrorMessage message="Falha ao carregar informações da agenda" />
                  : (
                    <div className="flex flex-col gap-2 lg:items-start items-center">
                      <div className="flex items-center">
                        <span className={twMerge('h-4 w-4 rounded-full mr-4', `bg-${agenda.colorName}-500`)} />
                        <strong>{agenda.name}</strong>
                      </div>
                      <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
                      <div className="flex items-center gap-3">
                        <BiCalendar className="size-6" />
                        <TimeDescription 
                          className="mx-auto text-sm my-3"
                          date={booking.details.date} 
                          startTime={booking.details.time} 
                          endTime={sumTimes(booking.details.time, booking.details.duration)} 
                        />
                      </div>
                    </div>
                  )
              }
            </div>
            <div className="lg:border-r lg:border-t-0 lg:w-1 lg:h-auto border-t h-1"></div>
            <div className="flex flex-col gap-4 justify-around lg:min-w-96">
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