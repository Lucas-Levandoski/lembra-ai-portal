import { IEventsByAgenda } from 'Calendar/models';
import { Calendar, Checkbox, CirclingFourDotsLoading, ErrorMessage, StatusMessage } from 'Common/components';

type props = {
  eventsByAgenda?: IEventsByAgenda;
  onToggle: (agendaId: string) => void;
  isLoading: boolean;
  onSelectingDate: (date: string) => void;
  selectedDate: string;
  highlightedDays?: string[];
  isHighlightedDaysLoading?: boolean;
}

export function LeftMenu({ eventsByAgenda, isLoading, onToggle, onSelectingDate, selectedDate, highlightedDays = [], isHighlightedDaysLoading}: props) {
  const agendas: {
    id: string,
    isChecked: boolean,
    label: string,
    color: string,
  }[] = [];

  if(eventsByAgenda) {
    for(const [agendaId, event] of Object.entries(eventsByAgenda)) {
      agendas.push({
        color: event.color,
        id: agendaId,
        isChecked: event.shouldShow,
        label: event.agendaName,
      });
    }
  }

  return (
    <div className="flex flex-col border-2 p-6 rounded-lg gap-9">
      <Calendar 
        onSelectedDay={onSelectingDate}
        currentDay={selectedDate}
        highlightedDays={highlightedDays}
        isLoading={isHighlightedDaysLoading}
      />
      <div className="flex flex-col gap-3">
        <h3><b>Minhas agendas</b></h3>
        {
          isLoading && <div className="m-auto"><CirclingFourDotsLoading /></div>
        }
        {
          !isLoading && eventsByAgenda !== undefined && (
            <>
              {
                agendas.map(
                  agenda => 
                    <Checkbox 
                      label={agenda.label} 
                      id={agenda.id} 
                      color={agenda.color} 
                      isChecked={agenda.isChecked} 
                      onChange={() => onToggle(agenda.id)} 
                      key={agenda.id} 
                    />
                )
              }
            </>
          )
        }
        {
          !isLoading && !agendas && <ErrorMessage message="Falha ao carregar suas agendas"/>
        }
        {
          !isLoading && agendas && agendas.length === 0 && <StatusMessage message="Parece que você não possui agendas disponíveis"/>
        }
      </div>
    </div>
  );
}