export function getDate(data: number) {
  return { year: Math.floor(data / 10000) };
}

export function getFormattedDateRange(startDate: number, endDate: number) {
  const startYear = getDate(startDate).year;
  const endYear = getDate(endDate).year;
  return `${startYear} ~ ${endYear}`;
}
