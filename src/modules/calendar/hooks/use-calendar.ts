'use client';

import { useAgenda } from 'Agenda/hooks';
import { BookingEntity } from 'Bookings';
import { useMonthBookings } from 'Bookings/hooks';
import { IEventsByAgenda } from 'Calendar/models';
import { AgendaElement } from 'Common';
import { getDate, getDateObject, sumTimes } from 'Common/utils';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function useCalendar() {
  const { isMonthBookingsLoading, getBookings } = useMonthBookings();
  const { isAgendaLoading, getAgendas } = useAgenda();
  
  const today = getDateObject();

  const [month, setMonth] = useState<string>(today.month);
  const [year, setYear] = useState<string>(today.year);
  const [fetchedDate, setFetchedDate] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dayjs(new Date()).format('YYYY-MM-DD'));
  const [bookingsFormatted, setBookingsFormatted] = useState<IEventsByAgenda>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async({ year: _year, month: _month }: {year?: string, month?: string} = {}) => {
    const date = new Date(`${_year ?? year}-${_month ?? month}-03`);

    const _bookings: BookingEntity[] = [];

    const dateString = getDate(date).slice(0, 7);

    // Get bookings for the current month
    const _monthBookings = await getBookings(String(date.getFullYear()), String(date.getMonth() + 1));

    // Get bookings for the previous month
    const prevDate = new Date(date);
    prevDate.setMonth(date.getMonth() - 1);
    const prevDateString = getDate(prevDate).slice(0, 7);
    let _monthBeforeBookings: BookingEntity[] = [];

    if(!fetchedDate.includes(prevDateString))
      _monthBeforeBookings = await getBookings(String(prevDate.getFullYear()), String(prevDate.getMonth() + 1));

    // Get bookings for the next month
    const nextDate = new Date(date);
    nextDate.setMonth(date.getMonth() + 1);
    const nextDateString = getDate(nextDate).slice(0, 7);
    let _monthAfterBookings: BookingEntity[] = [];
    if(!fetchedDate.includes(nextDateString))
      _monthAfterBookings = await getBookings(String(nextDate.getFullYear()), String(nextDate.getMonth() + 1));

    _bookings.push(..._monthBookings, ..._monthBeforeBookings, ..._monthAfterBookings);

    setFetchedDate([prevDateString, dateString, nextDateString]);

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
    const selected = new Date(date);

    selected.setDate(selected.getDate() + 1);

    const { month: _month, year: _year } = getDateObject(selected);

    if(_month !== month) setMonth(_month);
    if(_year !== year) setYear(_year);

    const _date = `${_year}-${_month}`;

    if(!fetchedDate.includes(_date)) {
      loadData({month: _month, year: _year});
    }

    setSelectedDate(date);
  };

  const getMonthBookingsFormatted = (_monthBookings: BookingEntity[], _agendas: AgendaElement[]) => {
    const result: IEventsByAgenda = bookingsFormatted;

    if(!_monthBookings || !_agendas) return result;

    for(const agenda of _agendas) {
      const bookings = _monthBookings.filter(booking => booking.agendaId === agenda.id);

      if(!bookings) continue;

      const shouldShow = result[agenda.id]?.shouldShow ?? true;

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
        shouldShow,
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