'use client';

import { getBookingsByDay, listBookedDates } from 'Bookings';
import { ParseDate, TimeGridMeeting, getTime } from 'Common';
import { useStore } from 'Store';
import { toast } from 'react-toastify';


export function useBookings() {
  const {
    selectedDate,
    bookedDates,
    isBookedDatesLoading,
    isDayBookingsLoading,
    dayBookings,
    setBookedDates,
    setIsBookedDatesLoading,
    setIsDayBookingsLoading,
    setSelectedDate,
    setDayBookings,
    agendas,
  } = useStore(state => ({
    selectedDate: state.selectedDate,
    bookedDates: state.bookedDates,
    isBookedDatesLoading: state.isBookedDatesLoading,
    dayBookings: state.dayBookings,
    setSelectedDate: state.setSelectedDate,
    setBookedDates: state.setBookedDates,
    setIsBookedDatesLoading: state.setIsBookedDatesLoading,
    setDayBookings: state.setDayBookings,
    isDayBookingsLoading: state.isDayBookingsLoading,
    setIsDayBookingsLoading: state.setIsDayBookingsLoading,
    agendas: state.agendas
  }));

  const getMyBookedDates = async () => {
    setIsBookedDatesLoading(true);

    try {
      const booked = await listBookedDates();
      setBookedDates(booked);
    } catch (e) {
      toast.error('Falha ao listar datas com bookings');
    } finally {
      setIsBookedDatesLoading(false);
    }
  };

  const onSelectingDate = async (selected: string, shouldLoadDayBookings = true) => {
    if(!ParseDate(selected)) return;

    setSelectedDate(selected);

    if(shouldLoadDayBookings) {
      try {
        setIsDayBookingsLoading(true);
        const bookings = await getBookingsByDay(selected);
        setDayBookings(bookings);
      } catch(e) {
        setDayBookings([]);

        if(bookedDates?.dates.includes(selected)) 
          toast.error(`Falha ao ler os bookings para o dia ${selected}`);
      } finally {
        setIsDayBookingsLoading(false);
      }
    } 
  };

  const getDayBookingsFormated = (): TimeGridMeeting[] => {
    const result: TimeGridMeeting[] = [];

    if(!dayBookings || !agendas) return result;

    for(const booking of dayBookings) {
      const agenda = agendas.find(_agenda => _agenda.id === booking.details.agendaId);

      if(!agenda) continue;

      result.push({
        agendaName: agenda.details.name,
        color: agenda.details.colorName,
        startTime: getTime(booking.details.startDateTime),
        endTime: getTime(booking.details.endDateTime),
        title: booking.person.name
      });
    }

    return result;
  };

  return {
    selectedDate,
    bookedDates,
    isBookedDatesLoading,
    isDayBookingsLoading,
    setSelectedDate,
    getMyBookedDates,
    onSelectingDate,
    getDayBookingsFormated,
  };
}