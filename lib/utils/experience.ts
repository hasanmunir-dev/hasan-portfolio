export function getExperienceDuration(
  startDate: string,
  endDate?: string,
  compact = false
): string {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const start = new Date(startYear, startMonth - 1, 1);

  const end = endDate
    ? (() => {
        const [year, month] = endDate.split("-").map(Number);
        return new Date(year, month - 1, 1);
      })()
    : new Date();

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (compact) {
    if (years === 0) return `${remainingMonths}M`;
    if (remainingMonths === 0) return `${years}Y`;
    return `${years}Y ${remainingMonths}M`;
  }

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "Month" : "Months"}`;
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