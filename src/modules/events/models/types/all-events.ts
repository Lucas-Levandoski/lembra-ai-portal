import { BookingEntity, BookingStatus } from 'Bookings/models';

export type AllEvents = {
  [k in BookingStatus]: BookingEntity[];
}