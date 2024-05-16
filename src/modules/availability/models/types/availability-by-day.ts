/* eslint-disable no-unused-vars */
import { DaysOfWeek } from 'Common';
import { IAvailabilityItem } from '..';

export type AvailabilitiesByDay = {
  [k in DaysOfWeek]: IAvailabilityItem;
}