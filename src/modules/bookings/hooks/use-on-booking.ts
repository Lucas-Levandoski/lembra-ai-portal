'use client';

import { IShortAgendaProps } from 'Agenda/models';
import { getAgendasByUser } from 'Agenda/services';
import { readProfileByTag, IShortProfile } from 'Profile';
import { useEffect, useState } from 'react';


export function useOnBooking(userTag: string, agendaTag?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
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

      const _agendas = await getAgendas(userId);
      if(agendaTag && _agendas) await getAgenda(_agendas, agendaTag);

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

  const getAgenda = async (_agendas: IShortAgendaProps[], _agendaTag: string) => {
    const agendaFound = _agendas.find(_agenda => _agenda.tag === _agendaTag);

    setAgenda(agendaFound);
  };

  return {
    getAgendaIds: getAgenda,
    isLoading,
    profile,
    agendas,
    agenda,
  };
}