'use client';

import { EditAgendaCard } from '../components';
import { BookingAgendaVisualizationView, CirclyingFourDotsLoading, ErrorMessage } from 'Common';
import { useEditAgenda } from '../hooks';

type props = {
  agendaId: string;
}

export function EditAgendaView({ agendaId }: props) {
  const { agenda, onChangeProperty, onSubmit, isLoading } = useEditAgenda(agendaId);

  return (
    <>
      {isLoading && (
        <div className="h-[600px] w-full flex my-auto items-center justify-center">
          <CirclyingFourDotsLoading height={100} width={100} />
        </div>
      )}
      {
        agenda && !isLoading && (
          <div className="grid grid-cols-10 gap-6">
            <div className="col-span-4">
              <EditAgendaCard 
                agendaId={agendaId} 
                details={agenda} 
                onChange={onChangeProperty} 
                onSubmit={onSubmit}
              />
            </div>
            <div className="col-span-6">
              <BookingAgendaVisualizationView
                agendaName={agenda.name}
                colorName={agenda.colorName}
                timeFrame={agenda.timeFrame}
                isPreview={true}
              />
            </div>
          </div>
        )
      }
      {
        !agenda && !isLoading && (
          <div>
            <ErrorMessage message="Lamentamos mas esta agenda não foi encontrada" className="text-2xl" />
          </div>
        )
      }
    </>
  );
}