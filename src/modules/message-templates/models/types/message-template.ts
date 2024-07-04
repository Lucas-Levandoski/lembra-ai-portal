import { TimesUntil } from '../constants';
import { MessageTarget } from './message-targets';

export type MessageTemplate = {
  id?: string;
  target: MessageTarget;
  content: string;
  subject?: string;
  timeUntil: keyof typeof TimesUntil;
  isEnable: boolean;
  isEdited?: boolean;
  isNew?: boolean;
}

export type MessageTemplateList = {
  agendaId: string;
  templates: MessageTemplate[];
}