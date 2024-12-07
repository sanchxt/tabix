import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CurrentTime = () => {
  const [time, setTime] = useState<{
    hours: string;
    minutes: string;
  }>({
    hours: "00",
    minutes: "00",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setTime({ hours, minutes });
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderFlipUnit = (digit: string) => (
    <div className="w-12 h-16 sm:w-16 sm:h-20 lg:w-24 lg:h-28 relative bg-gray-800/5 rounded-md overflow-hidden text-white">
      <motion.div
        key={digit}
        className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl lg:text-8xl font-bold bg-gray-700/10"
        initial={{ rotateX: 90 }}
        animate={{ rotateX: 0 }}
        exit={{ rotateX: -90 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {digit}
      </motion.div>
    </div>
  );

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
      <div className="flex space-x-1 lg:space-x-2">
        {renderFlipUnit(time.hours[0])}
        {renderFlipUnit(time.hours[1])}
      </div>
      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400">
        :
      </span>
      <div className="flex space-x-1 lg:space-x-2">
        {renderFlipUnit(time.minutes[0])}
        {renderFlipUnit(time.minutes[1])}
      </div>
    </div>
  );
};

export default CurrentTime;
