export function getDaysBetweenDates(startDate: Date, endDate: Date): number {
  const diffInMs = endDate.getTime() - startDate.getTime();

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.floor(diffInDays);
}
