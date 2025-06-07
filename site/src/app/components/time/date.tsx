"use client";

import useClock from "@/app/hooks/use-clock";
import React, { useEffect, useState } from "react";
import Loading from "../loading";

const Date: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentTime = useClock();

  if (!isClient) {
    return <Loading />;
  }

  const day = String(currentTime.getDate()).padStart(2, "0");
  const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = currentTime.getFullYear();

  return (
    <div className="flex items-center justify-center">
      <div className="w-[2ch] text-right">
        <span>{day}</span>
      </div>
      <div>/</div>
      <div className="w-[2ch] text-center">
        <span>{month}</span>
      </div>
      <div>/</div>
      <div className="w-[4ch] text-left">
        <span>{year}</span>
      </div>
    </div>
  );
};

export default Date;
