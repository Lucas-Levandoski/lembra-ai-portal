import { ReactNode } from 'react';
import { MessageTarget } from '..';
import { MdOutlineMail, MdOutlineTextsms } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';

export const TargetIcons: { [key in MessageTarget]: ReactNode } = {
  email: <MdOutlineMail />,
  whatsapp: <BsWhatsapp />,
  // sms: <MdOutlineTextsms />,
};

export const TargetTexts: { [key in MessageTarget]: ReactNode } = {
  email: 'E-mail',
  whatsapp: 'Whatsapp',
  // sms: 'SMS',
};

export const MessageTargets: { [key in MessageTarget]: ReactNode } = {
  email: <>{TargetIcons['email']} {TargetTexts['email']}</>,
  whatsapp: <>{TargetIcons['whatsapp']} {TargetTexts['whatsapp']}</>,
  // sms: <>{TargetIcons['sms']} {TargetTexts['sms']}</>,
};
