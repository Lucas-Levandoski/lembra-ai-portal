export function getDateObject(date: Date | undefined = new Date()) {
  const year = date.getFullYear().toString().padStart(2, '0');
  const month = String(date.getMonth()+1).padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return { day, month, year };
}

export function getDate(date: Date | undefined = new Date()) {
  const year = date.getFullYear().toString().padStart(2, '0');
  const month = String(date.getMonth()+1).padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}