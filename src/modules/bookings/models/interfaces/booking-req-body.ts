import { BookingDetails, BookingLocations } from '../types';
import { IAttendeeDetails } from './attendee';

export interface IBookingReqBody {
  details: BookingDetails;
  meetingLocation: BookingLocations;
  guestDetails: IAttendeeDetails;
}