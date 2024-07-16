'use client';

import { useOnBooking } from 'Bookings';
import { ProfileTag } from 'Profile';
import { ShortAgendaCard } from 'Agenda/components';
import { BouncingThreeDotsLoading, ErrorMessage, Link } from 'Common';

type props = {
  userTag: string;
}

export function BookableAgendasView({ userTag }: props) {
  const { isLoading, profile, agendas } = useOnBooking(userTag);

  return (
    <div className="flex flex-col justify-center gap-8 m-auto w-2/3">
      <div className="flex w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        { isLoading && <div className="mx-auto"><BouncingThreeDotsLoading /></div>}
        {
          !isLoading && profile && <ProfileTag profile={profile} />
        }
        {
          !isLoading && !profile && <ErrorMessage className="w-full" message="Falha ao carregar informações de usuário" />
        }
      </div>
      <div className="flex flex-col w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="mb-8 mt-0">Agendas</h1>
        { isLoading && <div className="mx-auto"><BouncingThreeDotsLoading /></div>}
        {
          !isLoading && agendas.length > 0 && (
            <ul>
              {
                agendas.map(agenda => (
                  <li className="border-t" key={agenda.id}>
                    <Link trackURL={false} route={`${userTag}/${agenda.tag}`} unsetStyles={true}>
                      <ShortAgendaCard agenda={agenda} />
                    </Link>
                  </li>
                ))
              }
            </ul>
          )
        }
        { !isLoading && agendas.length === 0 && <ErrorMessage message="Falha ao carregar agendas para este usuário" /> }
      </div>
    </div>
  );
}