
export function isHourMinuteValid(text: string) {
  return /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(text);
}