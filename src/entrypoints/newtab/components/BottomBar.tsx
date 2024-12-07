import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import BouncingArrow from "./BouncingArrow";

const BottomBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const incrementScore = () => {
    setScore(score + 1);
  };

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/2 flex justify-center">
      <BouncingArrow isExpanded={isExpanded} toggleExpand={toggleExpand} />

      {/* bottom bar */}
      <div
        className={`absolute ${
          isExpanded ? "bottom-0" : "-bottom-40 lg:-bottom-36"
        } transition-all duration-500 w-full rounded-t-2xl md:rounded-t-[2rem] min-h-48 border-2 border-b-0 border-white bg-black/50`}
        onClick={toggleExpand}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="text-white text-center py-1 lg:py-4">
          <p className="text-base lg:text-xl font-bold">* Some Game Here *</p>
          <p className="text-lg">Your Score: {score}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              incrementScore();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Click Me!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
