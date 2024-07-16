'use client';

import { useOnBooking, BookingAgendaVisualization } from 'Bookings';

type props = {
  userTag: string;
  agendaTag: string;
}

export function BookableAgendaView({ userTag, agendaTag }: props) {
  const { profile, agenda } = useOnBooking(userTag, agendaTag);

  return (
    agenda &&
    profile &&
    <BookingAgendaVisualization agendaName={agenda.name} colorName={agenda.colorName} key={agenda.id} timeFrame={agenda.timeFrame} profile={profile} />
  );
}