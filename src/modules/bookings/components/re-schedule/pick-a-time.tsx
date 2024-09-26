import { IShortAgendaProps } from 'Agenda';
import { BookingEntity, IDateTimes } from 'Bookings/models';
import { BouncingThreeDotsLoading, Button, Calendar, ErrorMessage, TimeCard } from 'Common/components';
import { IShortProfile, ProfileTag } from 'Profile';
import { FcGoogle } from 'react-icons/fc';
import { TimePicker } from '../time-picker';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
  isLoading: boolean;
  availabilities: { dates: string[], times: IDateTimes };
  selected: { date: string, timeIndex: number, time: string};
  onDateChange: (date: string) => void;
  onSelectedTime: (timeIndex: number) => void;
  onSubmit: () => void;
}


export function ReSchedulePickATime({ 
  agenda, 
  booking, 
  isLoading, 
  profile,
  availabilities,
  onDateChange,
  onSelectedTime,
  onSubmit,
  selected,
}: props) {



  return (
    <div className="flex flex-col gap-10">
      <div className="flex min-w-[600px] gap-4">
        <div className="flex gap-3 flex-col w-[500px]">
          {
            isLoading
              ? <div className="m-auto"><BouncingThreeDotsLoading /></div>
              : (
                <>
                  {
                    profile === undefined
                      ? <ErrorMessage message="Falha ao carregar dados do usuário" />
                      : <ProfileTag profile={profile} />
                  }
                  {
                    agenda === undefined 
                      ? <ErrorMessage message="Falha ao carregar informações da agenda" />
                      : (
                        <>
                          <h1>{agenda.name}</h1>
                          <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
                          <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
                            <FcGoogle className="size-8" />Google meet
                          </div>
                        </>
                      )  
                  }
                </>
              )
          }
        </div>
        <div className="border-r w-1"></div>
        <div className="flex gap-6"> 
          <Calendar currentDay={selected.date} highlightedDays={availabilities.dates} onSelectedDay={onDateChange} isLoading={isLoading} />
          <TimePicker times={availabilities.times[selected.date]} selectedTime={selected.timeIndex} onSelectTime={onSelectedTime} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => onSubmit()}  disabled={selected.timeIndex < 0}>Confirmar Reagendamento</Button>
      </div>
    </div>
  );
}