'use client';

import { AgendaDetails } from 'Common';
import { FormEvent, useState } from 'react';
import { newMyAgenda } from '../services';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTemplates } from 'Message-Templates';

export function useNewAgenda() {
  const { push } = useRouter();
  const { onCommitTemplates } = useTemplates();

  const [agenda, setAgenda] = useState<AgendaDetails>({colorName: 'blue', isEnable: true, name: 'Nome da agenda', pictureUrl: 'https://i.am.useless', timeFrame: 30});
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const _agenda = await newMyAgenda(agenda).then((data) => {
      toast.success(`Agenda ${agenda.name} criada com sucesso`);
      return data;
    });

    if(_agenda) await onCommitTemplates(_agenda.id);

    await setTimeout(() => push('/portal/agenda'), 500);
  };

  const onChangeProperty = (propName: keyof AgendaDetails, value: any) => {
    setAgenda({...agenda, [propName]: value});
  };

  return {
    isLoading,
    agenda,
    onChangeProperty,
    onSubmit,
  };
}