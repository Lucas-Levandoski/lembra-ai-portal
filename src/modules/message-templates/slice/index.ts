import { StateCreator } from 'zustand';
import { MessageTemplate, MessageTemplateList, MessageTemplateSlice } from '../models';

export const createMessageTemplateSlice: StateCreator<MessageTemplateSlice> = (set) => ({
  isTemplatesLoading: false,
  messageTemplates: undefined,
  templatesPreCommit: undefined,

  setIsTemplatesLoading: (isLoading: boolean) => set(() => ({ isTemplatesLoading: isLoading })),
  setMessageTemplates: (templates: MessageTemplateList) => set(() => ({ messageTemplates: templates })),
  setTemplatesPreCommit: (templates: MessageTemplate[]) => set(() => ({ templatesPreCommit: templates })),
})