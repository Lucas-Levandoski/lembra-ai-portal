'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'i18n';

import './index.css';

type props = {
  isLoading?: boolean;

  // ['yyyy-mm-dd', '2024-10-23']
  highlightedDays?: string[];

  onSelectedDay?: (day: string) => void;

  // 'yyyy-mm-dd', '2024-10-23'
  currentDay?: string;
}

function HiglightedDayElement(dayProps: PickersDayProps<dayjs.Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = dayProps;

  const isHighlighted =
    !dayProps.outsideCurrentMonth && highlightedDays.indexOf(dayProps.day.format('YYYY-MM-DD')) >= 0;

  return (
    <PickersDay {...other} className={isHighlighted ? 'highlighted': ''} outsideCurrentMonth={outsideCurrentMonth} day={day} />
  );
}

export function Calendar({
  isLoading = false, 
  highlightedDays = [],
  onSelectedDay = () => {},
  currentDay = new Date().toString(),
}: props) {

  return (
    <div translate="no" className="shadow-lg rounded-xl pt-6 h-fit">
      <LocalizationProvider 
        adapterLocale="pt-br"
        dateAdapter={AdapterDayjs}  
      >
        <DateCalendar
          onChange={event => onSelectedDay(`${event.format('YYYY-MM-DD')}`)}
          loading={isLoading}
          value={dayjs(currentDay)}
          slots={{
            day: HiglightedDayElement,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as any,
          }}
          fixedWeekNumber={5}
          showDaysOutsideCurrentMonth
          dayOfWeekFormatter={(date) => dayjs(date).format('ddd')}
          renderLoading={() => <DayCalendarSkeleton />}
        />
      </LocalizationProvider>
    </div>
  );
}