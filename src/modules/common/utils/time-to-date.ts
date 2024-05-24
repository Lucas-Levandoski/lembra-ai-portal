export function timeToDateISO(timeString: string): string {
  var currentDate = new Date();

  var time = timeString.split(':');
  var hours = parseInt(time[0]);
  var minutes = parseInt(time[1]);

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);

  return currentDate.toISOString();
}  