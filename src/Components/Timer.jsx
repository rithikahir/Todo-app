import { useEffect, useState } from "react";

const Timer = ({ deadline, isDarkMode }) => {
  const calcTimeLeft = () => {
    const difference = +new Date(deadline) - +new Date();
    if (isNaN(difference) || difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return timeLeft ? (
    <p
      className={`${
        isDarkMode ? "text-green-600" : "text-purple-900"
      } font-semibold opacity-50 mt-1 text-lg italic text-center`}
    >
      Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      {timeLeft.seconds}s
    </p>
  ) : (
    <p className="text-red-600 font-semibold"> Time's Up</p>
  );
};

export default Timer;
