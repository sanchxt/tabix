import { useState } from "react";

import BouncingArrow from "./BouncingArrow";
import { Game } from "../utils/types/bottom-bar";
import { PomodoroTimer, GameB, GameC, GameD } from "./games";

import "@/assets/newtab/bottom-bar.css";

const games: Game[] = ["Pomodoro", "gameB", "gameC", "gameD"];

const BottomBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game>("Pomodoro");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "Pomodoro":
        return <PomodoroTimer />;
      case "gameB":
        return <GameB />;
      case "gameC":
        return <GameC />;
      case "gameD":
        return <GameD />;
      default:
        return <div>Choose a game!</div>;
    }
  };

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/2 flex justify-center">
      <BouncingArrow isExpanded={isExpanded} toggleExpand={toggleExpand} />

      {/* bottom bar */}
      <div
        className={`absolute ${
          isExpanded ? "bottom-1" : "-bottom-40 lg:-bottom-36"
        } transition-all duration-500 w-full rounded-t-2xl md:rounded-t-[2rem] h-48 border-2 border-b-0 border-white bg-slate-950/[98%]`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="text-white text-center h-full w-full rounded-t-[2rem]">
          <p className="text-base lg:text-xl font-bold h-full">
            {renderGame()}
          </p>
        </div>

        {/* game buttons - visible only when expanded */}
        {isExpanded && (
          <div className="grid grid-rows-4 h-full">
            {games.map((game, index) => (
              <button
                key={index}
                className={`game-box ${
                  selectedGame === game ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleGameSelect(game)}
              >
                {`Tool ${index + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
