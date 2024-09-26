
type props = {
  startTime: string;
  endTime: string;
  date: string;
};

export function TimeDescription({ endTime, startTime, date }: props) {  
  const translatedDate = new Date(date).toLocaleDateString('pt-BR', {
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZone: 'UTC'
  })
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  ;

  return (
    <span>
      {startTime} - {endTime}, {translatedDate}
    </span>
  );
}