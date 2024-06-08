import { TimeCard } from 'Common';
import { FcGoogle  } from 'react-icons/fc';


type props = {
  agendaName: string;
  timeFrame: number;
  colorName: string;
  isPreview?: boolean;
}

export function BookingAgendaVisualizationView({ agendaName, timeFrame, colorName, isPreview }: props) {
  return (
    <div className="border p-6 rounded-xl grid grid-cols-10 gap-4">
      <div className="flex gap-3 flex-col col-span-6">
        { isPreview && <strong className="text-sm">PREVIEW</strong> }
        <h1>{agendaName}</h1>
        <TimeCard colorName={colorName} timeFrame={timeFrame} />
        <div className="border rounded-lg mt-8 p-4 flex items-center gap-6">
          <FcGoogle className="size-8" />Google meet
        </div>
      </div>
      <div className="shadow-lg bg-white h-80 w-80 rounded-lg"> 

      </div>
    </div>
  );
}