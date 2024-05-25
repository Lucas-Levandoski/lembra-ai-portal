'use client';

import { isHourMinuteValid, timeToDateISO } from 'Common';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IAvailabilityTime } from '../models';

type props = {
  onSubmit: (time?: IAvailabilityTime) => void;
}

export function useTimeItem({onSubmit}: props) {
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);

  const trySubmit = async(event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const validStart = isHourMinuteValid(timeStart);
    const validEnd = isHourMinuteValid(timeEnd);

    setIsStartValid(validStart);
    setIsEndValid(validEnd);

    if(validStart && validEnd)
      onSubmit({startTime: timeToDateISO(timeStart), endTime: timeToDateISO(timeEnd)});
  }

  const initTime = (start: string, end: string) => {
    setTimeStart(start);
    setTimeEnd(end);
  }

  const onChangeStartTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 

    if(value.length > 5) return;

    setTimeStart(value);
    setIsStartValid(true);
  }

  const onChangeEndTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target 

    if(value.length > 5) return;

    setTimeEnd(value)
    setIsEndValid(true);
  }

  const onCancel = () => {
    setTimeout(() => {
      setIsStartValid(true);
      setIsEndValid(true);

      setTimeStart('');
      setTimeEnd('');
    }, 500);

    onSubmit();
  }

  return {
    isStartValid,
    isEndValid,
    timeStart,
    timeEnd,
    onSubmit,
    onChangeStartTime,
    onChangeEndTime,
    onCancel,
    trySubmit,
    initTime,
  }
}