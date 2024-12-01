import React, { useState, useEffect } from "react";

const TimerGimmick = () => {
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isRunning, seconds]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSeconds(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-8 text-6xl font-bold">
        {isRunning ? (
          formatTime(seconds)
        ) : (
          <input
            type="number"
            value={seconds}
            onChange={handleInputChange}
            className="w-40 rounded bg-secondary px-2 py-1 text-center text-6xl"
            min={0}
          />
        )}
      </div>
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            Start
          </button>
        ) : (
          <>
            <button
              onClick={handlePause}
              className="rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-600"
            >
              Pause
            </button>
            <button
              onClick={handleReset}
              className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimerGimmick;