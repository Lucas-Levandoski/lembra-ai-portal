import { IShortAgendaProps } from 'Agenda';
import { BookingEntity } from 'Bookings/models';
import { IShortProfile } from 'Profile/models';


type props = {
  booking: BookingEntity;
  agenda?: IShortAgendaProps;
  profile?: IShortProfile;
  isLoading: boolean;
}

export function BookingCanceled({ booking, agenda, isLoading, profile }: props) {
  return (
    <div>
      booking canceled
    </div>
  );
}