"use client";

import React from "react";
import useClock from "../hooks/use-clock";
import { ONE_SECOND_IN_MS } from "../consts/time";

const DigitalClock = () => {
  const time = useClock({ refreshInMs: ONE_SECOND_IN_MS });

  const ukTimeString = time.toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">{ukTimeString}</h1>
    </div>
  );
};

export default DigitalClock;
