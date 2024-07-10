import { AvailabilitySlice, createAvailabilitySlice } from 'Availability';
import { AgendaSlice, createAgendaSlice } from 'Agenda';
import { create } from 'zustand';
import { MessageTemplateSlice, createMessageTemplateSlice } from 'Message-Templates';
import { BookingsSlice, createBookingsSlice } from 'Bookings';

export const useStore = create<AvailabilitySlice & AgendaSlice & MessageTemplateSlice & BookingsSlice>((...a) => ({
  ...createAvailabilitySlice(...a),
  ...createAgendaSlice(...a),
  ...createMessageTemplateSlice(...a),
  ...createBookingsSlice(...a),
}));