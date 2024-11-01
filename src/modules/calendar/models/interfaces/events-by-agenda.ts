import { WeekGridMeeting } from 'Common/models';

export interface IEventsByAgenda {
  [agendaId: string]: {
    shouldShow: boolean;
    isEnabled: boolean;
    agendaName: string;
    events: WeekGridMeeting[];
    color: string;
  }
}