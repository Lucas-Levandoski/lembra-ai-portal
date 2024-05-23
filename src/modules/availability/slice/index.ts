

import { StateCreator } from 'zustand';
import { AvailabilitySlice } from '../models/types/availability-slice';
import { getAvailabilities } from '../services/scheduler';
import { isEqual } from 'Common';

export const createAvailabilitySlice: StateCreator<AvailabilitySlice> = (set) => ({
  isCurrentAvailabilityLoading: false,
  isAvailabilityEdited: false,
  
  getAvailability: async() => { 
    set(() => ({ isCurrentAvailabilityLoading: true }));
    const availabilities = await getAvailabilities();
    if (availabilities)
      set(() => ({ currentAvailability: {...availabilities}, oldAvailability: {...availabilities} }));

    set(() => ({ isCurrentAvailabilityLoading: false}))
  },

  removeAvailabilityTime: (day, index) => {
    set(state => {
      const updated = state.currentAvailability!;

      updated[day].times = updated[day].times.filter((_, i) => i !== index);

      return {
        isAvailabilityEdited: !isEqual(state.oldAvailability, updated),
        currentAvailability: updated
      }
    })
  },

  addAvailabilityTime: (day, time) => {
    set(state => {
      const updated = state.currentAvailability!;

      updated[day].times.push(time);

      return {
        isAvailabilityEdited: !isEqual(state.oldAvailability, updated),
        currentAvailability: updated
      }
    })
  },

  toggleEnableDay: (day) => {
    set(state => {
      const updated = state.currentAvailability!;
      updated[day].isEnable = !updated[day].isEnable;

      return {
        isAvailabilityEdited: !isEqual(state.oldAvailability, updated),
        currentAvailability: updated
      }
    })
  },

  resetAvailability: () => {
    set(state => ({ isAvailabilityEdited: false, currentAvailability: state.oldAvailability }))
  }
})