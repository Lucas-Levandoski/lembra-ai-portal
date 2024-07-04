export function maskMinutes(minutes: number, isLong = false): string {
  if(minutes < 60) return `${minutes} min`;

  const _hours = Math.floor(minutes / 60);
  const _minutes = _hours * 60 - minutes;

  const hoursText = _hours > 1 ? 'horas' : 'hora';
  const minutesText = _minutes > 0 ? (isLong ? 'minutes' : 'min' ) : '';

  return `${_hours} ${_hours > 0 ? hoursText : minutesText}`;
}