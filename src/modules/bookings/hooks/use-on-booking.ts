'use client';

import { IShortAgendaProps } from 'Agenda/models';
import { getAgendasByUser } from 'Agenda/services';
import { readProfileByTag, IShortProfile } from 'Profile';
import { useEffect, useState } from 'react';


export function useOnBooking(userTag: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [agendas, setAgendas] = useState<IShortAgendaProps[]>([]);
  const [profile, setProfile] = useState<IShortProfile>();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    try {
      const userId = await getProfile();
      if(!userId) return;
      await getAgendaIds(userId);

    } finally {
      setIsLoading(false);
    }
  };

  const getAgendaIds = async (userId?: string) => {
    const id = userId ?? profile?.id;

    if(!id) return;

    const _agendas = await getAgendasByUser(id);

    if(!_agendas) return;

    setAgendas(_agendas);

  };

  const getProfile = async () => {
    const _profile = await readProfileByTag(userTag);

    if(!_profile) return ''; 

    setProfile(_profile);

    return _profile.id;
  };


  return {
    getAgendaIds,
    isLoading,
    profile,
    agendas,
  };
}