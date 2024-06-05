import { listAgendas } from 'Dashboard';
import { useStore } from 'Store';
import { toast } from 'react-toastify';

export function useAgenda() {
  const { agendas, isAgendaLoading, setAgendas, setIsAgendaLoading } = useStore(state => ({
    agendas: state.agendas,
    setAgendas: state.setAgendas,
    isAgendaLoading: state.isAgendaLoading,
    setIsAgendaLoading: state.setIsAgendaLoading
  }));

  const onCopy = () => {
    toast.success('Link copiado com sucesso');
  }

  const onToggleActive = (agendaId: string) => {
    setAgendas(
      agendas?.map(agenda => {
        if(agenda.id === agendaId) agenda.details.isEnable = !agenda.details.isEnable;

        return agenda;
      })
    )
  }

  const getAgendas = async () => {
    setIsAgendaLoading(true);
    
    try {
      const agendaResult = await listAgendas();

      setAgendas(agendaResult);
    } catch (e) {
      console.error(e);
      toast.error('Falha ao solicitar agendas');
    } finally {
      setIsAgendaLoading(false);
    }
  }

  return {
    agendas,
    isAgendaLoading,
    getAgendas,
    onCopy,
    onToggleActive,
  };
}