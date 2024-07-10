import { toast } from 'react-toastify';

export function ParseDate(date: string): { day: number, month: number, year: number } | undefined {

  const year = +date.slice(0,4);
  const month = +date.slice(5,7);
  const day = +date.slice(8,10);

  if(!year||!month||!day) {
    toast.error(`date format is not valid, \ncurrent:'${date}' \nexpected:'2024-04-25'`);
    return;
  }

  return { day, month, year };
}