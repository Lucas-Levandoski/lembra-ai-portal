export function preferFirst(first?: string, second?: string): string | undefined {
  if(first === undefined)
    return second;
  return first;
}