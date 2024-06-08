export function maskMinutes(minutes: number): string {
  if(minutes < 60) return `${minutes} min`;

  const _hours = Math.floor(minutes / 60);
  const _minutes = _hours * 60 - minutes

  return _hours + (_hours > 1 ? ' hours' : ' hour') + (_minutes > 0 ? _minutes + ' min' : '');
}