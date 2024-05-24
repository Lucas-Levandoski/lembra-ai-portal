

import { StateCreator } from 'zustand';
import { AvailabilitySlice } from '../models/types/availability-slice';
import { deepClone } from 'Common';

export const createAvailabilitySlice: StateCreator<AvailabilitySlice> = (set) => ({
  availability: undefined,
  oldAvailability: undefined,
  isAvailabilityEdited: false,
  isAvailabilityLoading: false,

  setAvailability: (availability) => set(() => ({ availability })),
  setOldAvailability: (oldAvailability) => set(() => ({ oldAvailability })),
  setIsAvailabilityEdited: (isAvailabilityEdited) => set(() => ({ isAvailabilityEdited })),
  setIsAvailabilityLoading: (isAvailabilityLoading) => set(() => ({ isAvailabilityLoading })),

  resetAvailability: () => {
    set(state => ({ availability: deepClone(state.oldAvailability), isAvailabilityEdited: false }))
  }
})