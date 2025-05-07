'use client';

import { useStore } from 'Store';
import { MessageTemplate } from '../models';
import { defaultTemplate, getTemplates, replaceTemplates, sortTemplates } from 'Message-Templates';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';


export function useTemplates() {
  const { 
    isTemplatesLoading,
    setTemplatesPreCommit,
    templatesPreCommit,
    setIsTemplatesLoading
  } = useStore((state) => ({
    isTemplatesLoading: state.isTemplatesLoading,
    templatesPreCommit: state.templatesPreCommit,
    setTemplatesPreCommit: state.setTemplatesPreCommit,
    setIsTemplatesLoading: state.setIsTemplatesLoading,
  }));

  const [template, setTemplate] = useState<MessageTemplate>(defaultTemplate);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>();

  const onClearTemplates = () => {
    setTemplatesPreCommit([]);
  };

  const onGetTemplates = async (agendaId: string) => {
    setIsTemplatesLoading(true);

    try {
      const result = await getTemplates(agendaId);

      if(!result) return;

      setTemplatesPreCommit(result);
    } catch (ex) {
      if(ex instanceof AxiosError) {
        if (ex.response?.status === 404) {
          return;
        }
      }

      toast.error('Falha ao listar seus templates');
    } finally {
      setIsTemplatesLoading(false);
    }
  };

  const onModalCancel = () => {
    setIsOpen(false);
  };

  const onModalComplete = () => {
    if(currentIndex !== undefined)
      return onEditTemplate();

    onAddTemplate();
  };

  const onAddTemplate = async () => {
    setIsOpen(false);

    if(!templatesPreCommit)
      return setTemplatesPreCommit([template]);

    setIsTemplatesLoading(true);

    template.isNew = true;

    templatesPreCommit.push(template);

    const sorted =  await sortTemplates(templatesPreCommit).finally(() => setIsTemplatesLoading(false));

    if(!sorted) return;

    setTemplatesPreCommit(sorted);
  };

  const onEditTemplate = async () => {
    setIsOpen(false);

    if(!templatesPreCommit || currentIndex === undefined)
      return;

    setIsTemplatesLoading(true);

    template.isEdited = true;

    templatesPreCommit[currentIndex] = template;

    const sorted = await sortTemplates(templatesPreCommit).finally(() => setIsTemplatesLoading(false));

    if(!sorted) return;

    setTemplatesPreCommit(sorted);
  };

  const onRemoveTemplate = (index: number) => {
    if(!templatesPreCommit)
      return;

    const filtered = templatesPreCommit.filter((_, i) => i !== index);

    setTemplatesPreCommit(filtered);
  };

  const onDuplicateTemplate = async (index: number) => {
    if(!templatesPreCommit)
      return;

    setIsTemplatesLoading(true);

    const sorted = await sortTemplates([
      ...templatesPreCommit, 
      templatesPreCommit[index]]
    ).finally(() => setIsTemplatesLoading(false));

    if(!sorted) return;

    setTemplatesPreCommit(sorted);
  };

  const onCommitTemplates = async (agendaId: string) => {
    if(!templatesPreCommit)
      return;

    setIsTemplatesLoading(true);

    const result = await replaceTemplates(agendaId, templatesPreCommit).finally(() => setIsTemplatesLoading(false));

    return result;
  };

  const onModal = (index?: number) => {
    setCurrentIndex(index);
    setIsOpen(true);

    if(index !== undefined) 
      return (onEditModal(index));

    onAddModal();
  };

  const onEditModal = (index: number) => {
    if(!templatesPreCommit || index === undefined) return;

    setTemplate(templatesPreCommit[index]);
  };

  const onAddModal = () => {
    setTemplate(defaultTemplate);
  };

  const onChangeProperty = (propName: keyof MessageTemplate, value: any) => {
    if(!template) return;

    let _value: any;

    switch(typeof template[propName]) {
      case 'number':
        _value = +value;
        break;
      case 'boolean':
        _value = value == 'true';
        break;
      default:
        _value = value;
    }

    setTemplate({...template, [propName]: _value});
  };

  return {
    onGetTemplates,
    onEditTemplate,
    onAddTemplate,
    onRemoveTemplate,
    onModal,
    onChangeProperty,
    onCommitTemplates,
    onModalCancel,
    onClearTemplates,
    isOpen,
    isTemplatesLoading,
    templatesPreCommit,
    template,
    onModalComplete,
    onDuplicateTemplate,
  };
}