import { useStore } from 'Store';
import { MessageTemplate } from '../models';
import { newTemplates, sortTemplates } from 'Message-Templates';


export function useTemplates() {
  const { 
    isTemplatesLoading,
    messageTemplates,
    setMessageTemplates,
    setTemplatesProCommit,
    templatesPreCommit,
    setIsTemplatesLoading
  } = useStore((state) => ({
    isTemplatesLoading: state.isTemplatesLoading,
    messageTemplates: state.messageTemplates,
    templatesPreCommit: state.templatesPreCommit,
    setMessageTemplates: state.setMessageTemplates,
    setTemplatesProCommit: state.setTemplatesPreCommit,
    setIsTemplatesLoading: state.setIsTemplatesLoading,
  }));

  const onAddTemplate = async (agendaId: string, template: MessageTemplate) => {
    setIsTemplatesLoading(true);

    const result = await newTemplates(agendaId, template).finally(() => setIsTemplatesLoading(false));

    if(!result) return;

    setMessageTemplates(result);
  }

  const onAddTemplatePreCommit = async (template: MessageTemplate) => {
    if(!templatesPreCommit)
      return setTemplatesProCommit([template]);

    setIsTemplatesLoading(true);

    templatesPreCommit.push(template);

    const sorted =  await sortTemplates(templatesPreCommit).finally(() => setIsTemplatesLoading(false));

    if(!sorted) return;

    setTemplatesProCommit(sorted);
  }

  const onRemoveTemplatePreCommit = async (index: number) => {
    if(!templatesPreCommit)
      return;

    setIsTemplatesLoading(true);

    const sorted = await sortTemplates(
      templatesPreCommit.filter((_, i) => i !== index)
    ).finally(() => setIsTemplatesLoading(false));

    if(!sorted) return;

    setTemplatesProCommit(sorted);
  }

  const onCommitTemplates = async (agendaId: string) => {
    if(!templatesPreCommit)
      return;

    setIsTemplatesLoading(true);

    const result = await newTemplates(agendaId, templatesPreCommit).finally(() => setIsTemplatesLoading(false));

    return result;
  }

  return {
    onAddTemplate,
    onAddTemplatePreCommit,
    onRemoveTemplatePreCommit,
    onCommitTemplates,
    isTemplatesLoading,
    messageTemplates,
    templatesPreCommit,
  }
}