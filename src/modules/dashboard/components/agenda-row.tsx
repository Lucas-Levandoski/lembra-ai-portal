'use client';

import { AgendaElement, Button, Toggle } from 'Common'
import { BiTrash } from 'react-icons/bi';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoCopyOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge'
import { useAgenda } from '../hooks';

type props = {
  agenda: AgendaElement
}

export function AgendaRow({ agenda }: props) {
  const {colorName, isEnable, name, timeFrame} = agenda.details;
  const { onCopy, onToggleActive } = useAgenda();


  return (
    <div className='flex items-center min-h-12'>
      <span className={twMerge('h-4 w-4 rounded-full mr-8', `bg-${colorName}-500`)} />
      <strong>{name}</strong>
      <span className={twMerge('rounded-lg px-2 font-semibold ml-8', `bg-${colorName}-100 text-${colorName}-700`)}>{timeFrame} MIN</span>
      <div className='flex border-l ml-auto mr-0 items-center gap-6 pl-6'>
        <span className='flex gap-2 items-center w-32'>
          <Toggle onClick={() => onToggleActive(agenda.id)} state={isEnable} />
          <div className='relative flex items-center'>
            <span className={twMerge('opacity-0 absolute duration-200', isEnable && 'opacity-100')}>Ativo</span>
            <span className={twMerge('opacity-0 absolute duration-200', !isEnable && 'opacity-100')}>Inativo</span>
          </div>
        </span>
        <Button variant='icon' onClick={() => {}}><BiTrash className='size-6' /></Button>
        <Button variant='icon' className='p-1' onClick={() => {}}><HiOutlineAdjustmentsHorizontal className='size-8' /></Button>
        <Button variant='icon' className='text-blue-500 flex items-center gap-2' onClick={onCopy}><IoCopyOutline  className='size-8' />Copia link</Button>
      </div>
    </div>
  )
}