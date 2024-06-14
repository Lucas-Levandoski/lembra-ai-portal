import { MessageTemplate, MessageTemplateList } from '.'

export type MessageTemplateSlice = {
  isTemplatesLoading: boolean;
  messageTemplates: MessageTemplateList | undefined;
  templatesPreCommit: MessageTemplate[] | undefined;

  setIsTemplatesLoading: (isLoading: boolean) => void;
  setMessageTemplates: (templates: MessageTemplateList) => void;
  setTemplatesPreCommit: (templates: MessageTemplate[]) => void;
}