import { IShortAgendaProps } from 'Agenda';
import { BookingEntity } from 'Bookings/models';

export type EventDetails = {
  bookingEntity: BookingEntity;
  agendaEntity: IShortAgendaProps;
}