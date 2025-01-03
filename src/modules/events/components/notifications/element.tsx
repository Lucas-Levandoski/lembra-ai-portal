import { BookingNotification, NotificationStatuses } from 'Bookings/models';
import { Accordion, StatusMessage } from 'Common';
import { maskMinutes } from 'Common/utils';
import { MessageTarget, TargetIcons } from 'Message-Templates/models';
import { useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

type props = {
  target: MessageTarget;
  details: BookingNotification;
}

function StatusText(status: NotificationStatuses) {
  switch(status) {
    case 'fail': return 'Falha ao enviar notificação';
    case 'in-progress': return 'Notificação agendada para envio';
    case 'success': return 'Notificação enviada com sucesso';
  }
}


function StatusColor(status: NotificationStatuses) {
  switch(status) {
    case 'fail': return 'bg-red-500';
    case 'in-progress': return 'bg-blue-700';
    case 'success': return 'bg-lime-500';
  }
}

export function NotificationElement({ details, target }: props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion isOpen={isOpen} onChange={setIsOpen} className="border-2">
      <div className="relative ml-6 flex items-center justify-start gap-2">
        <span className={twMerge('absolute h-8 w-[2px] rounded-full -translate-x-[34px]', StatusColor(details.status) )}/>
        <span>{TargetIcons[target]}</span>
        <span>{maskMinutes(details.minutesToMeeting, true)} antes</span>
        <FaCircle className="size-2" />
        <span className="font-bold">
          {StatusText(details.status)} por {target}
        </span>
      </div>
      <div className="relative max-h-[300px] overflow-auto rounded-md border-blue-700 border-2 p-4">
        {
          !details.html && !details.content
            ? <StatusMessage message="Sua notificação está sendo processada, só é possível visualizar notificações já enviadas" />
            : <div dangerouslySetInnerHTML={{ __html: details.html || details.content || '' }} />
        }
      </div>
    </Accordion>
  );
}