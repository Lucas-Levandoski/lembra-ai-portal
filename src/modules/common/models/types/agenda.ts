export type AgendaElement = {
  id: string;
  pKey: string;
  details: AgendaDetails;
  tag: string;
}

export type AgendaDetails = {
  name: string,
  pictureUrl: string,
  timeFrame: number,
  isEnable: boolean,
  colorName: string,
}