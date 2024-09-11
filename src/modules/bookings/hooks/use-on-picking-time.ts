'use client';

import { IShortAgendaProps } from 'Agenda/models';
import { getAgendaByTag } from 'Agenda/services';
import { IDateTimes } from 'Bookings';
import { listAvailableDatesAndTimes } from 'Bookings/services';
import { readProfileByTag, IShortProfile } from 'Profile';
import { useEffect, useState } from 'react';


export function useOnPickingTime(userTag: string, agendaTag: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [profile, setProfile] = useState<IShortProfile>();
  const [availabilities, setAvailabilities] = useState<{ dates: string[], times: IDateTimes }>({ dates: [], times: {} });
  const [selected, setSelected] = useState<{ date: string, timeIndex: number, time: string}>({ date: new Date().toISOString(), timeIndex: -1, time: ''});

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    try {
      const userId = await getProfile();
      if(!userId) return;

      const agendaId = await getAgenda(userId);
      if(!agendaId) return;

      await getAvailabilities(userId, agendaId);

    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async() => {
    const _profile = await readProfileByTag(userTag);
    if(!_profile) return '';

    setProfile(_profile);
    return _profile.id;
  };

  const getAgenda = async (userId: string) => {
    const _agenda = await getAgendaByTag(userId, agendaTag);
    if(!_agenda) return;

    setAgenda(_agenda);
    return _agenda.id;
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

  return {
    isLoading,
    profile,
    agenda,
    availabilities,
    selected,
    handleDateChange,
    handleSelectedTime,
  };
}