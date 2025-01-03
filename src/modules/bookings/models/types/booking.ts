import { BookingLocations, BookingStatus, IAttendeeDetails } from 'Bookings';
import { MessageTargets } from 'Message-Templates';

export type BookingDetails = {
  date: string;
  time: string;
  duration: string;
  status: BookingStatus;
  rescheduleBookingId?: string;
  rescheduledBooking?: BookingDetails;
  sourceBookingId?: string;
}

export type BookingLocation = {
  location: BookingLocations;
  url?: string;
}

export type BookingNotification = {
  id: string;
  notificationId?: string;
  content?: string;
  html?: string;
  minutesToMeeting: number;
  status: NotificationStatuses;
  errorMessage?: string;
}

export type NotificationStatuses = 'in-progress' | 'success' | 'fail' | 'canceled';

export type BookingNotifications = {
  [key in keyof typeof MessageTargets ]?: BookingNotification[];
}

export type BookingEntity = {
  id: string;
  agendaId: string;

  // pKey is userId from Azure AAD
  pKey: string;

  details: BookingDetails;

  meetingLocation: BookingLocation;

  guestDetails: IAttendeeDetails;

  notifications: BookingNotifications;
}