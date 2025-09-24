function coerceToDate(input) {
  if (!input) return null;
  if (input instanceof Date) return input;
  const parsed = new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(input) {
  const date = coerceToDate(input);
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export { formatDate };
