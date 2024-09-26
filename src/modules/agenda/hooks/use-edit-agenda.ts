'use client';

import { AgendaDetails } from 'Common';
import { FormEvent, useEffect, useState } from 'react';
import { readMyAgenda, updateMyAgenda } from '../services';
import { toast } from 'react-toastify';
import { useRouter  } from 'next/navigation';
import { useTemplates } from 'Message-Templates';
import { calculateMyAvailableTimes } from 'Bookings/services';

export function useEditAgenda(agendaId: string) {
  const { push } = useRouter();
  const { onCommitTemplates } = useTemplates();

  const [agenda, setAgenda] = useState<AgendaDetails>();
  const [isLoading, setIsLoading] = useState(true);

  let initialTimeframe: number; 

  useEffect(() => {
    if(!agenda) setIsLoading(true);

    readMyAgenda(agendaId).then(res => {
      setAgenda(res!.details);
      initialTimeframe = res!.details.timeFrame;
    }).finally(() => {
      setIsLoading(false);
    });
  },[]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!agenda) return;

    await updateMyAgenda(agendaId, agenda).then(() => {
      toast.success(`Agenda ${agenda.name} editada com sucesso`);
    });

    await onCommitTemplates(agendaId);

    if(initialTimeframe !== agenda.timeFrame)
      await calculateMyAvailableTimes().then(() => {
        toast.success('Horários disponíveis recalculados com sucesso');
      });

    setTimeout(() => push('/portal/agenda'), 500);
  };

  const onChangeProperty = (propName: keyof AgendaDetails, value: any) => {
    if(!agenda) return;

    let _value: any;

    switch(typeof agenda[propName]) {
      case 'number':
        _value = +value;
        break;
      case 'boolean':
        _value = value == 'true';
        break;
      default:
        _value = value;
    }

    setAgenda({...agenda, [propName]: _value});
  };

  return {
    isLoading,
    agenda,
    onChangeProperty,
    onSubmit,
  };
}