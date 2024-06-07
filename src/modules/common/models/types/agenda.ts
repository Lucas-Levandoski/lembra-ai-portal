export type AgendaElement = {
  id: string;
  pKey: string;
  details: AgendaDetails;
}

export type AgendaDetails = {
  name: string,
  pictureUrl: string,
  timeFrame: number,
  isEnable: boolean,
  colorName: string,
}