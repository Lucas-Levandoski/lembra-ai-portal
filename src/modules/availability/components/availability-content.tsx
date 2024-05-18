'use client';

import { Button, DaysOfWeek, useAuth } from 'Common'
import { AvailabilitiesByDay, DayOfWeek } from '../models'
import { AvailabilityItem } from './availability-item'
import { getAvailabilities } from '../services/scheduler'
import { useEffect, useState } from 'react';

export function AvailabilityContent() {

  const [availabilities, setAvailabilities] = useState<AvailabilitiesByDay>();
  const { isAuthenticated } = useAuth();

  useEffect(() => {

    if(isAuthenticated) 
      getAvailabilities().then(res => {
        setAvailabilities(res)
      });
    
  },[ isAuthenticated ])

  const order: DaysOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; 

  return (
    <div className='flex flex-col gap-4'>
      {
        availabilities &&
        order.map(day => (
          availabilities[day] &&
          <AvailabilityItem key={`availability-${day}`} content={availabilities[day]} label={DayOfWeek[day]} id={day} /> 
        ))
      }
      <div className='flex flex-row justify-end gap-4'>
        <Button variant='secondary'>Cancelar</Button>
        <Button onClick={() => getAvailabilities()} >Salvar</Button>
      </div>
    </div>
  )
}