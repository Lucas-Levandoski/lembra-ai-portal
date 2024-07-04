'use client';

import { useState } from 'react';
import { useAvailability } from '.';
import { IAvailabilityTime } from '../models';
import { DaysOfWeek } from 'Common';
import { useStore } from 'Store';


export function useAvailabilityTime() {
  const { editAvailabilityTime, addAvailabilityTime } = useAvailability();

  const { erroredItem, cleanErroredItem } = useStore((state) => ({ erroredItem: state.erroredItem, cleanErroredItem: state.cleanErroredItem }));

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [addConfig, setAddConfig] = useState<DaysOfWeek>();
  const [editConfig, setEditConfig] = useState<{day: DaysOfWeek, index: number, time: IAvailabilityTime}>();
  const [initStartTime, setInitStartTime] = useState('09:00');
  const [initEndTime, setInitEndTime] = useState('12:00');

  const onAdd = (item?: IAvailabilityTime) => {
    // if empty it just closes add
    if(item && addConfig)
      addAvailabilityTime(addConfig, item);

    setIsAddOpen(false);
  };

  const onEdit = (item?: IAvailabilityTime) => {
    // if empty it just closes edit
    if(item && editConfig)
      editAvailabilityTime(editConfig.day, editConfig.index, item);

    if (
      erroredItem && 
      editConfig &&
      erroredItem?.day === editConfig.day &&
      erroredItem?.index === editConfig?.index
    ) cleanErroredItem();

    setIsEditOpen(false);
  };

  const onAddClick = (day: DaysOfWeek) => {
    setAddConfig(day);

    setInitStartTime('09:00');
    setInitEndTime('12:00');

    setIsAddOpen(true);
  };

  const onEditClick = (day: DaysOfWeek ,index: number, time: IAvailabilityTime) => {
    setEditConfig({day, index, time});

    setInitStartTime(time.startTime);
    setInitEndTime(time.endTime);

    setIsEditOpen(true);
  };

  const onCancel = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
  };

  return {
    isAddOpen,
    isEditOpen,
    initStartTime,
    initEndTime,
    onEdit,
    onAdd,
    onAddClick,
    onEditClick,
    onCancel,
  };
}