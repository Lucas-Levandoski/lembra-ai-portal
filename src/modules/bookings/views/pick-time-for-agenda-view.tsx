'use client';

import { TimePicker } from 'Bookings/components';
import { useOnPickingTime } from 'Bookings/hooks';
import { BouncingThreeDotsLoading, Button, Calendar, ErrorMessage, TimeCard } from 'Common/components';
import { TimezoneDictionary } from 'Profile';
import { ProfileTag } from 'Profile/components';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';

type props = {
  userTag: string;
  agendaTag: string;
}

export function PickTimeForAgendaView({ userTag, agendaTag }: props) {
  const { 
    profile,
    agenda,
    availabilities,
    selected,
    handleDateChange,
    handleSelectedTime,
    isLoading,
  } = useOnPickingTime(userTag, agendaTag);

  return (
    <div className="flex flex-col shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
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
                          <div className="flex gap-3 items-center">
                            <HiOutlineGlobeAsiaAustralia className="size-8" />Fuso horário: {TimezoneDictionary[profile!.timezone]}
                          </div>
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
          <Calendar currentDay={selected.date} highlightedDays={availabilities.dates} onSelectedDay={handleDateChange} isLoading={isLoading} />
          <TimePicker times={availabilities.times[selected.date]} selectedTime={selected.timeIndex} onSelectTime={handleSelectedTime} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button route={{ pathname: `${agendaTag}/${selected.date}`, query: { time: selected.time } }} disabled={selected.timeIndex < 0}>Avançar</Button>
      </div>
    </div>
  );
}