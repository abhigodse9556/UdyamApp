// utils/date.ts

/**
 * Formats date like: 12 APR 2026 12:44 PM
 */
export const formatDateTime = (date: Date = new Date()): string => {
  const day = date.getDate().toString().padStart(2, "0");

  const month = date.toLocaleString("en-GB", { month: "short" }).toUpperCase();

  const year = date.getFullYear();

  const time = date
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace("am", "AM")
    .replace("pm", "PM");

  return `${day} ${month} ${year} ${time}`;
};

/**
 * Returns only date: 12 APR 2026
 */
export const formatDate = (date: Date = new Date()): string => {
  const day = date.getDate().toString().padStart(2, "0");

  const month = date.toLocaleString("en-GB", { month: "short" }).toUpperCase();

  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

/**
 * Returns only time: 12:44 PM
 */
export const formatTime = (date: Date = new Date()): string => {
  return date
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace("am", "AM")
    .replace("pm", "PM");
};
