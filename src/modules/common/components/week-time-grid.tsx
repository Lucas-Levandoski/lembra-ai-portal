import { IEventsByAgenda } from 'Calendar/models';
import { CirclingFourDotsLoading, getDate, getWeekDays, timeToMinutes } from 'Common';
import { twMerge } from 'tailwind-merge';

type props = {
  selectedDate?: string;
  startHour?: number;
  endHour?: number;
  rowHeight?: number;
  events?: IEventsByAgenda;
  currentTime?: number;
  isLoading?: boolean;
}

export function WeekTimeGrid({ 
  selectedDate = getDate(),
  startHour = 1, 
  endHour = 23, 
  rowHeight = 80,
  currentTime = new Date().getMinutes() / 60 + new Date().getHours(),
  events = {},
  isLoading = false,
}: props) {
  const range = endHour - startHour;
  const times = (new Array(range + 1).fill(0)).map((_, i) => (`${i+startHour < 10 ?  '0' + (i+startHour): i+startHour}:00`));

  const weekDays = getWeekDays(selectedDate);
  const daysNames = [ 'DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

  const filledDays = weekDays.map(
    day => (
      Object.entries(events).reduce<IEventsByAgenda>(
        (acc, [id, event]) => {
          if(!event.shouldShow) return acc;

          const filtered = event.events.filter(_event => _event.date === day);

          if (filtered.length > 0) {
            acc[id] = { ...event, events: filtered };
          }

          return acc;
        }, {})
    )
  );

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-7 ml-[45px] h-[100px]">
        {
          weekDays.map((weekDay, dayNumber) => (
            <div key={`weekday-display-${weekDay}`} className="flex flex-col gap-2 justify-center text-center h-[84px]">
              <h2>{daysNames[dayNumber]}</h2>
              <h3 className={selectedDate === weekDay ? 'bg-blue-700 mx-auto rounded-full size-10 text-white' : ''}>{weekDay.slice(8,10)}</h3>
            </div>
          ))
        }
      </div>
      <div className="flex h-[600px] overflow-y-auto relative">
        <div className="w-[45px] mr-2">
          {
            times.map(time => (
              <div key={time} className="flex items-center text-end" style={{ height: rowHeight }}>
                <span className="font-semibold">{time}</span>
              </div>
            ))
          }
        </div>
        <div className="relative grid grid-cols-7 w-full">
          {
            weekDays.map((weekDay, dayNumber) => (
              <div key={`weekday-${weekDay}`} className="h-fit relative overflow-hidden col-span-1">
                <div className={twMerge('border-x h-full', dayNumber === 0 && 'border-l-0', dayNumber >= weekDays.length - 1 && 'border-r-0')}>
                  {
                    times.map(time => (
                      <div key={time} className="flex items-center w-full" style={{ height: rowHeight }}>
                        <hr className="my-auto w-full"></hr>
                      </div>
                    ))
                  }
                </div>
                {
                  Object.values(filledDays[dayNumber]).map((agenda => 
                    agenda.events.map((event, i) => {
                      const top = (
                        timeToMinutes(event.startTime)/60
                        - startHour
                      ) * rowHeight + rowHeight/2;

                      const height = (
                        (
                          (timeToMinutes(event.endTime)/60)- (timeToMinutes(event.startTime)/60)
                        )
                        * rowHeight
                      );

                      return (
                        <div key={event.title + i} className="absolute mx-auto w-full" style={{ top, height }}>
                          <div className={
                            twMerge(
                              'flex flex-col h-full border text-center justify-center col-span-4 rounded-xl bg-opacity-80 mx-auto px-2', 
                              'relative group',
                              `bg-${event.color}-100 text-${event.color}-700 border-${event.color}-500`
                            )
                          }>
                            <span className="font-semibold text-sm leading-4">{event.title}</span>
                            <span className={`font-light text-sm leading-4 ${height < 32 ? 'hidden' : ''}`}>{event.startTime} - {event.endTime}</span>
                          </div>
                        </div>
                      );
                    })
                  ))
                }
              </div>
            ))
          }
          {
            currentTime > startHour &&
            currentTime < endHour &&
              (
                <div className="absolute w-full" style={{ top: (currentTime - startHour) * rowHeight + rowHeight/2}}>
                  <div className="flex items-center">
                    <span className="size-2 rounded-full bg-blue-500"></span>
                    <hr className="stroke-blue-500 w-full border-[1px] border-blue-500"/>
                  </div>
                </div>
              )
          }
        </div>
      </div>
      {
        isLoading && <div className="absolute flex left-0 top-0 h-full w-full rounded-lg bg-gray-500 bg-opacity-70 justify-center items-center" >
          <CirclingFourDotsLoading />
        </div>
      }
    </div>
  );
}