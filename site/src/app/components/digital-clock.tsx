"use client";

import React from "react";
import useClock from "../hooks/use-clock";
import { toTwoDigitTime } from "../converters/to-two-digit-time";

const DigitalClock = () => {
  const time = useClock();

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">{toTwoDigitTime(time)}</h1>
    </div>
  );
};

export default DigitalClock;
