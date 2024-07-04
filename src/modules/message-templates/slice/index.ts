import { StateCreator } from 'zustand';
import { MessageTemplate, MessageTemplateSlice } from '../models';

export const defaultTemplate: MessageTemplate = {content: '', isEnable: true, target: 'email', timeUntil: 5 };

export const createMessageTemplateSlice: StateCreator<MessageTemplateSlice> = (set) => ({
  isTemplatesLoading: false,
  templatesPreCommit: undefined,

  setIsTemplatesLoading: (isLoading: boolean) => set(() => ({ isTemplatesLoading: isLoading })),
  setTemplatesPreCommit: (templates: MessageTemplate[]) => set(() => ({ templatesPreCommit: templates })),
});