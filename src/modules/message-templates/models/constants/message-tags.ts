export const MessageTags = {
  guestName: 'Nome do convidado',
  ownerName: 'Nome do host',
  event: 'Nome do evento',
  timeUntil: 'Tempo para o início reunião',
  time: 'Horário da Reunião',
  link: 'Link meet',
};

export const MessageTagsColors: { [k in keyof typeof MessageTags]: string } = {
  guestName: 'blue',
  ownerName: 'lime',
  event: 'orange',
  timeUntil: 'rose',
  time: 'violet',
  link: 'fuchsia',
};