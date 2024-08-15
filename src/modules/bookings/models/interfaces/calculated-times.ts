export interface ITimesByAgenda {
  [agendaId: string] : IDateTimes;
}

export interface IDateTimes {
  [date: string] : string [
    // 10:15 - this is the calculated time for the given day
  ];
}

export interface IDatesByAgenda {
  [agendaId: string] : string[];
}