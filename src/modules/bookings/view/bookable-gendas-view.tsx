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
    <div className="flex flex-col justify-center gap-4 m-auto h-[500px] w-2/3 rounded-xl p-8 shadow-lg">
      <div className="mx-auto">
        {
          profile && <ProfileTag profile={profile} />
        }
      </div>
      <div className="flex flex-wrap gap-8">
        {
          agendas.map(agenda => (
            <Link key={agenda.id} trackURL={false} route={`${userTag}/${agenda.tag}`} unsetStyles={true}>
              <ShortAgendaCard agenda={agenda} />
            </Link>
          ))
        }
      </div>
    </div>
  );
}