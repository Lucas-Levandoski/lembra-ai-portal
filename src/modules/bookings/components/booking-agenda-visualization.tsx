import { Calendar, TimeCard } from 'Common';
import { IShortProfile, ProfileTag } from 'Profile';
import { FcGoogle  } from 'react-icons/fc';
import { TimePicker } from './time-picker';


type props = {
  agendaName: string;
  timeFrame: number;
  colorName: string;
  profile: IShortProfile;
  selectedDate?: string;
  isPreview?: boolean;
  availableDates?: string[];
  availableTimes?: string[];
  onDateChange?: (date: string) => void;

}

export function BookingAgendaVisualization({ agendaName, timeFrame, colorName, isPreview, profile, availableDates, selectedDate, onDateChange, availableTimes }: props) {
  return (
    <div className="flex min-w-[600px] w-fit shadow-lg p-6 rounded-xl gap-4 mx-auto">
      <div className="flex gap-3 flex-col w-[500px]">
        { isPreview && <strong className="text-sm">PREVIEW</strong> }
        {!isPreview && profile && <ProfileTag profile={profile} />}
        <h1>{agendaName}</h1>
        <TimeCard colorName={colorName} timeFrame={timeFrame} />
        <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
          <FcGoogle className="size-8" />Google meet
        </div>
      </div>
      <div className="border-r w-1"></div>
      <div className="flex gap-6"> 
        <Calendar currentDay={selectedDate} highlightedDays={availableDates} onSelectedDay={onDateChange} />
        <TimePicker times={availableTimes} />
      </div>
    </div>
  );
}