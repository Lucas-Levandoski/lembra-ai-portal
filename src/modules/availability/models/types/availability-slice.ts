/* eslint-disable no-unused-vars */
import { DaysOfWeek } from 'Common';
import { AvailabilitiesByDay } from '.';

export type AvailabilitySlice = {
  validity: number;
  availability?: AvailabilitiesByDay;
  oldAvailability?: AvailabilitiesByDay;
  isAvailabilityEdited: boolean;
  isAvailabilityLoading: boolean;
  erroredItem?: { day: DaysOfWeek, index: number };

  setValidity: (value: number) => void;
  setAvailability: (obj: AvailabilitiesByDay) => void;
  setOldAvailability: (obj: AvailabilitiesByDay) => void;
  setIsAvailabilityEdited: (isAvailabilityEdited: boolean) => void;
  setIsAvailabilityLoading: (isAvailabilityLoading: boolean) => void;
  setErroredItem: (isAvailabilityLoading: { day: DaysOfWeek, index: number }) => void;
  cleanErroredItem: () => void;

  resetAvailability: () => void;
}