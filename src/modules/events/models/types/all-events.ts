import { BookingStatus } from 'Bookings/models';
import { EventDetails } from './event-details';

export type AllEvents = {
  [k in BookingStatus]: EventDetails[];
}