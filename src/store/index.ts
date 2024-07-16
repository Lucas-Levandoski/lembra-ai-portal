import { AvailabilitySlice, createAvailabilitySlice } from 'Availability';
import { AgendaSlice, createAgendaSlice } from 'Agenda';
import { create } from 'zustand';
import { MessageTemplateSlice, createMessageTemplateSlice } from 'Message-Templates';
import { BookingsSlice, createBookingsSlice } from 'Bookings';
import { ProfileSlice, createProfileSlice } from 'Profile';

export const useStore = create<AvailabilitySlice & AgendaSlice & MessageTemplateSlice & BookingsSlice & ProfileSlice>((...a) => ({
  ...createAvailabilitySlice(...a),
  ...createMessageTemplateSlice(...a),
  ...createAgendaSlice(...a),
  ...createBookingsSlice(...a),
  ...createProfileSlice(...a),
}));