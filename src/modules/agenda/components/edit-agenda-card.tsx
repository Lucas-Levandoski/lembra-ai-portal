'use client';

import { AvailableColors, TimeFrameOptions } from 'Agenda';
import { AgendaDetails, Button, Select, maskMinutes, Option, BouncingThreeDotsLoading } from 'Common';
import { MessageTemplatesBoxView } from 'Message-Templates';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type props = {
  details: AgendaDetails;
  agendaId?: string;
  onChange: (propName: keyof AgendaDetails, value: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isSubmitLoading: boolean;
}

export function EditAgendaCard({ onChange, details, agendaId, onSubmit, isSubmitLoading }: props) {
  const { push } = useRouter();
  const { colorName, name, timeFrame } = details;

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="mt-0 mb-6 font-bold">Editar Agenda</h2>
      <form className="flex gap-6 flex-col" onSubmit={onSubmit}>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-sm">Nome da agenda</label>
            <input
              className="p-2 border-2 border-gray-200 h-12 rounded-lg"
              id="name"
              type="text"
              value={name}
              onChange={(event) => onChange('name', event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-32">
            <label htmlFor="timeFrame" className="text-sm">Duração</label>
            <Select
              id="timeFrame"
              value={timeFrame}
              onChange={(value) => onChange('timeFrame', value)} 
            >
              {
                TimeFrameOptions.map(option => (
                  <Option key={`time-frame-${option}`} value={option}>
                    <div className="mx-auto">{maskMinutes(option)}</div>
                  </Option>
                ))
              }
            </Select>
          </div>
          <div className="flex flex-col gap-2 w-24">
            <label htmlFor="colorName" className="text-sm">Tema</label>
            <Select 
              value={colorName} 
              id="colorName" 
              onChange={(value) => onChange('colorName', value)}
            >
              {
                AvailableColors.map(color => (
                  <Option key={`color-${color}`} value={color}>
                    <div className={twMerge('size-5 rounded-full mx-auto', `bg-${color}-500`)} />
                  </Option>
                ))
              }
            </Select>
          </div>
        </div>
        <MessageTemplatesBoxView key={agendaId} agendaId={agendaId} />
        <div className="flex justify-end gap-3">
          <Button disabled={isSubmitLoading} variant="secondary" onClick={() => push('/portal/agenda')}>Cancelar</Button>
          <Button disabled={isSubmitLoading} variant="primary" type="submit">{
            isSubmitLoading 
              ? <BouncingThreeDotsLoading variant="secondary" />
              : (agendaId ? 'Confirmar' : 'Criar Agenda')
          }</Button>
        </div>
      </form>
    </div>
  );
}