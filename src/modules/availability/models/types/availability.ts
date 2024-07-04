import { AvailabilitiesByDay } from '.';

export type Availability = {
  validity: number;
  availabilities: AvailabilitiesByDay;
}