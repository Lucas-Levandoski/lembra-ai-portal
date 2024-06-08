'use client';

import { EditAgendaCard } from '../components';
import { BookingAgendaVisualizationView, CirclyingFourDotsLoading } from 'Common';
import { useEditAgenda } from '../hooks';

export function EditAgendaView() {
  const { agenda, onChangeProperty, onSubmit, isLoading } = useEditAgenda();

  return (
    <>
      {isLoading && <CirclyingFourDotsLoading />}
      {
        (agenda && !{isLoading}) && 
        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-4">
            <EditAgendaCard details={agenda} onChange={onChangeProperty} onSubmit={onSubmit} />
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
      }
    </>
  );
}