import { envVars, privateClient } from 'Common';
import { toast } from 'react-toastify';
import { MessageTemplate, MessageTemplateList } from '../models';

export const removeTemplate = async (agendaId: string, templateId: string): Promise<MessageTemplateList | undefined> => {
  return await privateClient.delete<MessageTemplateList>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`, { params: { templateId } })
    .then(res => {
      toast.success('Template removido com sucesso');
      return res.data;
    })
    .catch(err => {
      toast.error(err.response?.data?.messages.join('\n'));
      return;
    }) as MessageTemplateList | undefined;
};


export const getTemplates = async (agendaId: string): Promise<MessageTemplate[] | undefined> => {
  return await privateClient.get<MessageTemplateList>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`)
    .then(res => {
      return (res.data as MessageTemplateList).templates;
    })
    .catch(err => {
      toast.error(err.response?.data?.messages.join('\n'));
      return;
    }) as MessageTemplate[] | undefined;
};

export const replaceTemplates = async (agendaId: string, templates: MessageTemplate[]): Promise<MessageTemplate[] | undefined> => {
  return await privateClient.post<MessageTemplate[]>(
    `${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`, 
    templates.map(element => ({templateId: element.id, template: element}))
  )
    .then(res => {
      toast.success('Templates editados/criados com sucesso');
      return res.data;
    })
    .catch(err => {
      toast.error(err.response?.data?.messages.join('\n'));
      return;
    }) as MessageTemplate[] | undefined;
};

export const sortTemplates = async (templates: MessageTemplate[]): Promise<MessageTemplate[] | undefined> => {
  return await privateClient.post<MessageTemplateList>(
    `${envVars.messageSenderUrl}/sort-templates`, 
    templates.map(element => ({templateId: element.id, template: element}))
  )
    .then(res => {
      return (res.data as MessageTemplateList).templates;
    })
    .catch(err => {
      toast.error(err.response?.data?.messages.join('\n'));
      return;
    }) as MessageTemplate[] | undefined;
};

export const initUser = async(): Promise<void> => {
  await privateClient.post(`${envVars.messageSenderUrl}/sort-templates`)
    .catch(err => {
      toast.error(err.response?.data?.messages.join('\n'));
      return;
    });
};