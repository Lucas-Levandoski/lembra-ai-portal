
type props = {
  startTime: string;
  endTime: string;
  date: string;
  className?: string;
};

export function TimeDescription({ className, endTime, startTime, date }: props) {  
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
    <span className={className}>
      {startTime} - {endTime}, {translatedDate}
    </span>
  );
}