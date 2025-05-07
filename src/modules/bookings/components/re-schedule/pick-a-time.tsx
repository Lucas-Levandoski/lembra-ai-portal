import { IShortAgendaProps } from 'Agenda';
import { BookingEntity, IDateTimes } from 'Bookings/models';
import { BouncingThreeDotsLoading, Button, Calendar, ErrorMessage, TimeCard } from 'Common/components';
import { IShortProfile, TimezoneDictionary } from 'Profile/models';
import { ProfileTag } from 'Profile/components';
import { FcGoogle } from 'react-icons/fc';
import { TimePicker } from '../time-picker';
import { TimeDescription } from '../time-description';
import { sumMinutesToTime, sumTimes } from 'Common/utils';
import { SuccessBookingCard } from '../success-booking-card';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
  isLoading: boolean;
  isSubmitLoading: boolean;
  isSubmitSuccess: boolean;
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
  isSubmitLoading,
  isSubmitSuccess,
  profile,
  availabilities,
  onDateChange,
  onSelectedTime,
  onSubmit,
  selected,
}: props) {


  return (
    isSubmitSuccess 
      ? <SuccessBookingCard agenda={agenda} profile={profile} time={selected.time} date={selected.date} />
      : (
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 lg:flex-row lg:max-h-[600px] flex-col">
            <div className="flex gap-3 flex-col 2xl:w-[400px]">
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
                              <div className="flex gap-3 items-center">
                                <HiOutlineGlobeAsiaAustralia className="size-8" />Fuso horário: {TimezoneDictionary[profile!.timezone]}
                              </div>
                              <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
                                <FcGoogle className="size-8" />Google meet
                              </div>
                              <h2>Agendamento Antigo</h2>
                              <TimeDescription 
                                date={booking.details.date} 
                                startTime={booking.details.time} 
                                endTime={sumTimes(booking.details.time, booking.details.duration)} 
                              />
                              <h2>Novo Agendamento</h2>
                              {
                                selected.timeIndex < 0
                                  ? <span>---</span>
                                  : (
                                    <TimeDescription
                                      date={selected.date}
                                      startTime={selected.time}
                                      endTime={sumMinutesToTime(selected.time, agenda.timeFrame)}
                                    />
                                  )
                              }
                            </>
                          )  
                      }
                    </>
                  )
              }
            </div>
            <div className="lg:border-r lg:border-t-0 lg:w-1 lg:h-auto border-t h-1"></div>
            <div className="flex gap-6 lg:flex-row flex-col"> 
              <Calendar currentDay={selected.date} highlightedDays={availabilities.dates} onSelectedDay={onDateChange} isLoading={isLoading} />
              <TimePicker times={availabilities.times[selected.date]} selectedTime={selected.timeIndex} onSelectTime={onSelectedTime} />
            </div>
          </div>
          <div className="flex justify-around lg:justify-end gap-6">
            <Button route={`/cancel/${booking.id}`} variant="danger">Canelar</Button>
            <Button onClick={() => onSubmit()} disabled={selected.timeIndex < 0 || isSubmitLoading}>
              {
                isSubmitLoading 
                  ? <BouncingThreeDotsLoading variant="secondary" />
                  : 'Reagendar' 
              }
            </Button>
          </div>
        </div>
      )
  );
}