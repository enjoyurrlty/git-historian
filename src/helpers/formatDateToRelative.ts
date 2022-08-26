const timeUnits = {
  year: 31_536_000_000,
  month: 2_628_000_000,
  week: 604_800_000,
  day: 86_400_000,
  hour: 3_600_000,
  minute: 60_000,
  second: 1_000,
};

export function formatDateToRelative(date: string) {
  const now = new Date().getTime();
  const timestamp = new Date(date).getTime();
  const diff = timestamp - now;
  const rtfl = new Intl.RelativeTimeFormat('en');

  for (const [timeUnit, msInTimeUnit] of Object.entries(timeUnits)) {
    if (Math.abs(diff) > msInTimeUnit || timeUnit === 'second') {
      // @ts-expect-error
      return rtfl.format(Math.round(diff / msInTimeUnit), timeUnit);
    }
  }
}
