import { BookingDetails } from 'Bookings/models';

export function FlattenReschedules(details?: BookingDetails): BookingDetails[] {
  if(!details) return [];

  if(!details.rescheduledBooking) return [details];

  details = {...details};

  const tempDetails = details.rescheduledBooking;

  delete details.rescheduledBooking;

  return [details, ...FlattenReschedules(tempDetails)];
}