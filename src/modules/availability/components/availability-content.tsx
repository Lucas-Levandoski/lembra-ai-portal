'use client';

import { BouncingDotsLoading, Button, DaysOfWeek } from 'Common'
import { DayOfWeek } from '../models'
import { AvailabilityItem } from './availability-item'
import { getAvailabilities } from '../services/scheduler'
import { useStore } from 'Store';
import { useEffect } from 'react';

export function AvailabilityContent() {
  const { getAvailability, currentAvailability, isAvailabilityEdited } = useStore();

  const order: DaysOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; 

  useEffect(() => {
    getAvailability();
  }, [])

  return (
    <div className='flex flex-col gap-4'>
      {
        currentAvailability
          ? (
            order.map(day => (
              currentAvailability[day] &&
              <AvailabilityItem key={`availability-${day}`} content={currentAvailability[day]} label={DayOfWeek[day]} day={day} /> 
            ))
          )  
          : (
            <div className='m-auto'>
              <BouncingDotsLoading />
            </div>
          )
      }
      <div className='flex flex-row justify-end gap-4'>
        <Button disabled={!isAvailabilityEdited} variant='secondary'>Cancelar</Button>
        <Button disabled={!isAvailabilityEdited} onClick={() => getAvailabilities()} >Salvar</Button>
      </div>
    </div>
  )
}