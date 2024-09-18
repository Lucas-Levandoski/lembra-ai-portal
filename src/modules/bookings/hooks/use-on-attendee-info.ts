import { IShortAgendaProps } from 'Agenda/models';
import { getAgendaByTag } from 'Agenda/services';
import { IAttendeeDetails } from 'Bookings/models/interfaces';
import { bookNewEvent } from 'Bookings/services/book-time';
import { minutesToTime } from 'Common/utils';
import { IShortProfile } from 'Profile/models';
import { readProfileByTag } from 'Profile/services';
import { parseParams } from 'query-params-parser';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';


export function useOnAttendeeInfo(userTag: string, agendaTag: string, date: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [agenda, setAgenda] = useState<IShortAgendaProps>();
  const [profile, setProfile] = useState<IShortProfile>();
  const [attendee, setAttendee] = useState<IAttendeeDetails>({email: '', name: '', otherInfo: '', phoneNumber: ''});
  const { time } = parseParams({ time: '' });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    try {
      const userId = await getProfile();
      if(!userId) return;


      const agendaId = await getAgenda(userId);
      if(!agendaId) return;
      
    } finally {
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    const _profile = await readProfileByTag(userTag);
    if(!_profile) return '';

    setProfile(_profile);

    return _profile.id;
  };

  const getAgenda = async (userId: string) => {
    const _agenda = await getAgendaByTag(userId, agendaTag);
    if(!_agenda) return;

    setAgenda(_agenda);
    return _agenda.id;
  };


  const onChangeProperty = (propName: keyof IAttendeeDetails) => (
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => setAttendee({...attendee, [propName]: event.target.value})
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if(profile !== undefined && agenda !== undefined && time !== undefined) {
      setIsLoadingBooking(true);

      try {
        await bookNewEvent(profile.id, agenda.id, 
          {
            guestDetails: {
              ...attendee,
              phoneNumber: `+55${attendee.phoneNumber}`
            },
            details: {
              date,
              time,
              duration: minutesToTime(agenda.timeFrame),
            },
            meetingLocation: {
              location: 'google-meeting'
            }
          }
        );
      } finally {
        setIsLoadingBooking(false);
      }

    }
  };

  return {
    isLoading,
    isLoadingBooking,
    profile,
    agenda,
    attendee,
    onChangeProperty,
    onSubmit,
  };
}
