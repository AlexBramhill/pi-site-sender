"use client";

import React, { useEffect, useState } from "react";
import useClock from "../hooks/use-clock";

const DigitalClock = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const time = useClock();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <h1 className="text-4xl font-mono text-gray-500 animate-pulse">
          loading...
        </h1>
      </div>
    );
  }

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="">
        {hours}:{minutes}:{seconds}
      </h1>
    </div>
  );
};

export default DigitalClock;
