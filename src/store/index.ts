import { AvailabilitySlice, createAvailabilitySlice } from 'Availability'
import { AgendaSlice, createAgendaSlice } from 'Agenda'
import { create } from 'zustand'
import { MessageTemplateSlice, createMessageTemplateSlice } from 'Message-Templates'

export const useStore = create<AvailabilitySlice & AgendaSlice & MessageTemplateSlice>((...a) => ({
  ...createAvailabilitySlice(...a),
  ...createAgendaSlice(...a),
  ...createMessageTemplateSlice(...a),
}))