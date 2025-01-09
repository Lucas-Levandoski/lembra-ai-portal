import { IShortAgendaProps } from 'Agenda/models';
import { getAgendaById } from 'Agenda/services';
import { BookingEntity } from 'Bookings/models';
import { cancelEvent, readEvent } from 'Bookings/services';
import { IShortProfile } from 'Profile/models';
import { readProfileById } from 'Profile/services';
import { ChangeEvent, useEffect, useState } from 'react';


export function useOnGuestCancel(bookingId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [booking, setBooking] = useState<BookingEntity>();
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [profile, setProfile] = useState<IShortProfile>();
  const [reason, setReason] = useState('');


  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const _booking = await getBooking(bookingId);
      if(!_booking) return;

      await getProfile(_booking.pKey);
      await getAgenda(_booking.pKey, _booking.agendaId);
    } finally {
      setIsLoading(false);
    }
  };

  const getBooking = async(_bookingId: string) => {
    const _booking = await readEvent(_bookingId);

    setBooking(_booking);

    return _booking;
  };

  const getAgenda = async (userId: string, agendaId: string) => {
    const _agenda = await getAgendaById(userId, agendaId);

    setAgenda(_agenda);

    return _agenda;
  };
  

  const getProfile = async (userId: string) => {
    const _profile = await readProfileById(userId);

    setProfile(_profile);

    return _profile;
  };

  const handleChangeReason = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    
    setReason(value);
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);

    try {
      if(!booking) {
        setIsSubmitLoading(false);
        return;
      }

      await cancelEvent(booking?.id, reason);

      setIsSubmitSuccess(true);
    } finally {
      setIsSubmitLoading(false);
    }
  };


  return {
    booking,
    agenda,
    profile,
    reason,
    isLoading,
    isSubmitLoading,
    isSubmitSuccess,
    handleSubmit,
    handleChangeReason,
  };
}