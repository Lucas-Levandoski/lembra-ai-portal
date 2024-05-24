'use client';

import { useState } from 'react';
import { useAvailability } from '.';
import { IAvailabilityTime } from '../models';
import { DaysOfWeek } from 'Common';


export function useAvailabilityItem() {
  const { editAvailabilityTime, addAvailabilityTime } = useAvailability();

  const [isAddOpen, setIsAddOpen] = useState(false);

  
  const toggleAdd = () => {
    setIsAddOpen(state => !state);
  }

  const onEdit = (day: DaysOfWeek ,index: number) => (item?: IAvailabilityTime) => {
    if(item)
      editAvailabilityTime(day, index, item);
  }

  const onAdd = (day: DaysOfWeek) => (item?: IAvailabilityTime) => {
    if(item)
      addAvailabilityTime(day, item);

    setIsAddOpen(false);
  }

  return {
    isAddOpen,
    toggleAdd,
    onEdit,
    onAdd,
  }
}