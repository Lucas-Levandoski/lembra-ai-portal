'use client';

import { Button, CirclyingFourDotsLoading } from 'Common';
import { CgAddR } from 'react-icons/cg';
import { useTemplates } from '../hooks/use-templates';
import { TemplateModal, TemplateRow } from '../components';
import { useEffect } from 'react';
import { BiRefresh } from 'react-icons/bi';

type props = {
  agendaId?: string
}

export function MessageTemplatesBoxView({ agendaId }: props) {
  const { 
    templatesPreCommit, 
    template, 
    isOpen,
    isTemplatesLoading, 
    onChangeProperty, 
    onGetTemplates, 
    onModal,
    onModalCancel,
    onModalComplete,
    onRemoveTemplate,
    onDuplicateTemplate,
  } = useTemplates();

  useEffect(() => {
    if(agendaId)
      onGetTemplates(agendaId);
  }, []);


  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <h2 className="my-0 font-bold">Lembretes</h2>
          <Button variant="icon" className="flex gap-2 items-center text-blue-700" onClick={() => agendaId && onGetTemplates(agendaId)}>
            <BiRefresh className="text-blue-600 size-8" />
          </Button>
        </div>
        <Button variant="icon" className="flex gap-2 items-center text-blue-700" onClick={() => onModal()}><CgAddR /> Criar Lembrete</Button>

      </div>
      { 
        isTemplatesLoading
          ? <div className="flex justify-center mt-6 w-full"><CirclyingFourDotsLoading /></div>
          : (
            <div className="flex flex-col gap-2 mt-4">
              {
                !templatesPreCommit && <span>Você ainda não possui lembretes configurados.</span>
              }

              {
                templatesPreCommit?.map((_template, i) => (
                  <TemplateRow 
                    index={i} 
                    key={`${_template.target}-${i}`} 
                    template={_template} 
                    onEdit={onModal} 
                    onRemove={onRemoveTemplate} 
                    onDuplicate={onDuplicateTemplate}/>
                ))
              }
            </div>
          )
      }

      {
        template && <TemplateModal isOpen={isOpen} template={template} onChangeProperty={onChangeProperty} onCancel={onModalCancel} onComplete={onModalComplete}  />
      }
    </div>
  );
}