import { MessageTarget } from './message-targets';

export type MessageTemplate = {
  target: MessageTarget;
  content: string;
  subject?: string;
  timeUntil: number;
  isEnable: boolean;
}

export type MessageTemplateList = {
  [key: string]: MessageTemplate
}