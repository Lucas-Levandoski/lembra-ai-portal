'use client';

import { DaysOfWeek, deepClone, isEqual } from 'Common';
import { useStore } from 'Store';
import { IAvailabilityTime } from '../models';
import { getAvailabilities, setAvailabilities } from '../services';
import { toast } from 'react-toastify';



export function useAvailability() {
  const { 
    availability, 
    oldAvailability, 
    resetAvailability, 
    setAvailability, 
    setOldAvailability,
    setIsLoading,
    setIsEdited,
    isLoading,
    isEdited,
    setErroredItem,
    validity,
    // setValidity,
  } = useStore((state) => (
    {
      availability: state.availability,
      oldAvailability: state.oldAvailability,
      isEdited: state.isAvailabilityEdited,
      isLoading: state.isAvailabilityLoading,
      validity: state.validity,
      resetAvailability: state.resetAvailability,
      setAvailability: state.setAvailability,
      setOldAvailability: state.setOldAvailability,
      setIsLoading: state.setIsAvailabilityLoading,
      setIsEdited: state.setIsAvailabilityEdited,
      setErroredItem: state.setErroredItem,
      setValidity: state.setValidity,
    }
  ));

  const saveAvailability = async() => {
    if(!availability)
      return;

    const res = await setAvailabilities({ validity, availabilities: availability }, setErroredItem);

    if(res)
      setAvailability(res.availabilities);
  }

  const getAvailability = async(shouldSetLoading: boolean = false) => { 

    if(!availability || shouldSetLoading) setIsLoading(true);

    try {
      const availabilities = await getAvailabilities();
      setAvailability(deepClone(availabilities.availabilities));
      setOldAvailability(deepClone(availabilities.availabilities));
    } catch (e) {
      console.error(e);
      toast.error('Conexão falhou');
    } finally {
      setIsLoading(false);
    }
  };

  const removeAvailabilityTime = (day: DaysOfWeek, index: number) => {
    if(!availability) return;

    availability[day].times = availability[day].times.filter((_, i) => i !== index);

    setAvailability(availability);
    setIsEdited(!isEqual(availability, oldAvailability));
  };


  const editAvailabilityTime = (day: DaysOfWeek, index: number, time: IAvailabilityTime) => {
    if(!availability) return;

    availability[day].times[index] = time;

    setAvailability(availability);
    setIsEdited(!isEqual(availability, oldAvailability));
  };

  const addAvailabilityTime = (day: DaysOfWeek, time: IAvailabilityTime) => {
    if(!availability) return;

    availability[day].times.push(time);

    setAvailability(availability);
    setIsEdited(!isEqual(availability, oldAvailability));
  };

  const toggleEnableDay = (day: DaysOfWeek) => {
    if(!availability) return;

    availability[day].isEnable = !availability[day].isEnable;

    setAvailability(availability);
    setIsEdited(!isEqual(availability, oldAvailability));
  };


  return {
    availability,
    isLoading,
    isEdited,
    getAvailability,
    saveAvailability,
    removeAvailabilityTime,
    addAvailabilityTime,
    toggleEnableDay,
    resetAvailability,
    editAvailabilityTime
  }
}