import { AvailabilitySlice, createAvailabilitySlice } from 'Availability'
import { AgendaSlice, createAgendaSlice } from 'Agenda'
import { create } from 'zustand'

export const useStore = create<AvailabilitySlice & AgendaSlice>((...a) => ({
  ...createAvailabilitySlice(...a),
  ...createAgendaSlice(...a),
}))