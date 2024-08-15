'use client';

import { useOnBooking, BookingAgendaVisualization } from 'Bookings';

type props = {
  userTag: string;
  agendaTag: string;
}

export function BookableAgendaView({ userTag, agendaTag }: props) {
  const { profile, agenda, availableDates, selectedDate, handleDateChange, timesForDate } = useOnBooking(userTag, agendaTag);

  return (
    agenda &&
    profile &&
    <BookingAgendaVisualization 
      selectedDate={selectedDate}
      agendaName={agenda.name} 
      colorName={agenda.colorName} 
      key={agenda.id} 
      timeFrame={agenda.timeFrame} 
      profile={profile} 
      availableDates={availableDates} 
      onDateChange={handleDateChange}
      availableTimes={timesForDate}
    />
  );
}