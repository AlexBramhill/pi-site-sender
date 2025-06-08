"use client";

import useClock from "@/app/hooks/use-clock";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const Day: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentTime = useClock();

  if (!isClient) {
    return <Loading />;
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[currentTime.getDay()];

  return (
    <h3 className="flex items-center justify-center">
      <span>{day}</span>
    </h3>
  );
};

export default Day;
