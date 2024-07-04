'use client';

import { Button, Dialog, Option, Select } from 'Common';
import { MessageTargets } from '../models/constants/message-targets';
import { MessageTags, MessageTemplate, TimesUntil } from '../models';
import { TextareaWithTags } from '.';

type props = {
  onComplete?: () => void;
  onCancel?: () => void;
  template: MessageTemplate;
  onChangeProperty?: (propName: keyof MessageTemplate, value: any) => void;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  isOpen: boolean;
}

export function TemplateModal({ 
  onComplete = () => {}, 
  onCancel = () => {},
  cancelText = 'Cancelar', 
  confirmText = 'Adicionar lembrete', 
  title = 'Criar lembrete',
  template,
  isOpen,
  onChangeProperty = () => {}
}: props) {

  return (
    <Dialog isOpen={isOpen}>
      <form className="flex flex-col gap-8 min-w-[600px]" onSubmit={() => onComplete()}>
        <h2 className="font-bold">{title}</h2>
        <div className="flex gap-2">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="target">Enviar lembrete por</label>
            <Select id="target" value={template.target} onChange={(value) => onChangeProperty('target', value)}>
              {
                Object.entries(MessageTargets).map(([value, element]) => (
                  <Option value={value} key={value}>{element}</Option>
                ))
              }
            </Select>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="timeUntil">Tempo</label>
            
            <Select id="timeUntil" value={template.timeUntil} onChange={(value) => onChangeProperty('timeUntil', value)}>
              {
                Object.entries(TimesUntil).map(([value, text]) => (
                  <Option value={+value} key={value}>{text}</Option>
                ))
              }
            </Select>
          </div>
        </div>

        <div className="border-2 rounded-lg p-6">
          <div className="flex justify-end">
            
            <Select className="w-1/2" id="target" fixedValue={'Adicionar Variável'} onChange={(value) => onChangeProperty('content', template.content + value)}>
              {
                Object.entries(MessageTags).map(([key, text]) => <Option key={key} value={`{{${key}}}`}>{text}</Option>)
              }
            </Select>
          </div>

          <TextareaWithTags content={template.content} onChangeProperty={onChangeProperty} />

          {/* <textarea className="w-full resize-none" value={template.content} onChange={(event) => onChangeProperty('content', event.target.value)}/> */}
        </div>

        <div className="flex w-full gap-2">
          <Button variant="secondary" className="w-full" onClick={() => onCancel()}>{cancelText}</Button>
          <Button variant="primary"  className="w-full" onClick={() => onComplete()}>{confirmText}</Button>
        </div>
      </form>
    </Dialog>
  );

}