'use client';

import { Button, Dialog, Option, Select } from 'Common';
import { MessageTargets } from 'Message-Templates';
import { MessageTags, MessageTagsColors, MessageTemplate, TimesUntil } from '../models';
import { TextareaWithTags } from '.';
import { MdOutlineDragIndicator } from 'react-icons/md';

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
      <form className="flex flex-col gap-6 w-[700px]" onSubmit={() => onComplete()}>
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

            <Select id="timeUntil" value={template.timeUntil.toString()} onChange={(value) => onChangeProperty('timeUntil', value)}>
              {
                Object.entries(TimesUntil).map(([value, text]) => <Option value={value} key={value}>{text}</Option>)
              }
            </Select>
          </div>
        </div>

        <div className="text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {
              (Object.entries(MessageTags) as [keyof typeof MessageTags, string][]).map(
                ([key, text]) => (
                  <span
                    className={`flex items-center cursor-grab rounded-md pr-3 py-0 bg-${MessageTagsColors[key]}-100 text-${MessageTagsColors[key]}-700 w-fit font-bold`}
                    key={key}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', key)}
                  >
                    <MdOutlineDragIndicator className="text-gray-500" size="16"/>
                    {text}
                  </span>
                )
              )
            }
          </div>
        </div>

        <div className="border-2 rounded-lg p-2">
          <TextareaWithTags content={template.content} onChangeProperty={onChangeProperty} />
        </div>

        <div className="flex w-full gap-2">
          <Button variant="secondary" className="w-full" onClick={() => onCancel()}>{cancelText}</Button>
          <Button variant="primary"  className="w-full" onClick={() => onComplete()}>{confirmText}</Button>
        </div>
      </form>
    </Dialog>
  );

}