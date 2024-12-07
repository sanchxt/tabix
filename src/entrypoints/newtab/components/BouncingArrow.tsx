import { IoIosArrowUp } from "react-icons/io";
import { ArrowProps } from "../utils/types/bottom-bar";

const BouncingArrow = ({ isExpanded, toggleExpand }: ArrowProps) => {
  return (
    <div
      className={`absolute -top-16 right-8 transition-all duration-500 flex gap-4 ${
        isExpanded ? "rotate-180 -top-56" : ""
      }`}
      onClick={toggleExpand}
    >
      <IoIosArrowUp
        size={28}
        className={`animate-bounce text-white cursor-pointer ${
          isExpanded ? "rotate-180" : ""
        }`}
      />
    </div>
  );
};

export default BouncingArrow;
