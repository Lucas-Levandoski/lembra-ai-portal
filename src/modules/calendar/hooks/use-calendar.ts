'use client';

import { useAgenda } from 'Agenda/hooks';
import { BookingEntity } from 'Bookings';
import { useMonthBookings } from 'Bookings/hooks';
import { IEventsByAgenda } from 'Calendar/models';
import { AgendaElement } from 'Common';
import { getDateObject, sumTimes } from 'Common/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function useCalendar() {
  const { isMonthBookingsLoading, getBookings } = useMonthBookings();
  const { isAgendaLoading, getAgendas } = useAgenda();
  
  const today = getDateObject();

  const [month, setMonth] = useState<string>(today.month);
  const [year, setYear] = useState<string>(today.year);
  const [selectedDate, setSelectedDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'));
  const [bookingsFormatted, setBookingsFormatted] = useState<IEventsByAgenda>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async() => {
    const _bookings = await getBookings(year, month);
    if(!_bookings) return;

    const _agendas = await getAgendas(true);
    if(!_agendas) return;

    getMonthBookingsFormatted(_bookings, _agendas);
  };
  
  const toggleShowAgenda = (agendaId: string) => {
    setBookingsFormatted({
      ...bookingsFormatted, 
      [agendaId]: {
        ...bookingsFormatted[agendaId],
        shouldShow: !bookingsFormatted[agendaId].shouldShow,
      }
    });
  };

  const onSelectDate = (date: string) => {
    const { month: _month, year: _year } = getDateObject(new Date(date));

    if(_month !== month) setMonth(_month);
    if(_year !== year) setYear(_year);

    setSelectedDate(date);
  };

  const getMonthBookingsFormatted = (_monthBookings: BookingEntity[], _agendas: AgendaElement[]) => {
    const result: IEventsByAgenda = {};

    if(!_monthBookings || !_agendas) return result;

    for(const agenda of _agendas) {
      const bookings = _monthBookings.filter(booking => booking.agendaId === agenda.id);

      if(!bookings) continue;

      result[agenda.id] = {
        events: bookings.map(booking => ({
          date: booking.details.date,
          agendaName: agenda.details.name,
          color: agenda.details.colorName,
          startTime: booking.details.time,
          endTime: sumTimes(booking.details.time, booking.details.duration),
          title: booking.guestDetails.name
        })),
        color: agenda.details.colorName,
        agendaName: agenda.details.name,
        isEnabled: agenda.details.isEnable,
        shouldShow: true,
      };
    }

    setBookingsFormatted(result);
  };

  return {
    bookingsFormatted,
    isMonthBookingsLoading,
    isAgendaLoading,
    toggleShowAgenda,
    onSelectDate,
    selectedDate
  };
}