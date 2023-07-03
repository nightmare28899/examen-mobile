export function formatDate(date: any) {
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("es", options);
}
