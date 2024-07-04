import { maskMinutes } from 'Common';

export const TimesUntil = {
  5: `${maskMinutes(5, true)} antes`,
  15: `${maskMinutes(15, true)} antes`,
  30: `${maskMinutes(30, true)} antes`,
  60: `${maskMinutes(60, true)} antes`,
  120: `${maskMinutes(120, true)} antes`,
  240: `${maskMinutes(240, true)} antes`,
  1440: `${maskMinutes(1440, true)} antes`,
};