import { BookingStatus } from '..';

export type CountBookingsByStatus = {
  [k in BookingStatus]: number;
}