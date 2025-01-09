import { BookingDetails, BookingEntity } from 'Bookings/models';
import { TimeDescription } from 'Bookings/components';
import { AgendaElement, Button, CirclingFourDotsLoading, ConfirmationDialog, Dialog, ErrorMessage, sumTimes, TimeCard, timeToMinutes } from 'Common';
import { CiCalendar } from 'react-icons/ci';
import { BiUser } from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import { FaAngleDoubleUp } from 'react-icons/fa';



type props = {
  isOpen?: boolean;
  isCancellationOpen?: boolean;
  isCancellationLoading?: boolean;
  booking?: BookingEntity;
  agenda?: AgendaElement;
  isLoading?: boolean;
  reschedules?: BookingDetails[];
  onClose?: () => void;
  onCancellationCancel?: () => void;
  onCancellationConfirm?: (bookingId: string) => void;
  onCancellation?: () => void;
}

export function BookingDialog({ 
  booking,
  agenda,
  isLoading = true,
  isOpen = true,
  reschedules = [],
  onClose = () => {},
  isCancellationOpen,
  isCancellationLoading,
  onCancellationCancel = () => {},
  onCancellationConfirm = () => {},
  onCancellation = () => {},
}: props) {

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="relative min-h-44 min-w-44 flex flex-col justify-center align-middle">
        <Button className="absolute -right-4 -top-4" variant="icon" onClick={onClose} ><IoClose className="size-6" /></Button>
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
                    {
                      reschedules.length > 0 && (
                        <div className="flex flex-col">
                          <h3>Este booking já foi reagendado <span className="text-orange-500">{reschedules.length > 1 ? `${reschedules.length} vezes`: '1 vez'}</span></h3>
                          {reschedules.map((reschedule, i) => (
                            <div className="flex flex-col gap-1 mt-1" key={reschedule.sourceBookingId}>
                              {i > 0 && <span className="flex w-full justify-center"><FaAngleDoubleUp className="text-orange-500 size-4" /></span>}
                              <div className="bg-orange-200 rounded-md px-2 text-center">
                                <TimeDescription date={reschedule.date} startTime={reschedule.time} endTime={sumTimes(reschedule.time, reschedule.duration)} />
                              </div>
                            </div>
                          ))}
                        </div> 
                      )
                    }
                    <div className="flex justify-between">
                      <Button onClick={() => onCancellation() } variant="secondary" >Cancelar Evento</Button>
                      <Button routeTarget="_blank" route={`/re-schedule/${booking.id}`} variant="primary">Reagendar</Button>
                    </div>
                  </div>
                )
            )
        }
      </div>
      <ConfirmationDialog
        isOpen={isCancellationOpen}
        content="Tem certeza de que deseja cancelar este evento?"
        onCancel={onCancellationCancel}
        onConfirm={() => onCancellationConfirm(booking!.id)} 
        isLoading={isCancellationLoading} />
    </Dialog>
  );
}