'use client';

import { useOnBooking } from 'Bookings';
import { ProfileTag } from 'Profile';
import { ShortAgendaCard } from 'Agenda/components';
import { Link } from 'Common';

type props = {
  userTag: string;
}

export function BookableAgendasView({ userTag }: props) {
  const { profile, agendas } = useOnBooking(userTag);

  return (
    <div className="flex flex-col justify-center gap-4 m-auto w-2/3">
      <div className="flex w-full mx-auto bg-white shadow-lg rounded-xl p-4">
        {
          profile && <ProfileTag profile={profile} />
        }
      </div>
      <div className="flex flex-col w-full mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="mb-8 mt-0">Agendas</h1>
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
      </div>
    </div>
  );
}