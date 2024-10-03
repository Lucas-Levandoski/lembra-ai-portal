export function timeAndDateToIso(date: string, time: string): string {
  const result = new Date(date);

  const [hours, minutes] = time.split(':');

  result.setHours(parseInt(hours));
  result.setMinutes(parseInt(minutes));

  return result.toString();
}