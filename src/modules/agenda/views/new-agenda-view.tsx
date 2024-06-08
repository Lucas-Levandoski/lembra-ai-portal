'use client';

import { EditAgendaCard } from '../components';
import { BookingAgendaVisualizationView } from 'Common';
import { useNewAgenda } from '../hooks';


export function NewAgendaView() {
  const { agenda, onChangeProperty, onSubmit } = useNewAgenda()

  return (
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
  );
}