import { getDate } from './get-date';

export function getWeekDays(date: string): string[] {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();

  // Calculate the Monday of the current week
  const sunday = new Date(selectedDate);
  sunday.setDate(selectedDate.getDate() - ((dayOfWeek) % 7));

  // Generate dates for each day from Monday to Sunday
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    weekDays.push(getDate(day)); // Format as YYYY-MM-DD
  }

  return weekDays;
}
