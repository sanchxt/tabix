import { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuTimerReset } from "react-icons/lu";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"Pomodoro" | "Short Break" | "Long Break">(
    "Pomodoro"
  );
  const [cycles, setCycles] = useState(0);

  const durations = {
    Pomodoro: 25 * 60,
    "Short Break": 5 * 60,
    "Long Break": 15 * 60,
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            playAlertSound();
            handleModeSwitch();
            return durations[mode];
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, mode]);

  const playAlertSound = () => {
    const alertSound = new Audio("/sounds/timer-end-sound.mp3");
    alertSound.play();
  };

  const handleModeSwitch = () => {
    if (mode === "Pomodoro") {
      if ((cycles + 1) % 4 === 0) {
        setMode("Long Break");
        setTimeLeft(durations["Long Break"]);
      } else {
        setMode("Short Break");
        setTimeLeft(durations["Short Break"]);
      }
      setCycles((prev) => prev + 1);
    } else {
      setMode("Pomodoro");
      setTimeLeft(durations["Pomodoro"]);
    }
  };

  const toggleTimer = () => {
    playClickSound();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    playClickSound();
    setIsRunning(false);
    setTimeLeft(durations[mode]);
  };

  const switchMode = (newMode: "Pomodoro" | "Short Break" | "Long Break") => {
    playClickSound();
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsRunning(false);
  };

  const playClickSound = () => {
    const clickSound = new Audio("/sounds/button-click-sound.mp3");
    clickSound.play();
  };

  const adjustTime = (adjustment: number) => {
    const newTime = timeLeft + adjustment;
    if (newTime > 0) {
      setTimeLeft(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center text-white p-4">
      {/* Top bar - sections */}
      <div className="flex gap-8 md:gap-12 lg:gap-16 xl:gap-24">
        {["Pomodoro", "Short Break", "Long Break"].map((section) => (
          <button
            key={section}
            onClick={() => switchMode(section as typeof mode)}
            className="text-sm lg:text-base italic text-slate-300 font-medium relative group"
            style={{ fontWeight: mode === section ? 800 : "normal" }}
          >
            {section}
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-slate-200 to-slate-600 transition-all duration-300" />
          </button>
        ))}
      </div>

      {/* timer & adjustment buttons */}
      <div className="flex items-center font-mono mt-4 space-x-4">
        <div className="grid grid-rows-2">
          <button
            onClick={() => adjustTime(60)}
            className="text-slate-300 hover:text-white transition text-xs md:text-sm"
          >
            <IoIosArrowUp />
          </button>

          <button
            onClick={() => adjustTime(-60)}
            className="text-slate-300 hover:text-white transition text-xs md:text-sm"
          >
            <IoIosArrowDown />
          </button>
        </div>

        <div className="text-5xl">{formatTime(timeLeft)}</div>
      </div>

      {/* control buttons */}
      <div className="flex py-2 gap-4">
        <button
          onClick={toggleTimer}
          className="px-3 py-2 bg-slate-200 shadow-inner shadow-purple-700 active:shadow-md active:shadow-purple-400 transition-all duration-300 rounded-md text-black"
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={resetTimer}
          className="px-3 py-2 rounded-md transition-all text-xl"
        >
          <LuTimerReset />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
