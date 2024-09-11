import { IShortAgendaProps } from 'Agenda/models';
import { getAgendaByTag } from 'Agenda/services';
import { IShortProfile } from 'Profile/models';
import { readProfileByTag } from 'Profile/services';
import { parseParams } from 'query-params-parser';
import { FormEvent, useEffect, useState } from 'react';


export function useOnAttendeeInfo(userTag: string, agendaTag: string, date: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [profile, setProfile] = useState<IShortProfile>();
  const { time } = parseParams({ time: '' });

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
      
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

  };

  return {
    isLoading,
    profile,
    agenda,
    onSubmit,
  };
}
