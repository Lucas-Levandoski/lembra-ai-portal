'use client';

import { AgendaDetails } from 'Common';
import { FormEvent, useEffect, useState } from 'react';
import { readAgenda, updateAgenda } from '../services';
import { toast } from 'react-toastify';
import { useRouter  } from 'next/navigation';

export function useEditAgenda(agendaId: string) {
  const { push } = useRouter();

  const [agenda, setAgenda] = useState<AgendaDetails>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!agenda) setIsLoading(true);

    readAgenda(agendaId).then(res => {
      setAgenda(res?.details);
    }).finally(() => {
      setIsLoading(false);
    })
  },[])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!agenda) return;

    await updateAgenda(agendaId, agenda).then(() => {
      toast.success(`Agenda ${agenda.name} editada com sucesso`);
      setTimeout(() => {
        push('/portal/agenda');
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