'use client';

import { Button, CirclyingFourDotsLoading } from 'Common';
import { useStore } from 'Store';
import { PiPlusCircle } from 'react-icons/pi';
import { AgendaRow } from '.';

export function Agendas() {
  const { agendas, isAgendaLoading } = useStore(state => ({ 
    agendas: state.agendas, 
    isAgendaLoading: state.isAgendaLoading
  }));

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between">
        <h2 className="font-bold">Agendas</h2>
        <Button className='flex items-center gap-2 font-normal'>
          <PiPlusCircle className='size-8' /> Nova agenda
        </Button>
      </div>

      { isAgendaLoading && (
        <div className='flex justify-center min-h-40 items-center'>
          <CirclyingFourDotsLoading />
        </div>
      )}

      { agendas === undefined && !isAgendaLoading && (
        <div>
          Nenhuma agenda encontrada
        </div>
      )}

      {
        agendas && !isAgendaLoading && (
          agendas?.map(agenda => (
            <span key={agenda.id}>
              <hr className='my-6' />
              <AgendaRow agenda={agenda} />
            </span>
          ))
        )
      }
    </div>
  )
}