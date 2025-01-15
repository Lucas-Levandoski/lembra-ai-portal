import { IShortAgendaProps } from 'Agenda/models';
import { BookingEntity } from 'Bookings/models';

export type EventDetails = {
  bookingEntity: BookingEntity;
  agendaEntity: IShortAgendaProps;
}