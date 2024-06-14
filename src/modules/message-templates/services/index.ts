import { envVars, privateClient } from 'Common';
import { toast } from 'react-toastify';
import { MessageTemplate, MessageTemplateList } from '../models';


export const newTemplates = async (agendaId: string, templates: MessageTemplate[] | MessageTemplate): Promise<MessageTemplateList | undefined> => {
  return await privateClient.post<MessageTemplateList>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`, templates)
    .then(res => {
      toast.success('Templates adicionados com sucesso');
      return res.data
    })
    .catch(err => {
      toast.error(err.response.data.messages.join('\n'));
      return;
    }) as MessageTemplateList | undefined;
}

export const removeTemplate = async (agendaId: string, templateId: string): Promise<MessageTemplateList | undefined> => {
  return await privateClient.delete<MessageTemplateList>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`, { params: { templateId } })
    .then(res => {
      toast.success('Template removido com sucesso');
      return res.data
    })
    .catch(err => {
      toast.error(err.response.data.messages.join('\n'));
      return;
    }) as MessageTemplateList | undefined;
}

export const getTemplates = async (agendaId: string): Promise<MessageTemplateList | undefined> => {
  return await privateClient.get<MessageTemplateList>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`)
    .then(res => {
      return res.data
    })
    .catch(err => {
      toast.error(err.response.data.messages.join('\n'));
      return;
    }) as MessageTemplateList | undefined;
}

export const editTemplates = async (agendaId: string, template: MessageTemplate, templateId: string): Promise<MessageTemplate[] | undefined> => {
  return await privateClient.put<MessageTemplate[]>(`${envVars.messageSenderUrl}/my-message-templates/by-agenda/${agendaId}`, { templateId, template })
    .then(res => {
      toast.success('Template editado com sucesso');
      return res.data
    })
    .catch(err => {
      toast.error(err.response.data.messages.join('\n'));
      return;
    }) as MessageTemplate[] | undefined;
}

export const sortTemplates = async (templates: MessageTemplate[]): Promise<MessageTemplate[] | undefined> => {
  return await privateClient.post<MessageTemplate[]>(`${envVars.messageSenderUrl}/sort-templates`, { templates })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      toast.error(err.response.data.messages.join('\n'));
      return;
    }) as MessageTemplate[] | undefined;
}