export function getExperienceDuration(
  startDate: string,
  endDate?: string
): string {
  const start = new Date(`${startDate}-01T00:00:00`);
  const end = endDate
    ? new Date(`${endDate}-01T00:00:00`)
    : new Date();

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Invalid date";
  }

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Count the starting month as part of the employment period.
  months = Math.max(0, months + 1);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? "Month" : "Months"}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? "Year" : "Years"}`;
  }

  return `${years} ${years === 1 ? "Year" : "Years"} ${remainingMonths} ${
    remainingMonths === 1 ? "Month" : "Months"
  }`;
}

export function formatExperiencePeriod(
  startDate: string,
  endDate?: string
): string {
  const format = (date: string) => {
    const [year, month] = date.split("-").map(Number);

    return new Date(year, month - 1, 1).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "2-digit",
      }
    );
  };

  return `${format(startDate)} - ${
    endDate ? format(endDate) : "Present"
  }`;
}