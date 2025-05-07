"use client";

import React from "react";
import useClock from "../hooks/use-clock";
import { ONE_SECOND_IN_MS } from "../consts/time";
import { toTwoDigitTime } from "../converters/to-two-digit-time";

const DigitalClock = () => {
  const time = useClock({ refreshInMs: ONE_SECOND_IN_MS });

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">{toTwoDigitTime(time)}</h1>
    </div>
  );
};

export default DigitalClock;
