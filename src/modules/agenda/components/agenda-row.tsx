'use client';

import { AgendaElement, Button, TimeCard, Toggle } from 'Common'
import { BiTrash } from 'react-icons/bi';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoCopyOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

type props = {
  agenda: AgendaElement,
  onToggleActive: (agendaId: string) => void;
  onCopy: (agendaName: string) => void;
}

export function AgendaRow({ agenda, onCopy, onToggleActive }: props) {
  const {colorName, isEnable, name, timeFrame} = agenda.details;

  return (
    <div className='flex items-center min-h-12'>
      <span className={twMerge('h-4 w-4 rounded-full mr-8', `bg-${colorName}-500`)} />
      <strong>{name}</strong>
      <TimeCard colorName={colorName} timeFrame={timeFrame} className='ml-8'/>
      <div className='flex border-l ml-auto mr-0 items-center gap-6 pl-6'>
        <span className='flex gap-2 items-center w-32'>
          <Toggle onClick={() => onToggleActive(agenda.id)} state={isEnable} />
          <div className='relative flex items-center'>
            <span className={twMerge('opacity-0 absolute duration-200', isEnable && 'opacity-100')}>Ativo</span>
            <span className={twMerge('opacity-0 absolute duration-200', !isEnable && 'opacity-100')}>Inativo</span>
          </div>
        </span>
        <Button variant='icon' onClick={() => {}}><BiTrash className='size-6' /></Button>
        <Button variant='icon' className='p-1' route={`/portal/agenda/edit/${agenda.id}`}><HiOutlineAdjustmentsHorizontal className='size-8' /></Button>
        <Button variant='icon' className='text-blue-500 flex items-center gap-2' onClick={() => onCopy(name)}><IoCopyOutline  className='size-8' />Copia link</Button>
      </div>
    </div>
  )
}