import { useState } from "react";

import BouncingArrow from "./BouncingArrow";
import { Game } from "../utils/types/bottom-bar";
import { GameA, GameB, GameC, GameD } from "./games";

import "@/assets/newtab/bottom-bar.css";

const games: Game[] = ["gameA", "gameB", "gameC", "gameD"];

const BottomBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game>("gameA");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
  };

  const renderGame = () => {
    switch (selectedGame) {
      case "gameA":
        return <GameA />;
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
          isExpanded ? "bottom-0" : "-bottom-40 lg:-bottom-36"
        } transition-all duration-500 w-full rounded-t-2xl md:rounded-t-[2rem] min-h-48 border-2 border-b-0 border-white bg-black/50`}
        onClick={toggleExpand}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="text-white text-center">
          <p className="text-base lg:text-xl font-bold">{renderGame()}</p>
        </div>

        <div className="grid grid-rows-4 h-full bg-white">
          {games.map((game, index) => (
            <button
              key={index}
              className={`game-box ${
                selectedGame === game ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleGameSelect(game)}
            >
              {`Game ${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
