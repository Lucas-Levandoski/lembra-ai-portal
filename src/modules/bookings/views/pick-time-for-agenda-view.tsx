'use client';

import { TimePicker } from 'Bookings/components';
import { useOnPickingTime } from 'Bookings/hooks';
import { Button, Calendar, TimeCard } from 'Common/components';
import { ProfileTag } from 'Profile/components';
import { FcGoogle } from 'react-icons/fc';

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
  } = useOnPickingTime(userTag, agendaTag);

  return (
    agenda &&
    profile &&
    availabilities.dates.length &&
    (
      <div className="flex flex-col shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
        <div className="flex min-w-[600px] gap-4">
          <div className="flex gap-3 flex-col w-[500px]">
            <ProfileTag profile={profile} />
            <h1>{agenda.name}</h1>
            <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame} />
            <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
              <FcGoogle className="size-8" />Google meet
            </div>
          </div>
          <div className="border-r w-1"></div>
          <div className="flex gap-6"> 
            <Calendar currentDay={selected.date} highlightedDays={availabilities.dates} onSelectedDay={handleDateChange} />
            <TimePicker times={availabilities.times[selected.date]} selectedTime={selected.timeIndex} onSelectTime={handleSelectedTime} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button route={{ pathname: `${agendaTag}/${selected.date}`, query: { time: selected.time } }} disabled={selected.timeIndex < 0}>Avançar</Button>
        </div>
      </div>
    )
  );
}