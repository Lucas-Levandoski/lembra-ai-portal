'use client';

import { TimeFrameOptions } from 'Agenda';
import { AgendaDetails, Button, maskMinutes } from 'Common'
import { MessageTemplatesBoxView } from 'Message-Templates';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';

type props = {
  details: AgendaDetails;
  onChange: (propName: keyof AgendaDetails, value: any) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isEdit?: boolean;
}

export function EditAgendaCard({ onChange, details, onSubmit, isEdit = false }: props) {
  const { push } = useRouter()
  const { colorName, name, timeFrame } = details;
  
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <h2 className="mt-0 mb-6 font-bold">Nova Agenda</h2>
      <form className="flex gap-3 flex-col" onSubmit={onSubmit}>
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-sm">Nome da agenda</label>
            <input
              className="p-3 border-2 border-gray-200 bg-gray-50 rounded-lg"
              id="name"
              type="text"
              value={name}
              onChange={(event) => onChange('name', event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-28">
            <label htmlFor="timeFrame" className="text-sm">Duração</label>
            <select
              id="timeFrame"
              className="p-3 border-2 border-gray-200 bg-gray-50 rounded-lg"
              value={timeFrame}
              onChange={(event) => onChange('timeFrame', event.target.value)} 
            >
              {
                TimeFrameOptions.map(option => (
                  <option key={`time-frame-${option}`} value={option}>
                    {maskMinutes(option)}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="flex flex-col gap-2 w-20">
            <label htmlFor="colorName" className="text-sm">Tema</label>
            <select
              id="colorName"
              className="p-3 border-2 border-gray-200 bg-gray-50 rounded-lg"
              value={colorName}
              onChange={(event) => onChange('colorName', event.target.value)} 
            >
              {
                ['blue', 'green', 'red'].map(color => (
                  <option key={`color-${color}`} value={color} className={twMerge('h-4 w-4 rounded-full mr-8', `bg-${color}-500`)}>
                    {color}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <MessageTemplatesBoxView />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => push('/portal/agenda')}>Cancelar</Button>
          <Button variant="primary" type="submit">{isEdit ? 'Confirmar' : 'Criar Agenda'}</Button>
        </div>
      </form>
    </div>
  )
}