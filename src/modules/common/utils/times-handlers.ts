

export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalMinutes % 60)).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export function sumTimes(time1: string, time2: string): string {
  const totalSeconds = timeToMinutes(time1) + timeToMinutes(time2);
  return minutesToTime(totalSeconds);
}

export function sumMinutesToTime(baseTime: string, incrementalMinutes: number): string {
  const totalMinutes = timeToMinutes(baseTime) + incrementalMinutes;
  return minutesToTime(totalMinutes);
}
