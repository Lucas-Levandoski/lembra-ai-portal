'use client';

import { useEffect } from 'react';
import { Calendar, UserInfo, Agendas } from '../components';
import { useAgenda } from '../hooks';

export function AgendasView() {
  const { getAgendas } = useAgenda();

  useEffect(() => {
    getAgendas();
  }, []);

  return (
    <div className="grid grid-cols-7 gap-6">
      <div className="flex flex-col col-span-5 gap-8">
        <UserInfo /> 
        <Agendas />
      </div>
      <div className="col-span-2">
        <Calendar />
      </div>
    </div>
  );
}