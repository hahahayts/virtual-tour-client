export const dateFormatter = (date: Date) => {
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const finalFormat = `${datePart} at ${timePart}`;

  return finalFormat;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDepartureDays = (days: string[]) => {
  if (!days || days.length === 0) return "No schedule";
  if (days.length <= 2) return days.join(", ");
  return `${days.slice(0, 2).join(", ")} +${days.length - 2} more`;
};
