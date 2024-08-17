'use client';

import { Button, CirclyingFourDotsLoading, ErrorMessage } from 'Common';
import { useStore } from 'Store';

export function MyLinkView() {
  const { profile, isProfileLoading } = useStore(state => ({ profile: state.profile, isProfileLoading: state.isProfileLoading }));

  const domain = window ? window.location.origin : '';

  return (
    <div className="max-w-[500px]">
      {
        isProfileLoading && (
          <CirclyingFourDotsLoading />
        )
      }
      {
        !isProfileLoading && !profile && <ErrorMessage message="Falha ao carregar informações de usuário" />
      }
      {
        !isProfileLoading && profile && (
          <div className="flex flex-col gap-8">
            <h1>Meu Link</h1>
            <p>Se este campo for alterado, todos os links já enviados deixarão de funcionar e será necessário que você os atualize com seus clientes.</p>
            <form className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">{domain}/</span>
                <input className="p-2 border-2 border-gray-200 h-12 rounded-lg" value={profile.tag} />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary">Cancelar</Button>
                <Button>Salvar Alterações</Button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}