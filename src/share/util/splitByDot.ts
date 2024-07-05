export default function splitByDot(string: string) {
  return string.trim().split('.').filter(Boolean);
}
