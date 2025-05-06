"use client";
import { useState, useEffect } from "react";

const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(interval);
  }, []);

  return time;
};

export default useClock;
