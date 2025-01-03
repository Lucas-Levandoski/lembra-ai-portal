import { BookingNotifications } from 'Bookings/models';
import { NotificationElement } from './element';

type props = {
  notifications: BookingNotifications;
}

export function NotificationsContainer({ notifications }: props) {
  return (
    <div>
      {
        notifications.email && notifications.email.map(email => <NotificationElement key={email.id} target="email" details={email} />)
      }
      {
        notifications.whatsapp && notifications.whatsapp.map(whatsapp => <NotificationElement key={whatsapp.id} target="whatsapp" details={whatsapp} />)
      }
      {
        notifications.sms && notifications.sms.map(sms => <NotificationElement key={sms.id} target="sms" details={sms} />)
      }
    </div>
  );
}