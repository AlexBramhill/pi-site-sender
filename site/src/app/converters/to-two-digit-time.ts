const TIME_ZONE = "Europe/London";
const LOCALE = "en-GB";

export const getHour = (time: Date): string => {
  return time.toLocaleTimeString(LOCALE, {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    hour12: false,
  });
};

export const getMinute = (time: Date): string => {
  return time.toLocaleTimeString(LOCALE, {
    timeZone: TIME_ZONE,
    minute: "2-digit",
  });
};

export const getSecond = (time: Date): string => {
  return time.toLocaleTimeString(LOCALE, {
    timeZone: TIME_ZONE,
    second: "2-digit",
  });
};

export const getDayOfWeek = (time: Date): string => {
  return time.toLocaleDateString(LOCALE, {
    timeZone: TIME_ZONE,
    weekday: "long",
  });
};

export const getDateOfMonth = (time: Date): string => {
  return time.toLocaleDateString(LOCALE, {
    timeZone: TIME_ZONE,
    day: "2-digit",
  });
};

export const getMonth = (time: Date): string => {
  return time.toLocaleDateString(LOCALE, {
    timeZone: TIME_ZONE,
    month: "long",
  });
};

export const getYear = (time: Date): string => {
  return time.toLocaleDateString(LOCALE, {
    timeZone: TIME_ZONE,
    year: "numeric",
  });
};
