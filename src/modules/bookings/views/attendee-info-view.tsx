'use client';

import { useOnAttendeeInfo } from 'Bookings/hooks';

type props = {
  userTag: string;
  agendaTag: string;
  date: string;
}

export function AttendeeInfoView({ userTag, agendaTag, date }: props) {
  const { time } = useOnAttendeeInfo(userTag, agendaTag, date);

  return (
    <div className="flex flex-col justify-center gap-8 m-auto w-2/3">
      {userTag}<br />{agendaTag}<br />{date}<br />{time}
    </div>
  );
}