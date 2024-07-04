import { MessageTemplate } from '.';

export type MessageTemplateSlice = {
  isTemplatesLoading: boolean;
  templatesPreCommit: MessageTemplate[] | undefined;

  setIsTemplatesLoading: (isLoading: boolean) => void;
  setTemplatesPreCommit: (templates: MessageTemplate[]) => void;
}