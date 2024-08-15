'use client';

import { IShortAgendaProps } from 'Agenda/models';
import { getAgendasByUser } from 'Agenda/services';
import { IDateTimes } from 'Bookings';
import { listAvailableDatesAndTimes } from 'Bookings/services';
import { readProfileByTag, IShortProfile } from 'Profile';
import { useEffect, useState } from 'react';


export function useOnBooking(userTag: string, agendaTag?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [agendas, setAgendas] = useState<IShortAgendaProps[]>([]);
  const [profile, setProfile] = useState<IShortProfile>();
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<IDateTimes>({});
  const [selectedDate, setSelectedDate] = useState<string>();
  const [timesForDate, setTimesForDate] = useState<string[]>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    try {
      const userId = await getProfile();
      if(!userId) return;

      const _agendas = await getAgendas(userId);
      if(agendaTag && _agendas) {
        const foundAgenda = getAgenda(_agendas, agendaTag);

        if(foundAgenda)
          await getAvailabeDates(userId, foundAgenda.id);
      } 

    } finally {
      setIsLoading(false);
    }
  };

  const getAgendas = async (userId?: string) => {
    const id = userId ?? profile?.id;

    if(!id) return;

    const _agendas = await getAgendasByUser(id);
    if(!_agendas) return;

    setAgendas(_agendas);

    return _agendas;
  };

  const getProfile = async () => {
    const _profile = await readProfileByTag(userTag);
    if(!_profile) return '';

    setProfile(_profile);

    return _profile.id;
  };

  const getAvailabeDates = async (userId: string, agendaId: string) => {
    const { dates, times } = await listAvailableDatesAndTimes(userId, agendaId);

    if(!dates || !times) return;

    setAvailableDates(dates);
    setAvailableTimes(times);
  };

  const getAgenda = (_agendas: IShortAgendaProps[], _agendaTag: string): IShortAgendaProps | undefined => {
    const agendaFound = _agendas.find(_agenda => _agenda.tag === _agendaTag);

    if(!agendaFound) return;

    setAgenda(agendaFound);

    return agendaFound;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);

    setTimesForDate(availableTimes[date]);
  };

  return {
    getAgenda,
    isLoading,
    profile,
    agendas,
    agenda,
    availableDates,
    availableTimes,
    selectedDate,
    timesForDate,
    handleDateChange,
  };
}