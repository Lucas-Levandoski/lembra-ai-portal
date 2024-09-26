import { getAgendaById, IShortAgendaProps } from 'Agenda';
import { BookingEntity, IDateTimes } from 'Bookings/models';
import { listAvailableDatesAndTimes, readEvent } from 'Bookings/services';
import { IShortProfile } from 'Profile/models';
import { readProfileById } from 'Profile/services';
import { useEffect, useState } from 'react';



export function useOnReSchedule(bookingId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingLoading, setIsBookingLoading] = useState(true);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [profile, setProfile] = useState<IShortProfile>();
  const [oldBooking, setOldBooking] = useState<BookingEntity>();
  const [availabilities, setAvailabilities] = useState<{ dates: string[], times: IDateTimes }>({ dates: [], times: {} });
  const [selected, setSelected] = useState<{ date: string, timeIndex: number, time: string}>({ date: new Date().toISOString(), timeIndex: -1, time: ''});

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const booking = await getBooking(bookingId);
      setIsBookingLoading(false);
      if(!booking) return;

      await getProfile(booking.pKey);
      await getAgenda(booking.pKey, booking.agendaId);

      if(booking.details.status === 'booked') 
        await getAvailabilities(booking.pKey, booking.agendaId);

    } finally {
      setIsLoading(false);
    }
  };

  const getBooking = async(_bookingId: string) => {
    const _booking = await readEvent(_bookingId);

    setOldBooking(_booking);

    return _booking;
  };

  const getAgenda = async (userId: string, agendaId: string) => {
    const _agenda = await getAgendaById(userId, agendaId);

    setAgenda(_agenda);

    return agenda;
    
  };

  const getProfile = async (userId: string) => {
    const _profile = await readProfileById(userId);

    setProfile(_profile);

    return profile;
  };

  const getAvailabilities = async (userId: string, agendaId: string) => {
    const { dates, times } = await listAvailableDatesAndTimes(userId, agendaId);
    if(!dates || !times) return;

    setAvailabilities({ dates, times });
  };

  const handleDateChange = (date: string) => {
    setSelected({ timeIndex: -1, time: '', date });
  };

  const handleSelectedTime = (timeIndex: number) => {
    setSelected(current => ({ 
      ...current, 
      timeIndex, 
      time: availabilities.times[selected.date][timeIndex]
    }));
  };

  const handleSubmit = async () => {
    console.log('submit');

    // await reScheduleEvent(oldBooking!.pKey, {});
  };

  return {
    isBookingLoading,
    isLoading,
    oldBooking,
    profile,
    agenda,
    availabilities,
    selected,
    handleDateChange,
    handleSelectedTime,
    handleSubmit,
  };
}