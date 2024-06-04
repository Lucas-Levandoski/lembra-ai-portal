export type AgendaElement = {
  id: string;
  pKey: string;
  details: {
    name: string,
    pictureUrl: string,
    timeFrame: number,
    isEnable: boolean,
    colorName: string,
  };
}