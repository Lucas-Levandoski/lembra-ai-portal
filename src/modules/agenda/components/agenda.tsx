'use client';

import { Button, CirclingFourDotsLoading, ErrorMessage, StatusMessage } from 'Common';
import { useStore } from 'Store';
import { PiPlusCircle } from 'react-icons/pi';
import { AgendaRow } from '.';
import { useAgenda } from '../hooks';
import { BiRefresh } from 'react-icons/bi';

export function Agendas() {
  const { agendas, isAgendaLoading } = useStore(state => ({ 
    agendas: state.agendas, 
    isAgendaLoading: state.isAgendaLoading
  }));

  const { onCopy, onToggleActive, getAgendas } = useAgenda();

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between">
        <div className="flex gap-6 items-center">
          <h2 className="font-bold mt-0">Agendas</h2>
          <Button variant="icon" className="p-0" onClick={() => getAgendas(true)}>
            <BiRefresh className="text-blue-600 size-8" />
          </Button>
        </div>

        <Button className="flex items-center gap-2 font-normal" route="/portal/agenda/new">
          <PiPlusCircle className="size-8" /> Nova agenda
        </Button>
      </div>

      { isAgendaLoading && (
        <div className="flex justify-center min-h-40 items-center">
          <CirclingFourDotsLoading />
        </div>
      )}

      { agendas === undefined && !isAgendaLoading && (
        <div className="mt-2">
          <ErrorMessage message="Falha ao carregar suas agendas, por favor tente novamente" />
        </div>
      )}
      {
        agendas && agendas.length === 0 && !isAgendaLoading && (
          <div className="mt-2">
            <StatusMessage message="Não foi encontrado nenhuma agenda, gostaria de criar uma?" />
          </div>
        )
      }
      {
        agendas && agendas.length > 0 && !isAgendaLoading && (
          agendas?.map(agenda => (
            <span key={agenda.id}>
              <hr className="my-6" />
              <AgendaRow agenda={agenda} onCopy={onCopy} onToggleActive={onToggleActive} />
            </span>
          ))
        )
      }
    </div>
  );
}