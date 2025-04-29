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
