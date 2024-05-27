'use client';

import { Button, CirclyingFourDotsLoading, DaysOfWeek, ErrorMessage } from 'Common'
import { AvailabilitiesByDay, DayOfWeek } from '../models'
import { RowItem, TimeDialog } from '.'
import { BiRefresh } from 'react-icons/bi';
import { useAvailability, useAvailabilityTime } from '../hooks';

export function AvailabilityContent() {
  const { 
    availability, 
    isEdited, 
    isLoading,
    resetAvailability,
    saveAvailability,
    getAvailability,
  } = useAvailability();

  return (
    <div className='flex flex-col gap-4 relative'>
      <Button variant='icon' className='absolute -top-8 right-1 p-0' onClick={() => getAvailability()}>
        <BiRefresh className='text-blue-600 size-8' />
      </Button>
      {
        availability && !isLoading
          ? <AvailabilityList availability={availability} />
          : (
            isLoading 
              ? <div className='m-auto'><CirclyingFourDotsLoading /></div>
              : <ErrorMessage message='Falha ao carregar disponibilidades, por favor tente novamente' />
          )
      }
  
      <div className='flex flex-row justify-end gap-4'>
        <Button disabled={!isEdited || isLoading} onClick={() => resetAvailability()} variant='secondary'>Cancelar</Button>
        <Button disabled={!isEdited || isLoading} onClick={() => saveAvailability()} >Salvar</Button>
      </div>
    </div>
  )
}

type props = {
  availability: AvailabilitiesByDay;
}

function AvailabilityList({ availability }: props) {
  const { 
    isAddOpen,
    isEditOpen,
    initStartTime,
    initEndTime,
    onAddClick,
    onEditClick,
    onAdd,
    onEdit,
    onCancel,
  } = useAvailabilityTime();
  
  const order: DaysOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; 

  return (
    <>
      {
        order.map(day => (
          <RowItem
            key={`availability-${day}`} 
            content={availability[day]} 
            label={DayOfWeek[day]} day={day}
            onEditClick={onEditClick} 
            onAddClick={onAddClick}/> 
        ))
      }

      <TimeDialog 
        isOpen={isAddOpen} 
        onSubmit={onAdd}
        onCancel={onCancel}
        currentStart={initStartTime}
        currentEnd={initEndTime}
      />

      <TimeDialog 
        isOpen={isEditOpen} 
        onSubmit={onEdit}
        onCancel={onCancel}
        currentStart={initStartTime}
        currentEnd={initEndTime}
      />
    </>
  )
}