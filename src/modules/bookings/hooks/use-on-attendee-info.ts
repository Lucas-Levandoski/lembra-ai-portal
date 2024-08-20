import { parseParams } from 'query-params-parser';


export function useOnAttendeeInfo(userTag: string, agendaTag: string, date: string) {
  const { time } = parseParams({ time: '' });


  return { time };
}
