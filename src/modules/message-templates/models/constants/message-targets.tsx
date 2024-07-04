import { ReactNode } from 'react';
import { MessageTarget } from '..';
import { MdOutlineMail } from 'react-icons/md';
import { BsWhatsapp } from 'react-icons/bs';

export const TargetIcons: { [key in MessageTarget]: ReactNode } = {
  email: <MdOutlineMail />,
  whatsapp: <BsWhatsapp />
};

export const TargetTexts: { [key in MessageTarget]: ReactNode } = {
  email: 'E-mail',
  whatsapp: 'Whatsapp'
};

export const MessageTargets: { [key in MessageTarget]: ReactNode } = {
  email: <>{TargetIcons['email']} {TargetTexts['email']}</>,
  whatsapp: <>{TargetIcons['whatsapp']} {TargetTexts['whatsapp']}</>
};

