import { BookingLocation, BookingStatus } from 'Bookings';
import { MessageTargets } from 'Message-Templates';

export type Booking = {
  id: string;
  pKey: string;

  details: {
    startDateTime: string,
    endDateTime: string,
    status: BookingStatus,
    rescheduleBookingId?: string,
    agendaId: string,
  };

  meetingLocation: {
    location: BookingLocation,
    url?: string,
  };

  person: {
    name: string,
    phoneNumber: string,
    otherInfo: string,
  };

  notifications: {
    [key in keyof typeof MessageTargets ]: any; //TODO: find a proper type for the notifications
  };
}