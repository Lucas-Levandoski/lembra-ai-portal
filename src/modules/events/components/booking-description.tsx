import { TimeDescription } from 'Bookings/components';
import { BookingEntity, BookingDetails } from 'Bookings/models';
import { sumTimes } from 'Common';
import { BsWhatsapp } from 'react-icons/bs';
import { CiCalendar, CiStickyNote, CiUser } from 'react-icons/ci';
import { FaAngleDoubleUp } from 'react-icons/fa';


type props = {
  booking: BookingEntity;
  reschedules: BookingDetails[];
}

export function BookingDescription({booking, reschedules }: props) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <span className="flex justify-start items-center gap-4">
        <CiCalendar className="size-8" />
        <TimeDescription date={booking.details.date} startTime={booking.details.time} endTime={sumTimes(booking.details.time, booking.details.duration)} />
      </span>
      <span className="flex justify-start items-center gap-4 text-balance">
        <CiUser className="size-8" />
        <span>{booking.guestDetails.name} | {booking.guestDetails.email}</span>
      </span>
      <span className="flex justify-start items-center gap-4">
        <BsWhatsapp className="size-6 ml-1" />
        <span>{booking.guestDetails.phoneNumber}</span>
      </span>
      <span className="flex justify-start items-center gap-4">
        <CiStickyNote className="size-8" />
        <div>
          Informações Adicionais: <br/>
          {
            !booking.guestDetails.otherInfo
              ? <span className="text-red-400">Nenhuma informação adicional</span>
              : <span>{booking.guestDetails.otherInfo}</span>
          }
        </div>
      </span>
      {
        reschedules.length > 0 && (
          <div className="flex flex-col">
            <h3>Este booking já foi reagendado
              <span className="text-orange-500"> {reschedules.length > 1 ? `${reschedules.length} vezes`: '1 vez'}</span>
            </h3>
            {reschedules.map((reschedule, j) => (
              <div className="flex flex-col gap-1 mt-1" key={'reschedule-element-' + j + booking.id}>
                {j > 0 && <span className="flex w-full justify-center"><FaAngleDoubleUp className="text-orange-500 size-4" /></span>}
                <div className="bg-orange-200 rounded-md px-2 text-center">
                  <TimeDescription date={reschedule.date} startTime={reschedule.time} endTime={sumTimes(reschedule.time, reschedule.duration)} />
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}