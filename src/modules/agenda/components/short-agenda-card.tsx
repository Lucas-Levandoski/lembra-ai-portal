import { IShortAgendaProps } from 'Agenda/models';
import { TimeCard } from 'Common';
import { PiCaretRightBold } from 'react-icons/pi';

type props = {
  agenda: IShortAgendaProps;
}

export function ShortAgendaCard({ agenda }: props) {
  return (
    <div className="flex p-4 justify-between w-full items-center">
      <div className="flex items-center justify-between w-full sm:gap-6 md:justify-normal">
        <span className={`rounded-full h-5 min-w-5 w-5 bg-${agenda.colorName}-500`}></span>
        <h3 className="mt-0 text-wrap text-center">{agenda.name}</h3>
        <TimeCard colorName={agenda.colorName} timeFrame={agenda.timeFrame}/>
      </div>
      <PiCaretRightBold className="invisible md:visible"  />
    </div>
  );
}