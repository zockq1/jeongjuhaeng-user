export default function getDate(data: number) {
  return { year: Math.floor(data / 10000) };
}
