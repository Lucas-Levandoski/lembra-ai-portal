import { BookingDetails, BookingLocation } from '../types';
import { IAttendeeDetails } from './attendee';

export interface IBookingReqBody {
  details: BookingDetails;
  meetingLocation: BookingLocation;
  guestDetails: IAttendeeDetails;
}

export interface IReScheduleReqBody {
  oldBookingId: string;
  date: string;
  time: string;
  duration: string;
  reason?: string;
}