'use client';

import { IShortAgendaProps } from 'Agenda/models';
import { getAgendasByUser } from 'Agenda/services';
import { readProfileByTag } from 'Profile/services';
import { IShortProfile } from 'Profile/models';

import { useEffect, useState } from 'react';


export function useListAgendas(userTag: string) {
  const [isLoading, setIsLoading] = useState(true);
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

      await getAgendas(userId);
    } finally {
      setIsLoading(false);
    }
  };

  const getAgendas = async (userId: string) => {
    if(!userId) return;

    await getAgendasByUser(userId)
      .then(_agendas => setAgendas(_agendas ? _agendas : []));
  };

  const getProfile = async () => {
    const _profile = await readProfileByTag(userTag);
    if(!_profile) return '';

    setProfile(_profile);

    return _profile.id;
  };

  return {
    isLoading,
    profile,
    agendas,
  };
}