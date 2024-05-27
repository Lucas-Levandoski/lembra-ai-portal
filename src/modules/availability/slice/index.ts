

import { StateCreator } from 'zustand';
import { AvailabilitySlice } from '../models/types/availability-slice';
import { deepClone } from 'Common';

export const createAvailabilitySlice: StateCreator<AvailabilitySlice> = (set) => ({
  availability: undefined,
  oldAvailability: undefined,
  erroredItem: undefined,
  isAvailabilityEdited: false,
  isAvailabilityLoading: false,
  validity: 60,

  setValidity: (validity) => set(() => ({ validity })),
  setAvailability: (availability) => set(() => ({ availability })),
  setOldAvailability: (oldAvailability) => set(() => ({ oldAvailability })),
  setIsAvailabilityEdited: (isAvailabilityEdited) => set(() => ({ isAvailabilityEdited })),
  setIsAvailabilityLoading: (isAvailabilityLoading) => set(() => ({ isAvailabilityLoading })),
  setErroredItem: (erroredItem) => set(() => ({ erroredItem })),

  cleanErroredItem: () => set(() => ({ erroredItem: undefined })),
  resetAvailability: () => {
    set(state => ({ availability: deepClone(state.oldAvailability), isAvailabilityEdited: false }))
  }
})