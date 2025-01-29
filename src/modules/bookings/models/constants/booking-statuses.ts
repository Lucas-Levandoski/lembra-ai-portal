import { BookingStatus } from '../types';


export const bookingStatusTexts: {[key in BookingStatus]: string} = {
  booked: 'Agendado',
  ['no-show']: 'No Show',
  show: 'Show',
  canceled: 'Cancelado',
  rescheduled: 'Reagendado',
  unanswered: 'Sem Resposta',
};