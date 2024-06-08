'use client';

import { AgendaDetails } from 'Common';
import { FormEvent, useState } from 'react';
import { newAgenda } from '../services';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function useNewAgenda() {
  const { push } = useRouter();

  const [agenda, setAgenda] = useState<AgendaDetails>({colorName: 'blue', isEnable: true, name: 'Nome da agenda', pictureUrl: 'https://i.am.useless', timeFrame: 30});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await newAgenda(agenda).then(() => {
      toast.success(`Agenda ${agenda.name} criada com sucesso`);
      setTimeout(() => {
        push('/portal/agenda');
      }, 1000);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const onChangeProperty = (propName: keyof AgendaDetails, value: any) => {
    setAgenda({...agenda, [propName]: value});
  }

  return {
    isLoading,
    agenda,
    onChangeProperty,
    onSubmit,
  }
}