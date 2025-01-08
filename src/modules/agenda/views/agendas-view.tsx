'use client';

import { useEffect } from 'react';
import { CalendarColumn, UserInfo, Agendas } from '../components';
import { useAgenda } from '../hooks';

export function AgendasView() {
  const { getAgendas } = useAgenda();

  useEffect(() => {
    getAgendas();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="flex flex-col col-span-9 gap-8"> 
        <UserInfo /> 
        <Agendas />
      </div>
      <div className="col-span-3">
        <CalendarColumn />
      </div>
    </div>
  );
}