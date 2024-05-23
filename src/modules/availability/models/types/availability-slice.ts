/* eslint-disable no-unused-vars */
import { DaysOfWeek } from 'Common';
import { AvailabilitiesByDay } from '.'
import { IAvailabilityTime } from '..';

export type AvailabilitySlice = {
  isCurrentAvailabilityLoading: boolean;
  isAvailabilityEdited: boolean;
  currentAvailability?: AvailabilitiesByDay;
  oldAvailability?: AvailabilitiesByDay;
  getAvailability: () => Promise<void>; 
  removeAvailabilityTime: (day: DaysOfWeek, index: number) => void;
  addAvailabilityTime: (day: DaysOfWeek, time: IAvailabilityTime) => void;
  toggleEnableDay: (day: DaysOfWeek) => void;
  resetAvailability: () => void;
}