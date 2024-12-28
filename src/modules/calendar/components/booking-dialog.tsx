import { BookingEntity } from 'Bookings/models';
import { TimeDescription } from 'Bookings/components';
import { AgendaElement, Button, CirclingFourDotsLoading, Dialog, ErrorMessage, sumTimes, TimeCard, timeToMinutes } from 'Common';
import { CiCalendar } from 'react-icons/ci';
import { BiUser } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';


type props = {
  isOpen?: boolean;
  onClose?: () => void;
  booking?: BookingEntity;
  agenda?: AgendaElement;
  isLoading?: boolean;
}

export function BookingDialog({ booking, agenda, isLoading = true, isOpen = true, onClose = () => {} }: props) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        <Button className="absolute right-0 top-0" variant="icon" onClick={onClose} ><IoClose className="size-6" /></Button>
        {
          isLoading 
            ? <CirclingFourDotsLoading />
            : (
              booking === undefined || agenda === undefined
                ? <ErrorMessage message="Falha ao carregar os detalhes deste booking" />
                : (
                  <div className="flex flex-col gap-12">
                    <div className="flex gap-1 flex-col">
                      <h1>{booking.guestDetails.name}</h1>
                      <h2 className="mt-0">{agenda.details.name}</h2>
                      <TimeCard className="mt-3" colorName={agenda.details.colorName} timeFrame={timeToMinutes(booking.details.duration)} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <span className="flex justify-start items-center gap-4">
                        <CiCalendar className="size-8" />
                        <TimeDescription date={booking.details.date} startTime={booking.details.time} endTime={sumTimes(booking.details.time, booking.details.duration)} />
                      </span>
                      <span className="flex justify-start items-center gap-4">
                        <BiUser className="size-8" />
                        <span>{booking.guestDetails.name} | {booking.guestDetails.email}</span>
                      </span>
                      <span className="flex justify-start items-center gap-4">
                        <BsWhatsapp className="size-6 ml-1" />
                        <span>{booking.guestDetails.phoneNumber}</span>
                      </span>
                      <span className="flex justify-start items-center gap-4">
                        <MdOutlineStickyNote2 className="size-8" />
                        {
                          !booking.guestDetails.otherInfo 
                            ? <span className="text-red-400">Nenhuma informação adicional</span>
                            : <span>{booking.guestDetails.otherInfo}</span>
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <Button route={`/re-schedule/${booking.id}`} variant="secondary" >Cancelar Evento</Button>
                      <Button routeTarget="_blank" route={`/re-schedule/${booking.id}`} variant="primary">Reagendar</Button>
                    </div>
                  </div>
                )
            )
        }
      </div>
    </Dialog>
  );
}