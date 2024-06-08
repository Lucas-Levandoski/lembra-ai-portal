'use client';

import { AgendaDetails } from 'Common';
import { FormEvent, useEffect, useState } from 'react';
import { readAgenda, updateAgenda } from '../services';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export function useEditAgenda() {
  const router = useRouter();


  const [agenda, setAgenda] = useState<AgendaDetails>();
  const [agendaId, setAgendaId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const { agendaId: _agendaId } = router.query as { agendaId: string };

      setAgendaId(_agendaId);

      readAgenda(_agendaId).then(res => {
        setAgenda(res?.details);
      }).finally(() => {
        setIsLoading(false);
      })
    }

  },[router.isReady])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!agenda || !agendaId) return;

    await updateAgenda(agendaId, agenda).then(() => {
      toast.success(`Agenda ${agenda.name} criada com sucesso`);
      setTimeout(() => {
        router.push('/portal/agenda');
      }, 1000);
    });
  }

  const onChangeProperty = (propName: keyof AgendaDetails, value: any) => {
    if(!agenda) return;

    setAgenda({...agenda, [propName]: value});
  }

  return {
    isLoading,
    agenda,
    onChangeProperty,
    onSubmit,
  }
}