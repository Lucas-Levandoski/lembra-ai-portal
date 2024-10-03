import { BookingLocations, BookingStatus, IAttendeeDetails } from 'Bookings';
import { MessageTargets } from 'Message-Templates';

export type BookingDetails = {
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
  rescheduleBookingId?: string;
  sourceBookingId?: string;
}

export type BookingLocation = {
  location: BookingLocations;
  url?: string;
}


export type BookingEntity = {
  id: string;
  agendaId: string;

  // pKey is userId from Azure AAD
  pKey: string;

  details: BookingDetails;

  meetingLocation: BookingLocation;

  guestDetails: IAttendeeDetails;

  notifications: {
    [key in keyof typeof MessageTargets ]: any; //TODO: find a proper type for the notifications
  };
}