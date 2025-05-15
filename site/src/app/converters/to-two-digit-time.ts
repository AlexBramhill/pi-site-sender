export const toTwoDigitTime = (time: Date): string => {
  console.error("toTwoDigitTime", time);
  return time.toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });
};
