export const toTwoDigitTime = (time: Date): string => {
  return time.toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
};
