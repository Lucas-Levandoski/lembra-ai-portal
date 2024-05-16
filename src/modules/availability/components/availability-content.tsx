import { Button, DaysOfWeek } from 'Common'
import { AvailabilitiesByDay, DayOfWeek } from '../models'
import { AvailabilityItem } from './availability-item'

export function AvailabilityContent() {
  const obj: AvailabilitiesByDay = {
    sunday: { isEnable: true, times: [ 
      {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' },
      {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' },
      {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' },
      {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' },
      {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' },
    ] },
    monday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
    tuesday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
    wednesday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
    thursday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
    friday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
    saturday: { isEnable: true, times: [ {endTime: '2024-05-30T14:15:56', startTime: '2024-12-25T21:02:41' } ] },
  }

  return (
    <div className='flex flex-col gap-4'>
      {
        Object.entries(obj).map(([key, value]) => (
          <AvailabilityItem key={`availability-${key}`} content={value} label={DayOfWeek[key as DaysOfWeek]} id={key as DaysOfWeek} /> 
        ))
      }
      <div className='flex flex-row justify-end gap-4'>
        <Button variant='secondary'>Cancelar</Button>
        <Button>Salvar</Button>
      </div>
    </div>
  )
}