import { IShortAgendaProps } from 'Agenda/models';
import { BookingEntity } from 'Bookings/models';
import { IShortProfile } from 'Profile/models';
import { CancelConfirmation } from './confirmation';
import { BouncingThreeDotsLoading, Button, ErrorMessage, TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { ChangeEvent } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TimeDescription } from '../time-description';
import { sumTimes } from 'Common/utils';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
  reason: string;
  onChangeReason: (event: ChangeEvent<HTMLInputElement>) => void; 
  isSubmitLoading: boolean;
  isSubmitSuccess: boolean;
  onSubmit: () => void;
}



export function CancelLanding({ booking, isSubmitLoading, isSubmitSuccess, onSubmit, onChangeReason, agenda, profile }: props) {

  return (
    isSubmitSuccess 
      ? <CancelConfirmation />
      : (
        <div className="flex flex-col gap-10">
          <div className="flex gap-4">
            <div className="flex gap-5 flex-col w-[600px]">
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
                      <h1 className="mx-auto">{agenda.name}</h1>
                      <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
                      <h2>Detalhes do agendamento</h2>
                      <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
                        <FcGoogle className="size-8" />Google meet
                      </div>
                      <TimeDescription 
                        className="mx-auto text-lg font-bold my-3"
                        date={booking.details.date} 
                        startTime={booking.details.time} 
                        endTime={sumTimes(booking.details.time, booking.details.duration)} 
                      />
                      <div className="flex flex-col gap-3">
                        <h3>Tem certeza que deseja cancelar este evento?</h3>
                        <div className="flex flex-col gap-2 p-4 justify-center rounded-xl border">
                          <label htmlFor="reason">Por favor explique o motivo</label>
                          <input className="rounded-lg border p-1" id="reason" onChange={onChangeReason} />
                        </div>
                        <Button disabled={isSubmitLoading} onClick={onSubmit} variant="danger" >
                          {
                            isSubmitLoading 
                              ? <BouncingThreeDotsLoading />
                              : 'Confirmar'
                          }
                        </Button>
                      </div>
                    </>
                  )
              }
            </div>
          </div>
        </div>
      )
  );
};