"use client";

import useClock from "@/app/hooks/use-clock";
import React from "react";
import Loading from "../loading";
import styles from "./DigitalClock.module.css";

interface DigitalClockProps {
  className?: string;
  timeClassName?: string;
  time?: Date;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ className, time }) => {
  const currentTime = time ?? useClock();

  if (!currentTime) {
    return <Loading />;
  }
  const hour = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.timeBlock}>
        <span>{hour}</span>
      </div>
      <div>
        <span>:</span>
      </div>
      <div className={styles.timeBlock}>
        <span>{minutes}</span>
      </div>
    </div>
  );
};

export default DigitalClock;
