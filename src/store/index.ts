import { AvailabilitySlice, createAvailabilitySlice } from 'Availability'
import { create } from 'zustand'

export const useStore = create<AvailabilitySlice>((...a) => ({
  ...createAvailabilitySlice(...a),
}))