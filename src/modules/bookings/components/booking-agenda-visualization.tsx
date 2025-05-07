import { Button, Calendar, TimeCard } from 'Common';
import { IShortProfile} from 'Profile/models';
import { ProfileTag } from 'Profile/components';
import { FcGoogle  } from 'react-icons/fc';
import { TimePicker } from './time-picker';


type props = {
  agendaName: string;
  timeFrame: number;
  colorName: string;
  profile?: IShortProfile;
  selectedDate?: string;
  isPreview?: boolean;
  availableDates?: string[];
  availableTimes?: string[];
  onDateChange?: (date: string) => void;
  selectedTime?: number;
  onSelectTime?: (index: number) => void;
  onNext?: () => void;
}

export function BookingAgendaVisualization({ 
  agendaName, 
  timeFrame, 
  colorName, 
  isPreview, 
  profile, 
  availableDates, 
  selectedDate, 
  onDateChange = () => {}, 
  availableTimes,
  selectedTime,
  onSelectTime = () => {},
  onNext = () => {},
}: props) {

  return (
    <div className="flex flex-col shadow-lg p-6 rounded-xl w-fit mx-auto gap-8">
      <div className="flex min-w-[600px] gap-4">
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
          <TimePicker times={availableTimes} selectedTime={selectedTime} onSelectTime={onSelectTime} />
        </div>
      </div>
      {
        !isPreview && (
          <div className="flex justify-end">
            <Button onClick={() => onNext()} disabled={selectedTime === undefined || selectedTime < 0}>Avançar</Button>
          </div>
        )
      }
    </div>
  );
}