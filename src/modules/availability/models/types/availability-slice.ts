/* eslint-disable no-unused-vars */
import { AvailabilitiesByDay } from '.'

export type AvailabilitySlice = {
  availability?: AvailabilitiesByDay;
  oldAvailability?: AvailabilitiesByDay;
  isAvailabilityEdited: boolean;
  isAvailabilityLoading: boolean;


  setAvailability: (obj: AvailabilitiesByDay) => void;
  setOldAvailability: (obj: AvailabilitiesByDay) => void;
  setIsAvailabilityEdited: (isAvailabilityEdited: boolean) => void;
  setIsAvailabilityLoading: (isAvailabilityLoading: boolean) => void;

  resetAvailability: () => void;
}