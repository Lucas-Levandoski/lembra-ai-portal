export function getTime(date: string | Date) {
  if(!(date instanceof Date))
    date = new Date(date);

  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}