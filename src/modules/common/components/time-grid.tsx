import { CirclyingFourDotsLoading, TimeGridMeeting } from 'Common';
import { twMerge } from 'tailwind-merge';

type props = {
  startHour?: number;
  endHour?: number;
  rowHeight?: number;
  meetings?: TimeGridMeeting[];
  currentTime?: number;
  isLoading?: boolean;
}

export function TimeGrid({ 
  startHour = 8, 
  endHour = 18, 
  rowHeight = 80,
  currentTime = new Date().getMinutes() / 60 + new Date().getHours(),
  meetings = [],
  isLoading = true,
}: props) {
  const range = endHour - startHour;
  const times = (new Array(range + 1).fill(0)).map((_, i) => (`${i+startHour < 10 ?  '0' + (i+startHour): i+startHour}:00`));

  return (
    <div className="relative">
      <div className="h-[300px] overflow-y-auto relative overflow-x-hidden">
        {
          meetings.map((meeting, i) => {
            const top = (
              +meeting.startTime.slice(0,2) 
              + +meeting.startTime.slice(3,5)/60 
              - startHour
            ) * rowHeight + rowHeight/2;

            const height = (
              (+meeting.endTime.slice(0,2) + +meeting.endTime.slice(3,5)/60) 
              - (+meeting.startTime.slice(0,2) + +meeting.startTime.slice(3,5)/60)) 
              * rowHeight;

            return (
              <div key={meeting.title + i} className="absolute grid grid-cols-5 w-full" style={{ top, height }}>
                <div className="col-span-2"></div>
                <div className={
                  twMerge(
                    'flex flex-col text-center justify-center col-span-2 rounded-xl bg-opacity-80', 
                    'relative group',
                    `bg-${meeting.color}-100 text-${meeting.color}-700`
                  )
                }>
                  <span className="font-semibold leading-4">{meeting.title}</span>
                  <span className={`font-light leading-4 ${height < 32 ? 'hidden' : ''}`}>{meeting.startTime} - {meeting.endTime}</span>
                  <span className={
                    twMerge(
                      'z-10 absolute opacity-0 -right-full font-normal text-white p-2 bg-slate-900 rounded-lg', 
                      'transition-all delay-500 duration-300',
                      'group-hover:opacity-80'
                    )
                  }>{meeting.agendaName}</span>
                </div>
              </div>
            );
          })
        }

        {
          currentTime > startHour &&
          currentTime < endHour &&
            (
              <div className="grid grid-cols-5 absolute w-full" style={{ top: (currentTime - startHour) * rowHeight + rowHeight/2}}>
                <div className="col-span-1"></div>
                <div className="col-span-4 flex items-center">
                  <span className="size-2 rounded-full bg-blue-500"></span>
                  <hr className="stroke-blue-500 w-full border-[1px] border-blue-500"/>
                </div>
              </div>  
            )
        }

        {
          times.map(time => (
            <div key={time} className="grid grid-cols-5 items-center" style={{ height: rowHeight }}>
              <div className="col-span-1">
                <span className="font-semibold">{time}</span>
              </div>
              <div className="col-span-4">
                <hr></hr>
              </div>
            </div>
          ))
        }

      </div>
      {
        isLoading && <div className="absolute flex left-0 top-0 h-full w-full rounded-lg bg-gray-500 bg-opacity-70 justify-center items-center" >
          <CirclyingFourDotsLoading />
        </div>
      }
    </div>
  );
}