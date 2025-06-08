"use client";

import useClock from "@/app/hooks/use-clock";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const DigitalClock: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentTime = useClock();

  if (!isClient) {
    return <Loading />;
  }
  const hour = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  return (
    <h2 className="flex items-center justify-center">
      <div className="w-[2ch] text-right">
        <span>{hour}</span>
      </div>
      <div>
        <span>:</span>
      </div>
      <div className="w-[2ch] text-left">
        <span>{minutes}</span>
      </div>
    </h2>
  );
};

export default DigitalClock;
