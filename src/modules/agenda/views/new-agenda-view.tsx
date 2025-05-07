'use client';

import { BookingAgendaVisualization } from 'Bookings';
import { EditAgendaCard, useNewAgenda } from 'Agenda';


export function NewAgendaView() {
  const { agenda, onChangeProperty, onSubmit, isLoading } = useNewAgenda();

  return (
    <div className="grid grid-cols-10 gap-6">
      <div className="col-span-4">
        <EditAgendaCard 
          details={agenda} 
          onChange={onChangeProperty} 
          onSubmit={onSubmit} 
          isSubmitLoading={isLoading}
        />
      </div>
      <div className="col-span-6">
        <BookingAgendaVisualization
          agendaName={agenda.name}
          colorName={agenda.colorName}
          timeFrame={agenda.timeFrame}
          isPreview={true}
        />
      </div>
    </div>
  );
}