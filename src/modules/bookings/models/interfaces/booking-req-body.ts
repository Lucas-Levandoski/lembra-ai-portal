import { BookingDetails, BookingLocation } from '../types';
import { IAttendeeDetails } from './attendee';

export interface IBookingReqBody {
  details: BookingDetails;
  meetingLocation: BookingLocation;
  guestDetails: IAttendeeDetails;
}