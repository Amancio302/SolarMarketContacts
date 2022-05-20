export function dateToString(date) {
  if (!date) return;
  const d = date.toLocaleString();
  return d.slice(8, 10) + "/" + d.slice(5, 7) + "/" + d.slice(0, 4);
}

export function stringToDate(string) {
  if (!string) return;
  return `${string.slice(0, 4)}-${string.slice(5, 7)}-${string.slice(8, 10)}`;
}
