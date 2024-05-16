import { Frequency } from 'Common';

export interface IRepeat {
  frequency: Frequency;
  endDate: string;
}

export interface IAvailabilityTime {
  startTime: string;

  endTime: string;
  repeat?: IRepeat;
}

export interface IAvailabilityItem {
  isEnable: boolean;
  times: IAvailabilityTime[];
}
