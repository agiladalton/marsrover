import dayjs from 'dayjs';

export function formatUTC(dt: Date, template?: string): string {
  // Tue Dec 11 2017 19:00:00 GMT-0500 (EST)
  const date = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

  return dayjs(date).format(template);
}
