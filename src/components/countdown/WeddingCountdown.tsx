"use client";

import { useState, useEffect } from "react";
import { WEDDING_DETAILS } from "@/config/wedding";

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    hasStarted: false,
  });

  {
    /*Calculate time to wedding*/
  }
  useEffect(() => {
    const weddingTime = WEDDING_DETAILS.date.getTime();
    const updateCountdown = () => {
      const now = Date.now();
      const diff = weddingTime - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          hasStarted: true,
        });
        return;
      }

      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / (1000 * 60)) % 60;
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeLeft({ days, hours, minutes, seconds, hasStarted: false });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-8">
      {timeLeft.hasStarted ? (
        /* Display after wedding start */
        <div className="text-3xl font-bold animate-pulse text-white font-heading tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          The Wedding Has Started!
        </div>
      ) : (
        /* Display before wedding start */
        <>
          <h2 className="text-2xl font-semibold mb-6 text-white font-heading tracking-wide drop-shadow-lg">
            Countdown to the Big Day
          </h2>
          <div className="flex justify-center gap-4">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
          {/* Display start time with location tz */}
          <p className="mt-6 text-md text-white font-body tracking-wider drop-shadow-lg">
            Wedding time: 9:00 PM EST (Eastern Time)
          </p>
        </>
      )}
    </div>
  );
}

/* Create timeblock with glass effect bg on numbers */
const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="bg-gradient-to-b from-blue/90 to-blue-dark/90 rounded-xl p-1 shadow-xl">
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 min-w-[80px] border border-blue/30">
      <div className="text-4xl font-bold text-white font-heading tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-sm mt-1 text-white font-body tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
        {label}
      </div>
    </div>
  </div>
);
